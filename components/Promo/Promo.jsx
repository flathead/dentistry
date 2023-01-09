import Image from 'next/image';
import Countdown from 'react-countdown';
import { ButtonDent } from '../Button/Button';
import styles from './Promo.module.scss';

const timers = [
  {
    id: 'timer-01',
    finalDate: '2023-01-08T23:59:59.000Z',
    title: 'Весь месяц!',
    subtitle:
      'Оставь заявку сейчас и получи компьютерную томографию верхней и нижней челюсти всего за 250 рублей',
    image:
      'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672859419/Group_112_p6dyyy.png',
    url: 'actsia-01',
  },
  {
    id: 'timer-02',
    finalDate: '2023-01-08T23:59:59.000Z',
    title: 'Осмотр ортопеда бесплатно!',
    subtitle: 'Оставь заявку сейчас и получи скидку 5% на дальнейшее лечение',
    image:
      'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672859419/Group_112_p6dyyy.png',
    url: 'aktsia-02',
  },
];

const Promo = () => {
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
          <div className={styles.numbers}>
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
      {timers.length >= 1 ? (
        timers.map((timer) => (
          <div key={timer.id} className={styles.promoContainer}>
            <span className={styles.tape}>АКЦИЯ</span>
            <div className={styles.promoPicture}>
              <Image
                src={timer.image}
                alt='Промо-изображение'
                width={400}
                height={400}
              />
            </div>
            <div className={styles.promoContent}>
              <p className={styles.promoTitle}>{timer.title}</p>
              <p className={styles.promoSubtitle}>{timer.subtitle}</p>
              <Countdown date={timer.finalDate} renderer={renderer} />
              <ButtonDent color='blue' modal>
                Получить скидку
              </ButtonDent>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.promoEmpty}>
          <p className={styles.emptyTitle}>
            В данный момент не проводятся акции.
          </p>
          <p className={styles.emptySubtitle}>
            Следите за обновлениями на данной странице и в наших{' '}
            <a href='#socials'>соцсетях</a>!
          </p>
        </div>
      )}
    </>
  );
};

export default Promo;
