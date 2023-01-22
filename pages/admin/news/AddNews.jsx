import { Button } from '@/components/Button';
import { Button as NextUIButton } from '@nextui-org/react';
import { fetcher } from '@/lib/fetch';
import { Card, Input } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styles from './AddNews.module.scss';
import { transliterate as tr, slugify } from 'transliteration';
import clsx from 'clsx';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Wysiwyg } from '@/components/Wysiwyg';
import { useNewsPages } from '@/lib/news';

const AddNews = () => {
  const { mutate } = useNewsPages();
  //   const news = data ? data.reduce((acc, val) => [...acc, ...val.news], []) : [];

  const [visibility, setVisibility] = useState(false);
  const [contentCodeVisibility, setContentCodeVisibility] = useState(false);

  const contentCodeHandle = () => {
    setContentCodeVisibility(contentCodeVisibility === false ? true : false);
  };

  const formHandle = () => {
    setVisibility(visibility === false ? true : false);
  };

  const nameRef = useRef();
  const contentRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [contentState, setContentState] = useState(() =>
    EditorState.createEmpty()
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        const translite = tr(nameRef.current.value);
        const slug = slugify(translite);

        let formData = new FormData();
        formData.append('slug', slug);
        formData.append('title', nameRef.current.value);
        formData.append('content', contentRef.current.value);

        await fetcher(`/api/news`, {
          method: 'POST',
          body: formData,
        });

        toast.success('Вы успешно добавили новость!');

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
          {visibility ? 'Скрыть' : 'Добавить новость'}
        </NextUIButton>
      </div>
      <form onSubmit={onSubmit}>
        <div className={clsx(styles.addForm, visibility && styles.formVisible)}>
          <div className={styles.inputGroup}>
            <div className={styles.photoGroup}>
              <div className={styles.inputColumn}>
                <Input
                  ref={nameRef}
                  type={'text'}
                  label={'Заголовок новости'}
                  placeholder='Введите заголовок'
                />
              </div>
            </div>
          </div>
          <div>
            <p className={styles.blockTitle}>Контент</p>
            <Wysiwyg state={contentState} setState={setContentState} />
            <NextUIButton
              color='primary'
              bordered
              onClick={contentCodeHandle}
              disabled={
                draftToHtml(convertToRaw(contentState.getCurrentContent()))
                  .length > 8
                  ? false
                  : true
              }
            >
              {contentCodeVisibility ? 'Скрыть код' : 'Показать код'}
            </NextUIButton>
            <textarea
              className={clsx(
                styles.code,
                contentCodeVisibility && styles.codeVisible
              )}
              disabled
              ref={contentRef}
              value={draftToHtml(
                convertToRaw(contentState.getCurrentContent())
              )}
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

export default AddNews;
