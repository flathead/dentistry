import { sendMsg } from '@/lib/telegram';
import { Input, useInput } from '@nextui-org/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ButtonDent } from '../Button/Button';
import { Title } from '../Title';
import styles from './Offer.module.scss';

const Offer = ({ template, className, title, subtitle }) => {
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
          </div>
        </div>
        <div className={styles.offerPicture}>
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
            src={'/images/pages/homepage/homepage_headerDoctor.png'}
            quality={100}
            alt={'Стоматолог'}
            width={353}
            height={506}
            priority={false}
          />
        </div>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <p className={styles.benefitNumber}>9000+</p>
            <p className={styles.benefitDescription}>
              Довольных пациентов за 5 лет работы
            </p>
          </div>
          <div className={styles.benefit}>
            <p className={styles.benefitNumber}>99.9%</p>
            <p className={styles.benefitDescription}>
              Пациенты рекомендуют нашу стоматологию
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
  );
};

export default Offer;
