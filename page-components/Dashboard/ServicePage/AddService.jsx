import { Button } from '@/components/Button';
import { Button as NextUIButton } from '@nextui-org/react';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { Card, Input } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './AddSpecialist.module.scss';
import dynamic from 'next/dynamic';
import { transliterate as tr, slugify } from 'transliteration';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';
import { ArrowDown, ArrowUp } from 'react-feather';

const AddSpec = () => {
  const [visibility, setVisibility] = useState(false);
  const [codeVisibility, setCodeVisibility] = useState(false);

  const codeHandle = () => {
    setCodeVisibility(codeVisibility === false ? true : false);
  };

  const formHandle = () => {
    setVisibility(visibility === false ? true : false);
  };

  const nameRef = useRef();
  const specialityRef = useRef();
  const experienceRef = useRef();
  const photoRef = useRef();
  const educationRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { mutate } = usePostPages('staff');

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        const translite = tr(nameRef.current.value);
        const slug = slugify(translite);

        let formData = new FormData();
        formData.append('slug', slug);
        formData.append('name', nameRef.current.value);
        formData.append('speciality', specialityRef.current.value);
        formData.append('experience', experienceRef.current.value);
        if (photoRef.current.files && photoRef.current.files[0]) {
          formData.append('photo', photoRef.current.files[0]);
        }
        formData.append('education', educationRef.current.value);

        await fetcher('/api/specialists', {
          method: 'POST',
          body: formData,
        });

        toast.success('Вы успешно добавили врача!');
        console.log(educationRef.current.value);
        // nameRef.current.value = '';
        // specialityRef.current.value = '';
        // experienceRef.current.value = '';
        // photoRef.current.value = '';
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <Card className={styles.addWrapper}>
      <div className={styles.buttonContainer}>
        <NextUIButton
          color='gradient'
          iconRight={visibility ? <ArrowUp /> : <ArrowDown />}
          bordered={visibility ? true : false}
          onClick={formHandle}
        >
          {visibility ? 'Скрыть' : 'Добавить врача'}
        </NextUIButton>
      </div>
      <form onSubmit={onSubmit}>
        <div className={clsx(styles.addForm, visibility && styles.formVisible)}>
          <div className={styles.inputGroup}>
            <Input
              ref={nameRef}
              type={'text'}
              label={'Имя врача'}
              placeholder='ФИО'
            />
            <Input
              ref={experienceRef}
              type={'text'}
              label={'Стаж врача, текстом'}
              placeholder='25 лет'
            />
            <Input
              ref={specialityRef}
              type={'text'}
              label={'Специализация'}
              placeholder='Ортопед'
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputColumn}>
              <label for='photoinput'>Фотография</label>
              <input
                id='photoinput'
                ref={photoRef}
                type={'file'}
                placeholder={'Фотография'}
              />
            </div>
          </div>
          <div>
            <p className={styles.blockTitle}>Образование</p>
            <Editor
              editorState={editorState}
              wrapperClassName={styles.richText}
              toolbarClassName={styles.toolbar}
              editorClassName={styles.textfield}
              onEditorStateChange={setEditorState}
              toolbar={{
                options: ['inline', 'list', 'textAlign', 'remove', 'history'],
              }}
            />
            <NextUIButton
              color='primary'
              bordered
              onClick={codeHandle}
              disabled={
                draftToHtml(convertToRaw(editorState.getCurrentContent()))
                  .length > 8
                  ? false
                  : true
              }
            >
              {codeVisibility ? 'Скрыть код' : 'Показать код'}
            </NextUIButton>
            <textarea
              className={clsx(
                styles.code,
                codeVisibility && styles.codeVisible
              )}
              disabled
              ref={educationRef}
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>
          <Button type='success' loading={isLoading}>
            Опубликовать
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddSpec;
