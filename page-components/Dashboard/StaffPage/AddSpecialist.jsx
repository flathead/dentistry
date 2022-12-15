import { Button } from '@/components/Button';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { Input } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './AddSpecialist.module.scss';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddSpec = () => {
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

        let formData = new FormData();
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
    <form onSubmit={onSubmit}>
      <div className={styles.addForm}>
        <Input ref={nameRef} type={'text'} labelPlaceholder={'Имя врача'} />
        <Input
          ref={experienceRef}
          type={'text'}
          labelPlaceholder={'Стаж врача, текстом'}
        />
        <Input
          ref={specialityRef}
          type={'text'}
          labelPlaceholder={'Специализация'}
        />
        <Input ref={photoRef} type={'file'} placeholder={'Фотография'} />
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
          <textarea
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
  );
};

export default AddSpec;
