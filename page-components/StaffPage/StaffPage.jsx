import { Advantages } from '@/components/Advantages';
import { Doctors } from '@/components/Doctors';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { MapComponent } from '@/components/Map';
import { Offer } from '@/components/Offer';
import { Title } from '@/components/Title';
import ReviewList from '../Reviews/ReviewList';
import styles from './StaffPage.module.scss';

const StaffPage = () => {
  return (
    <div className={styles.staffPage}>
      <Offer
        template={'staff'}
        title={
          <>
            Команда врачей <b>Стоматология на Демонстрации</b>
          </>
        }
        subtitle={
          <>
            Гарантируем одинаково превосходный результат, регламенты на каждом
            этапе, фотодокументацию и личный контроль главного врача.
          </>
        }
      />

      <Spacer size={4} />

      <Container fullwidth className={styles.staffBg}>
        <Wrapper className={styles.allStaff}>
          <h2 className={styles.staffTitleTwo}>Команда профессионалов</h2>
          <p className={styles.staffSubtitle}>
            Вся наша команда подобрана главным врачом и управляющим клиники.
            Получать одинаково превосходный результат работы нам позволяют
            регламенты на каждом этапе, фотодокументация и личный контроль
            главного врача.
          </p>
          <Spacer size={2} />
          <Doctors />
          <Spacer size={4} />
        </Wrapper>
      </Container>

      <Spacer size={2} />
      <ReviewList
        template={'slider'}
        title={
          <>
            <b>Отзывы</b> наших пациентов
          </>
        }
      />

      <Spacer size={4} />

      <Wrapper>
        <Title size={2} template='pageTitle'>
          Наши <i>услуги</i>
        </Title>
        <Advantages
          imageSrc={
            'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1671651063/shutterstock_1069438157_1_hzb0xq.png'
          }
          staticImage={true}
          adv1_title={'Врач не прислушивается'}
          adv1_descr={'Описание отсутствует'}
          adv2_title={'Недостаточная стерильность'}
          adv2_descr={
            'Система очистки инструментов в несколько этапов гарантирует 100% стерелизацию.'
          }
          adv3_title={'Некачественное лечение'}
          adv3_descr={'Описание отсутствует'}
          adv4_title={'Старое оборудование'}
          adv4_descr={'Описание отсутствует'}
          adv5_title={'Дорогое лечение'}
          adv5_descr={'Описание отсутствует'}
          adv6_title={'Плавающий бюджет'}
          adv6_descr={'Описание отсутствует'}
          adv7_title={'Некрасивая улыбка'}
          adv7_descr={'Описание отсутствует'}
          adv8_title={'Запах изо рта'}
          adv8_descr={'Описание отсутствует'}
        />
      </Wrapper>

      <Spacer size={4} />

      <Wrapper>
        <Title size={2} template={'pageTitle'}>
          Контактная <i>информация</i>
        </Title>
      </Wrapper>
      <MapComponent template='homepage' />
    </div>
  );
};

export default StaffPage;
