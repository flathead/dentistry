import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container } from '@/components/Layout';
import { fetcher } from '@/lib/fetch';
import { useReviewPages } from '@/lib/review';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './AddReview.module.css';

const AddReview = ({ user, template }) => {
  const nameRef = useRef();
  const phoneRef = useRef();
  const ratingRef = useRef();
  const contentRef = useRef();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useReviewPages();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            rating: ratingRef.current.value,
            content: contentRef.current.value,
          }),
        });
        toast.success('Вы успешно опубликовали новый отзыв!');

        nameRef.current.value = '';
        phoneRef.current.value = '';
        ratingRef.current.value = '';
        contentRef.current.value = '';

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
    <form
      id='add'
      className={template === 'form' && styles.form}
      onSubmit={onSubmit}
    >
      <Container
        className={clsx(
          styles.poster,
          template === 'form' && styles.posterForm
        )}
      >
        {template === 'form' ? (
          <p className={styles.title}>Оставьте отзыв</p>
        ) : null}
        <Input
          ref={nameRef}
          className={styles.input}
          placeholder={
            user ? user.name + ', напишите сюда своё имя' : 'Как вас зовут?'
          }
          ariaLabel={
            user ? user.name + ', напишите сюда своё имя' : 'Как вас зовут?'
          }
          label={template === 'form' ? 'Как к Вам обращаться?' : null}
        />
        <Input
          ref={phoneRef}
          className={styles.input}
          placeholder={'+7 (___) ___-__-__'}
          ariaLabel={'+7 (___) ___-__-__'}
          label={template === 'form' ? 'Введите Ваш номер телефона' : null}
        />
        <div className={styles.rating}>
          {template === 'form' ? (
            <p className={styles.ratingLabel}>Оцените нас (необ.)</p>
          ) : null}
          {[...Array(5)].map((star, index) => {
            index += 1;
            star;
            return (
              <button
                type='button'
                key={index}
                className={clsx(
                  styles.ratingBtn,
                  index <= (hover || rating)
                    ? styles.ratingOn
                    : styles.ratingOff
                )}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className={styles.ratingStar}>&#9733;</span>
              </button>
            );
          })}
        </div>
        <Input
          ref={contentRef}
          className={clsx(styles.input, styles.textarea)}
          placeholder={'Напишите отзыв'}
          ariaLabel={'Напишите отзыв'}
          label='Ваш отзыв о нашей работе'
        />
        <input type='hidden' ref={ratingRef} value={rating} />
        <Button type='success' className={styles.addBtn} loading={isLoading}>
          Опубликовать
        </Button>
      </Container>
    </form>
  );
};

export default AddReview;
