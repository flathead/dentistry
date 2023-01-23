import { usePromoPages } from '@/lib/promo';
import clsx from 'clsx';
import Image from 'next/image';
import Countdown from 'react-countdown';
import { ButtonDent } from '../Button/Button';
import { Title } from '../Title';
import styles from './Promo.module.scss';

const Promo = ({ homepage }) => {
  const { data } = usePromoPages();
  const promos = data
    ? data.reduce((acc, val) => [...acc, ...val.promos], [])
    : [];

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

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <></>;
    } else {
      return (
        <div className={styles.timer}>
          <p className={styles.timerWarning}>До конца акции осталось:</p>
          <div
            className={clsx(styles.numbers, homepage && styles.homepageNumbers)}
          >
            <span>
              {String(days).padStart(2, '0')}
              <span className={styles.label}>
                {createLabel(days, ['день', 'дня', 'дней'])}
              </span>
            </span>
            <span>
              {String(hours).padStart(2, '0')}
              <span className={styles.label}>
                {createLabel(hours, ['час', 'часа', 'часов'])}
              </span>
            </span>
            <span>
              {String(minutes).padStart(2, '0')}{' '}
              <span className={styles.label}>
                {createLabel(minutes, ['минута', 'минуты', 'минут'])}
              </span>
            </span>
            <span>
              {String(seconds).padStart(2, '0')}
              <span className={styles.label}>
                {createLabel(seconds, ['секунда', 'секунды', 'секунд'])}
              </span>
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Title size={2} template={'pageTitle'}>
        Специальные предложения
      </Title>
      {promos.length >= 1 ? (
        promos.map((promo) => (
          <div
            key={promo._id}
            className={clsx(
              styles.promoContainer,
              homepage && styles.homepageContainer
            )}
          >
            {!homepage ? <span className={styles.tape}>АКЦИЯ</span> : null}
            {!homepage ? (
              <div className={styles.promoPicture}>
                <Image
                  src={promo.preview}
                  alt='Промо-изображение'
                  width={400}
                  height={400}
                />
              </div>
            ) : null}
            <div className={styles.promoContent}>
              <p
                className={clsx(
                  styles.promoTitle,
                  homepage && styles.homepageTitle
                )}
              >
                {promo.title}
              </p>
              <p
                className={clsx(
                  styles.promoSubtitle,
                  homepage && styles.homepageSubtitle
                )}
              >
                {promo.subtitle}
              </p>
              <Countdown
                date={new Date(
                  String(promo.date + ', ' + promo.time)
                ).toISOString()}
                renderer={renderer}
              />
              <ButtonDent color='blue' modal>
                Получить скидку
              </ButtonDent>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.promoEmpty}>
          {!homepage ? (
            <>
              <p className={styles.emptyTitle}>
                В данный момент не проводятся акции.
              </p>
              <p className={styles.emptySubtitle}>
                Следите за обновлениями на данной странице и в наших{' '}
                <a href='#socials'>соцсетях</a>!
              </p>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Promo;
