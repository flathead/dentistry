import { Button } from '@/components/Button';
import { Button as NextUIButton, Radio } from '@nextui-org/react';
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
import { useServicePages } from '@/lib/service';
import ServiceLength from './ServiceLength';
import { useCategoryPages } from '@/lib/category';
import { Wysiwyg } from '@/components/Wysiwyg';

const AddService = () => {
  const { mutate } = useServicePages();
  const { data } = useCategoryPages();
  const categories = data
    ? data.reduce((acc, val) => [...acc, ...val.categories], [])
    : [];

  const [visibility, setVisibility] = useState(false);
  const [descrCodeVisibility, setDescrCodeVisibility] = useState(false);
  const [priceCodeVisibility, setPriceCodeVisibility] = useState(false);

  const descrCodeHandle = () => {
    setDescrCodeVisibility(descrCodeVisibility === false ? true : false);
  };
  const priceCodeHandle = () => {
    setPriceCodeVisibility(priceCodeVisibility === false ? true : false);
  };

  const formHandle = () => {
    setVisibility(visibility === false ? true : false);
  };

  const nameRef = useRef();
  const categoryRef = useRef();
  const previewRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const [category, setCategory] = useState('63cc3a9833d8de5360907776');
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionState, setDescriptionState] = useState(() =>
    EditorState.createEmpty()
  );
  const [priceState, setPriceState] = useState(() => EditorState.createEmpty());

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
        formData.append('categoryId', categoryRef.current.value);
        if (previewRef.current.files && previewRef.current.files[0]) {
          formData.append('preview', previewRef.current.files[0]);
        }
        formData.append('description', descriptionRef.current.value);
        formData.append('price', priceRef.current.value);

        await fetcher(`/api/services`, {
          method: 'POST',
          body: formData,
        });

        toast.success('Вы успешно добавили услугу!');

        // nameRef.current.value = '';
        // categoryRef.current.value = '';
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
          {visibility ? 'Скрыть' : 'Добавить услугу'}
        </NextUIButton>
        <ServiceLength />
      </div>
      <form onSubmit={onSubmit}>
        <div className={clsx(styles.addForm, visibility && styles.formVisible)}>
          <div className={styles.inputGroup}>
            <div className={styles.photoGroup}>
              <div className={styles.inputColumn}>
                <Input
                  ref={nameRef}
                  type={'text'}
                  label={'Название услуги'}
                  placeholder='Напр., Лечение кариеса'
                />
              </div>
              <div className={styles.inputColumn}>
                <label for='previewinput'>Изображение услуги</label>
                <input
                  id='previewinput'
                  ref={previewRef}
                  type={'file'}
                  placeholder={'Изображение'}
                />
              </div>
            </div>
            <input type='hidden' value={category} ref={categoryRef} />
            <Radio.Group
              label='Категория услуги'
              value={category}
              onChange={setCategory}
              defaultValue='63cc3a9833d8de5360907776'
              orientation='vertical'
            >
              <Radio
                size='sm'
                value='63cc3a9833d8de5360907776'
                description='Для услуг без категории'
                color='error'
              >
                Без категории
              </Radio>
              {categories.map((category) => (
                <Radio
                  className={
                    category._id === '63cc3a9833d8de5360907776'
                      ? styles.hiddenRadio
                      : null
                  }
                  key={category._id}
                  size='sm'
                  value={category._id}
                  description={'/' + category.slug}
                >
                  {category.title}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <div>
            <p className={styles.blockTitle}>Описание услуги</p>
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

export default AddService;
