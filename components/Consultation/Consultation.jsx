import { sendMsg } from '@/lib/telegram';
import Image from 'next/image';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { ButtonDent } from '../Button/Button';
import { Wrapper } from '../Layout';
import styles from './Consultation.module.scss';

const Consultation = ({ page }) => {
  let currentPage;
  page == 'home' ? (currentPage = 'Заявка c главной страницы') : null;
  const nameRef = useRef();
  const phoneRef = useRef();

  const handleSubmit = () => {
    sendMsg(
      `<b>📞 Заявка на обратный звонок!</b>%0A%0AИмя: ${nameRef.current.value}%0AТелефон: <a href="tel:${phoneRef.current.value}">${phoneRef.current.value}</a>%0A%0A${currentPage}%0A${window.location.href}`
    );
    toast.success(
      `Спасибо${
        nameRef.current.value ? ', ' + nameRef.current.value + '! ' : '! '
      }Ваша заявка отправлена.`
    );
  };

  return (
    <div className={styles.consultationBlock}>
      <div className={styles.consultationGradient}>
        <Wrapper className={styles.consultationWrapper}>
          <div className={styles.offer}>
            <div>
              <p className={styles.title}>
                Запишись <span>на консультацию</span>
              </p>
              <p className={styles.subTitle}>
                Оставьте заявку и мы перезвоним вам через 5 минут
              </p>
            </div>
            <div className={styles.form}>
              <input
                className={styles.input}
                placeholder={'Ваше имя'}
                ref={nameRef}
                type='text'
              />
              <input
                className={styles.input}
                placeholder={'Телефон'}
                ref={phoneRef}
                type='tel'
              />
              <ButtonDent
                className={styles.consultationBtn}
                color={'dark'}
                onClick={handleSubmit}
              >
                Записаться
              </ButtonDent>
            </div>
          </div>
          <Image
            alt={'Закажите консультацию'}
            src={'/images/consultant.png'}
            width={340}
            height={280}
            quality={100}
          />
        </Wrapper>
      </div>
    </div>
  );
};

export default Consultation;
