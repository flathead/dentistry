import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { StarRating } from '../StarRating';
import styles from './Review.module.css';

const Review = ({ template, review, className }) => {
  const [show, setShow] = useState(false);
  const showDescription = () => {
    setShow(show === false ? true : false);
    setTimeout(() => {
      setShow(false);
    }, 10000);
  };
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(review.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Только что';
    return `${format(diff, true)
      .replace('hour', 'ч.')
      .replace('minute', 'мин.')
      .replace('month', 'мес.')
      .replace('year', 'г.')
      .replace('second', 'сек.')
      .replace('s', '')} назад`;
  }, [review.createdAt]);
  return (
    <>
      <div
        className={clsx(
          styles.root,
          className,
          template === 'slider' && styles.slide
        )}
      >
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>{review.name}</p>
            <time
              dateTime={String(review.createdAt)}
              className={styles.timestamp}
            >
              {timestampTxt}
            </time>
          </Container>
        </Container>
        <div className={styles.wrap}>
          <StarRating stars={review.rating} />
        </div>
        <div className={styles.wrap}>
          <p
            className={clsx(
              styles.content,
              template === 'slider' && show === true
                ? styles.show
                : review.content.length >= 100
                ? styles.hidden
                : null
            )}
          >
            {review.content}
          </p>
          {template === 'slider' && String(review.content).length >= 100 ? (
            <button className={styles.readMoreBtn} onClick={showDescription}>
              {show === false ? 'Читать далее' : 'Скрыть'}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Review;
