import clsx from 'clsx';
import styles from './StarRating.module.scss';

const StarRating = ({ stars }) => {
  const rating = Number(stars);
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
    <div className={styles.starRating}>
      <div className={styles.stars}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          star;
          return (
            <button
              type='button'
              key={index}
              className={clsx(
                styles.ratingBtn,
                index <= rating ? styles.ratingOn : styles.ratingOff
              )}
            >
              <span className={styles.ratingStar}>&#9733;</span>
            </button>
          );
        })}
      </div>
      <span className={styles.starCount}>
        {rating} {createLabel(rating, ['звезда', 'звезды', 'звёзд'])}
      </span>
    </div>
  );
};

export default StarRating;
