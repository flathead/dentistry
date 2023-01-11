import { sendMsg } from '@/lib/telegram';
import { Input, useInput } from '@nextui-org/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ButtonDent } from '../Button/Button';
import { ModalWindow } from '../ModalWindow';
import { Title } from '../Title';
import styles from './Offer.module.scss';

const Offer = ({
  template,
  className,
  title,
  subtitle,
  image,
  alt,
  imageTitle,
}) => {
  const [modal, setModal] = useState(false);
  const modalHandler = () => {
    setModal(true);
    setModal([]);
  };
  const { value, reset, bindings } = useInput('');

  const validatePhone = (value) => {
    return value.match(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/i);
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: '',
        color: '',
        disabled: false,
      };
    const isValid = validatePhone(value);
    return {
      text: isValid ? 'Корректный номер' : 'Введите корректный номер',
      color: isValid ? 'success' : 'error',
      disabled: isValid ? false : true,
    };
  }, [value]);

  const getHandler = async () => {
    sendMsg(
      `<b>📞 Заявка на обратный звонок!</b>%0A%0AТелефон: <a href="tel:${value}">${value}</a>%0A%0AЗаявка с главной страницы%0A${window.location.href}`
    );
  };

  const [width, setWidth] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);

  return (
    <>
      <ModalWindow open={modal} />
      <div
        className={clsx(
          styles.offer,
          template === 'homepage' && styles.homepage,
          className
        )}
        template={template}
      >
        <div className={styles.layoutGrid}>
          <div
            className={clsx(
              styles.offerContent,
              template === 'homepage' && styles.homepageLayout
            )}
          >
            <div>
              <p className={styles.inactiveBtn}>Стоматология</p>
              <Title size={1}>{title}</Title>
              <p className={styles.subtitle}>{subtitle}</p>
              {template === 'homepage' ? (
                <div className={styles.cta}>
                  <Input
                    {...bindings}
                    shadow={false}
                    onClearClick={reset}
                    status={helper.color}
                    color={helper.color}
                    helperColor={helper.color}
                    helperText={helper.text}
                    type='tel'
                    className={styles.ctaInput}
                    labelPlaceholder={
                      width >= 480 ? 'Ваш номер телефона' : 'Телефон'
                    }
                  />
                  <ButtonDent
                    disabled={helper.disabled}
                    onClick={getHandler}
                    color='blue'
                  >
                    Получить
                  </ButtonDent>
                </div>
              ) : template === 'staff' || template === 'doctor' ? (
                <ButtonDent color='blue' onClick={modalHandler}>
                  {template === 'doctor'
                    ? 'Запишись на консультацию'
                    : 'Получить консультацию'}
                </ButtonDent>
              ) : null}
            </div>
          </div>
          <div
            className={clsx(
              styles.offerPicture,
              template === 'staff' || template === 'doctor'
                ? styles.offerPictureBordered
                : null
            )}
          >
            {template === 'homepage' ? (
              <>
                <Image
                  className={styles.offerPictureBackground}
                  src={'/images/pages/homepage/homepage_headerBackground.jpg'}
                  quality={90}
                  alt={'Фон заголовка страницы'}
                  width={540}
                  height={640}
                  priority={true}
                />
                <Image
                  className={styles.offerPicturePerson}
                  src={'/images/pages/homepage/family.webp'}
                  quality={100}
                  alt={'Стоматолог'}
                  width={1000}
                  height={1000}
                  priority={false}
                />
              </>
            ) : template === 'staff' ? (
              <Image
                src={
                  'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692655/about%28team%29/IMG_2995_kiripv.jpg'
                }
                alt='Врачи клиники'
                quality={85}
                height={4116}
                width={2744}
                className={styles.offerPictureStaff}
              />
            ) : template === 'doctor' ? (
              <Image
                src={image}
                alt={alt}
                title={imageTitle}
                width={600}
                height={600}
                quality={90}
                style={{ objectFit: 'cover' }}
                className={styles.offerPictureStaff}
              />
            ) : null}
          </div>
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <p className={styles.benefitNumber}>9000+</p>
              <p className={styles.benefitDescription}>Довольных клиентов</p>
            </div>
            <div className={styles.benefit}>
              <p className={styles.benefitNumber}>4,7</p>
              <p className={styles.benefitDescription}>
                Рейтинг организации в Яндексе
              </p>
            </div>
            <div className={styles.benefit}>
              <p className={styles.benefitNumber}>10 лет</p>
              <p className={styles.benefitDescription}>
                Средний стаж наших специалистов
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
