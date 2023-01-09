import { Button } from '@/components/Button';
import { Button as NextUIButton, Textarea } from '@nextui-org/react';
import { fetcher } from '@/lib/fetch';
import { Card, Input } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import styles from './AddPromo.module.scss';

import clsx from 'clsx';
import { ArrowDown, ArrowUp } from 'react-feather';
import { usePromoPages } from '@/lib/promo';

const AddPromo = () => {
  const { data, mutate } = usePromoPages();
  const promos = data
    ? data.reduce((acc, val) => [...acc, ...val.promos], [])
    : [];

  const [visibility, setVisibility] = useState(false);

  const formHandle = () => {
    setVisibility(visibility === false ? true : false);
  };

  const titleRef = useRef();
  const subtitleRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const previewRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        let formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('subtitle', subtitleRef.current.value);
        formData.append('date', dateRef.current.value);
        formData.append('time', timeRef.current.value);
        if (previewRef.current.files && previewRef.current.files[0]) {
          formData.append('preview', previewRef.current.files[0]);
        }

        await fetcher('/api/promos', {
          method: 'POST',
          body: formData,
        });

        toast.success('Вы успешно добавили акцию!');

        titleRef.current.value = '';
        subtitleRef.current.value = '';
        dateRef.current.value = '';
        timeRef.current.value = '';
        previewRef.current.value = '';

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
          {visibility ? 'Скрыть' : 'Добавить акцию'}
        </NextUIButton>
        <p>
          {promos && promos.length >= 1
            ? `${createLabel(promos.length, [
                'Добавлена',
                'Добавлено',
                'Добавлено',
              ])} ${promos.length} ${createLabel(promos.length, [
                'акция',
                'акции',
                'акций',
              ])}`
            : 'Пока не добавлено акций'}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className={clsx(styles.addForm, visibility && styles.formVisible)}>
          <div className={styles.group}>
            <Input
              ref={titleRef}
              type='text'
              label='Название (заголовок)'
              placeholder='Напр.: "Весь месяц!"'
            />
            <Textarea
              ref={subtitleRef}
              label='Содержание / описание'
              placeholder='Заполните это поле'
            />
            <Input
              ref={dateRef}
              type='date'
              label='Дата окончания'
              placeholder='Выберите дату'
            />
            <Input
              ref={timeRef}
              type='time'
              label='Время окончания'
              placeholder='Выберите время'
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
          <Button type='success' loading={isLoading}>
            Опубликовать
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddPromo;
