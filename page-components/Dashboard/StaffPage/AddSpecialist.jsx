import { Button } from '@/components/Button';
import { Button as NextUIButton } from '@nextui-org/react';
import { fetcher } from '@/lib/fetch';
import { Card, Input } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './AddSpecialist.module.scss';
import { transliterate as tr, slugify } from 'transliteration';
import clsx from 'clsx';
import { ArrowDown, ArrowUp } from 'react-feather';
import { useSpecPages } from '@/lib/post';
import { Wysiwyg } from '@/components/Wysiwyg';

const AddService = () => {
  const { data } = useSpecPages();
  const specialists = data
    ? data.reduce((acc, val) => [...acc, ...val.specialists], [])
    : [];

  const [visibility, setVisibility] = useState(false);
  const [descrCodeVisibility, setDescrCodeVisibility] = useState(false);

  const descrCodeHandle = () => {
    setDescrCodeVisibility(descrCodeVisibility === false ? true : false);
  };

  const formHandle = () => {
    setVisibility(visibility === false ? true : false);
  };

  const nameRef = useRef(); // Имя
  const previewRef = useRef(); // Фото врача
  const certRef = useRef(); // Сертификаты
  const specialityRef = useRef(); // Специальность
  const descriptionRef = useRef(); // Образование
  const experienceRef = useRef(); // Опыт
  const offerTitleRef = useRef();
  const offerSubtitleRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [descriptionState, setDescriptionState] = useState(() =>
    EditorState.createEmpty()
  );

  const { mutate } = useSpecPages();

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
        formData.append('experience', experienceRef.current.value);
        formData.append('speciality', specialityRef.current.value);
        if (previewRef.current.files && previewRef.current.files[0]) {
          console.log('Фото выбрано!');
          formData.append('photo', previewRef.current.files[0]);
        }
        if (certRef.current.files) {
          console.log(`Количество изобр.: ${certRef.current.files.length}`);
          for (let i = 0; i < certRef.current.files.length; i++) {
            formData.append('docs', certRef.current.files[i]);
          }
        }
        formData.append('education', descriptionRef.current.value);
        formData.append('offerTitle', offerTitleRef.current.value);
        formData.append('offerSubtitle', offerSubtitleRef.current.value);

        await fetcher('/api/doctors', {
          method: 'POST',
          body: formData,
        });

        toast.success('Вы успешно добавили врача!');

        nameRef.current.value = '';
        experienceRef.current.value = '';
        previewRef.current.value = '';
        specialityRef.current.value = '';
        descriptionRef.current.value = '';

        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  function createLabel(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }`;
  }

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
        <p>
          {specialists && specialists.length >= 1
            ? `${createLabel(specialists.length, [
                'Добавлен',
                'Добавлено',
                'Добавлено',
              ])} ${specialists.length} ${createLabel(specialists.length, [
                'врач',
                'врача',
                'врачей',
              ])}`
            : 'Пока не добавлено врачей'}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className={clsx(styles.addForm, visibility && styles.formVisible)}>
          <div className={styles.inputGroup}>
            <div className={styles.photoGroup}>
              <div className={styles.inputColumn}>
                <Input
                  ref={nameRef}
                  type={'text'}
                  label={'ФИО врача'}
                  placeholder='Введите имя врача'
                />
              </div>
              <div className={styles.inputColumn}>
                <label for='previewinput'>Фотография</label>
                <input
                  id='previewinput'
                  ref={previewRef}
                  type={'file'}
                  placeholder={'Фото'}
                />
              </div>
              <div className={styles.inputColumn}>
                <label for='certinput'>Сертификаты и документы</label>
                <input
                  id='certinput'
                  ref={certRef}
                  type={'file'}
                  placeholder={'Документы'}
                  multiple
                />
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.photoGroup}>
              <div className={styles.inputColumn}>
                <Input
                  ref={experienceRef}
                  type={'text'}
                  label={'Опыт врача'}
                  placeholder='25 лет'
                />
              </div>
              <div className={styles.inputColumn}>
                <Input
                  ref={specialityRef}
                  type={'text'}
                  label={'Специальность'}
                  placeholder='Врач-ортопед'
                />
              </div>
            </div>
          </div>
          <div>
            <p className={styles.blockTitle}>Образование врача</p>
            <Wysiwyg state={descriptionState} setState={setDescriptionState} />
            <NextUIButton
              color='primary'
              bordered
              onClick={descrCodeHandle}
              disabled={
                draftToHtml(convertToRaw(descriptionState.getCurrentContent()))
                  .length > 8
                  ? false
                  : true
              }
            >
              {descrCodeVisibility ? 'Скрыть код' : 'Показать код'}
            </NextUIButton>
            <textarea
              className={clsx(
                styles.code,
                descrCodeVisibility && styles.codeVisible
              )}
              disabled
              ref={descriptionRef}
              value={draftToHtml(
                convertToRaw(descriptionState.getCurrentContent())
              )}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.photoGroup}>
              <div className={styles.inputColumn}>
                <Input
                  ref={offerTitleRef}
                  type={'text'}
                  label={'Заголовок оффера'}
                  placeholder='Заполните поле'
                />
              </div>
              <div className={styles.inputColumn}>
                <Input
                  ref={offerSubtitleRef}
                  type={'text'}
                  label={'Подзаголовок оффера'}
                  placeholder='Заполните поле'
                />
              </div>
            </div>
          </div>

          <Button type='success' loading={isLoading}>
            Опубликовать
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddService;
