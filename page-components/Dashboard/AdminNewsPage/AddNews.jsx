import { Button } from '@/components/Button';
import { Button as NextUIButton } from '@nextui-org/react';
import { fetcher } from '@/lib/fetch';
import { Card, Input } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './AddNews.module.scss';
import clsx from 'clsx';
import { ArrowDown, ArrowUp } from 'react-feather';
import { usePortfolioPages } from '@/lib/portfolio';

const AddNews = () => {
  const { data } = usePortfolioPages();
  const news = data ? data.reduce((acc, val) => [...acc, ...val.news], []) : [];

  const [visibility, setVisibility] = useState(false);

  const formHandle = () => {
    setVisibility(visibility === false ? true : false);
  };

  const titleRef = useRef();
  const beforeRef = useRef();
  const afterRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = usePortfolioPages();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        let formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('workbefore', beforeRef.current.files[0]);
        formData.append('workafter', afterRef.current.files[0]);
        const res = await fetcher('/api/works', {
          method: 'POST',
          body: formData,
        });

        if (res.status === 200) {
          toast.success('Вы успешно добавили новость!');
        }
        console.log(JSON.stringify(res));

        // titleRef.current.value = '';
        // beforeRef.current.value = '';
        // afterRef.current.value = '';

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
          {visibility ? 'Скрыть' : 'Добавить новость'}
        </NextUIButton>
        <p>
          {news && news.length >= 1
            ? `${createLabel(news.length, [
                'Добавлена',
                'Добавлено',
                'Добавлено',
              ])} ${news.length} ${createLabel(news.length, [
                'новость',
                'новости',
                'новостей',
              ])}`
            : 'Пока не добавлено новостей'}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className={clsx(styles.addForm, visibility && styles.formVisible)}>
          <div className={styles.inputGroup}>
            <div className={styles.photoGroup}>
              <div className={styles.inputColumn}>
                <Input
                  ref={titleRef}
                  type={'text'}
                  label={'Название работы'}
                  placeholder='Напр., "Имплантация all-on-6 и виниры на зубы"'
                />
              </div>
              <div className={styles.inputColumn}>
                <label htmlFor='before'>До</label>
                <input
                  id='before'
                  ref={beforeRef}
                  type='file'
                  name='workbefore'
                  placeholder='До'
                />
              </div>
              <div className={styles.inputColumn}>
                <label htmlFor='after'>После</label>
                <input
                  id='after'
                  ref={afterRef}
                  type='file'
                  name='workafter'
                  placeholder='После'
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

export default AddNews;
