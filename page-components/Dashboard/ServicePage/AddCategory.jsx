import { Button } from '@/components/Button';
import { Button as NextUIButton } from '@nextui-org/react';
import { fetcher } from '@/lib/fetch';
import { Card, Input } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './AddService.module.scss';
import { transliterate as tr, slugify } from 'transliteration';
import clsx from 'clsx';
import { ArrowDown, ArrowUp } from 'react-feather';
import { useCategoryPages } from '@/lib/category';
import CategoryLength from './CategoryLength';
import { Wysiwyg } from '@/components/Wysiwyg';

const AddCategory = () => {
  const { mutate } = useCategoryPages();

  const [visibility, setVisibility] = useState(false);
  const [shortCodeVisibility, setShortCodeVisibility] = useState(false);
  const [descrCodeVisibility, setDescrCodeVisibility] = useState(false);
  const [priceCodeVisibility, setPriceCodeVisibility] = useState(false);

  const shortCodeHandle = () => {
    setShortCodeVisibility(shortCodeVisibility === false ? true : false);
  };
  const descrCodeHandle = () => {
    setDescrCodeVisibility(descrCodeVisibility === false ? true : false);
  };
  const priceCodeHandle = () => {
    setPriceCodeVisibility(priceCodeVisibility === false ? true : false);
  };

  const formHandle = () => {
    setVisibility(visibility === false ? true : false);
  };

  const titleRef = useRef();
  const previewRef = useRef();
  const shortRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [shortState, setShortState] = useState(() => EditorState.createEmpty());
  const [descriptionState, setDescriptionState] = useState(() =>
    EditorState.createEmpty()
  );
  const [priceState, setPriceState] = useState(() => EditorState.createEmpty());

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        const translite = tr(titleRef.current.value);
        const slug = slugify(translite);

        let formData = new FormData();
        formData.append('slug', slug);
        formData.append('title', titleRef.current.value);
        formData.append('short', shortRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('price', priceRef.current.value);
        formData.append('preview', previewRef.current.files[0]);

        const res = await fetcher('/api/categories', {
          method: 'POST',
          body: formData,
        });

        console.log(JSON.stringify(res));

        toast.success('Вы успешно добавили категорию услуг!');

        // titleRef.current.value = '';
        // shortRef.current.value = '';
        // previewRef.current.value = '';
        // descriptionRef.current.value = '';
        // priceRef.current.value = '';

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
          {visibility ? 'Скрыть' : '+ Категория'}
        </NextUIButton>
        <CategoryLength />
      </div>
      <form onSubmit={onSubmit}>
        <div className={clsx(styles.addForm, visibility && styles.formVisible)}>
          <div className={styles.inputGroup}>
            <div className={styles.photoGroup}>
              <div className={styles.inputColumn}>
                <Input
                  ref={titleRef}
                  type={'text'}
                  label={'Название категории'}
                  placeholder='Напр., Лечение зубов'
                />
              </div>
              <div className={styles.inputColumn}>
                <label for='preview'>Изображение категории</label>
                <input
                  id='preview'
                  ref={previewRef}
                  type={'file'}
                  placeholder={'Изображение'}
                />
              </div>
            </div>
          </div>
          <div>
            <p className={styles.blockTitle}>Краткое описание</p>
            <Wysiwyg state={shortState} setState={setShortState} />
            <NextUIButton
              color='primary'
              bordered
              onClick={shortCodeHandle}
              disabled={
                draftToHtml(convertToRaw(shortState.getCurrentContent()))
                  .length > 8
                  ? false
                  : true
              }
            >
              {shortCodeVisibility ? 'Скрыть код' : 'Показать код'}
            </NextUIButton>
            <textarea
              className={clsx(
                styles.code,
                shortCodeVisibility && styles.codeVisible
              )}
              disabled
              ref={shortRef}
              value={draftToHtml(convertToRaw(shortState.getCurrentContent()))}
            />
          </div>
          <div>
            <p className={styles.blockTitle}>Полное описание</p>
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
          <div>
            <p className={styles.blockTitle}>Прайс-лист</p>
            <Wysiwyg state={priceState} setState={setPriceState} />
            <NextUIButton
              color='primary'
              bordered
              onClick={priceCodeHandle}
              disabled={
                draftToHtml(convertToRaw(priceState.getCurrentContent()))
                  .length > 8
                  ? false
                  : true
              }
            >
              {priceCodeVisibility ? 'Скрыть код' : 'Показать код'}
            </NextUIButton>
            <textarea
              className={clsx(
                styles.code,
                priceCodeVisibility && styles.codeVisible
              )}
              disabled
              ref={priceRef}
              value={draftToHtml(convertToRaw(priceState.getCurrentContent()))}
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

export default AddCategory;
