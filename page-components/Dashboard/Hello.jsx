import { Title } from '@/components/Title';
import { useState } from 'react';
import styles from './Hello.module.scss';

const Hello = ({ user }) => {
  const [time, setTime] = useState(new Date());
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <>
      <div className={styles.helloCard}>
        <div className={styles.timeBox}>
          <span className={styles.nowSpan}>Сейчас</span>
          <div className={styles.timeNow}>
            <span className={styles.timeHours}>{hours}</span>
            <span className={styles.timeSeparator}> : </span>
            <span className={styles.timeMinutes}>{minutes}</span>
          </div>
        </div>
        <div className={styles.textBox}>
          <Title size={1}>
            Добро пожаловать,
            <br />
            <span className={styles.name}>
              {user.name
                ? user.name
                : user.username
                ? user.username
                : user.email}
              !
            </span>
          </Title>
          <p>
            Вы находитесь в Центре - главной странице панели администратора.
          </p>
          <p>
            В Центре вы можете добавить, изменить и удалить любой
            <br />
            тип контента на сайте - услуги, врачей, акции, работы, отзывы.
          </p>
        </div>
      </div>
    </>
  );
};

export default Hello;
