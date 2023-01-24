import { sendMsg } from '@/lib/telegram';
import { Input, useInput } from '@nextui-org/react';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import { Phone, User } from 'react-feather';
import HtmlParser from 'react-html-parser';
import { ButtonDent } from '../Button/Button';
import { Consultation } from '../Consultation';
import { Container, Spacer, Wrapper } from '../Layout';
import { MapComponent } from '../Map';
// import { Offer } from '../Offer';
import { Title } from '../Title';
import styles from './Doctor.module.scss';

const Doctor = ({ doctor }) => {
  const doctorInfo = [
    {
      id: 'info1',
      key: 'Специализация:',
      content: doctor.speciality,
    },
    {
      id: 'info2',
      key: 'Стаж работы:',
      content: doctor.experience,
    },
    {
      id: 'info3',
      key: 'Образование:',
      content: (
        <div className={styles.education}>{HtmlParser(doctor.education)}</div>
      ),
    },
  ];

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

  const nameRef = useRef();
  const phoneRef = useRef();

  const messageHandle = () => {
    sendMsg(
      `📞 <b>Заявка на обратный звонок!</b>%0A%0AИмя: ${nameRef.current.value}%0AТелефон: ${phoneRef.current.value}%0A%0AОтправлено со страницы:%0A${window.location.href}`
    );
  };

  return (
    <>
      {/* <Offer
        template='doctor'
        doctor={doctor}
        title={
          <>
            <b>Бережное лечение</b> зубов с гарантией на <i>результат</i>
          </>
        }
        subtitle={
          <>
            Запишись на бесплатную консультацию и получи подробный{' '}
            <b>план лечения зубов</b>.
          </>
        }
        image={doctor.photo}
        alt={doctor.name}
        imageTitle={doctor.name}
      /> */}
      <Container fullwidth className={styles.offer}>
	  <Spacer size={2} />
        <Wrapper> 
          <h2 className={styles.offerTitle}>
            <span className={styles.blue}>Запишитесь</span> на бесплатную
            консультацию и получите{' '}
            <span className={styles.blue}>скидку 15%</span> на{' '}
            <span className={styles.underlined}>первую процедуру</span>
          </h2>
          <div className={styles.grid}>
            <div className={styles.benefits}>
              <p class={styles.benefitsTitle}>
                На консультации врач определит Вашу проблему и предложит пути
                решения
              </p>
              <ul className={styles.benefitsList}>
                <li>
                  <Image
                    src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672051449/Group_111_ygcfrf.png'
                    alt='Точка'
                    width={34}
                    height={34}
                    quality={100}
                  />
                  Ответит на все интересующие Вас вопросы
                </li>
                <li>
                  <Image
                    src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672051449/Group_111_ygcfrf.png'
                    alt='Точка'
                    width={34}
                    height={34}
                    quality={100}
                  />
                  Определит проблему
                </li>
                <li>
                  <Image
                    src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672051449/Group_111_ygcfrf.png'
                    alt='Точка'
                    width={34}
                    height={34}
                    quality={100}
                  />
                  Предложит пути решения
                </li>
              </ul>
            </div>

            <div className={styles.specialist}>
              <Image
                src={doctor.photo}
                className={styles.photo}
                alt={doctor.name}
                title={doctor.name}
                width={600}
                height={600}
              />
              <p className={styles.specName}>{doctor.name}</p>
              <p className={styles.specSpec}>{doctor.speciality}</p>
            </div>

            <div className={styles.form}>
              <p className={styles.formTitle}>Укажите Ваши контактные данные</p>
              <p className={styles.formSubtitle}>
                чтобы получить бесплатную консультацию специалиста уже через 10
                минут
              </p>
              <Input
                type='text'
                label='Как к Вам обращаться'
                placeholder='Ваше имя'
                fullWidth
                clearable
                ref={nameRef}
                contentLeft={<User />}
              />
              <Input
                {...bindings}
                onClearClick={reset}
                status={helper.color}
                color={helper.color}
                helperColor={helper.color}
                helperText={helper.text}
                clearable
                fullWidth
                label='Введите Ваш номер телефона'
                placeholder='8 (___) __-__-__'
                type='tel'
                ref={phoneRef}
                contentLeft={<Phone />}
              />
              <ButtonDent
                className={styles.formBtn}
                color={'blue'}
                onClick={messageHandle}
              >
                Получить консультацию
              </ButtonDent>
              <p className={styles.formSmallText}>
                Нажимая на кнопку, Вы даете согласие на обработку данных и
                соглашаетесь с политикой конфеденциальности.
              </p>
            </div>
          </div>
          <Spacer size={4} />
        </Wrapper>
      </Container>

      <Spacer size={4} />

      <div className={styles.information}>
        <Image
          className={styles.teeth}
          src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672045959/1619494083_30-phonoteka_org-p-stomatolog-fon-33-PhotoRoom-transformed_1_dp40vj.png'
          alt=''
          width={180}
          height={220}
        />
        <h2 className={styles.name}>{doctor.name}</h2>
        {doctorInfo.map((infoItem, i) => (
          <div key={'infoblock-' + i++} className={styles.informationRow}>
            <p className={styles.rowName}>{infoItem.key}</p>
            <p className={styles.rowContent}>{infoItem.content}</p>
          </div>
        ))}
      </div>

      <Spacer size={4} />

      <Consultation />

      <Spacer size={4} />

      <Wrapper>
        <Title size={2} template='pageTitle'>
          Контактная <i>информация</i>
        </Title>
      </Wrapper>
      <MapComponent template={'homepage'} />
    </>
  );
};

export default Doctor;
