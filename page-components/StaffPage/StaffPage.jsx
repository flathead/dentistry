import { Advantages } from '@/components/Advantages';
import { Doctors } from '@/components/Doctors';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { MapComponent } from '@/components/Map';
import { Offer } from '@/components/Offer';
import { Title } from '@/components/Title';
import ReviewList from '../Reviews/ReviewList';
import styles from './StaffPage.module.scss';

const StaffPage = () => {
  const adventages = [
    {
      id: 'adv-1',
      title: 'Имплантация зубов',
      descr: 'Описание отсутствует',
      align: 'left-bottom',
    },
    {
      id: 'adv-2',
      title: 'Удаление зубов',
      descr:
        'Удаление зуба — хирургическая операция в стоматологии по экстракции зуба из зубной альвеолы',
      align: 'left',
    },

    {
      id: 'adv-3',
      title: 'Детская стоматология',
      descr: 'Описание отсутствует',
      align: 'left',
    },
    {
      id: 'adv-4',
      title: 'Эстетическая реставрация',
      descr: 'Описание отсутствует',
      align: 'left-bottom',
    },
    {
      id: 'adv-5',
      title: 'Профессиональная гигиена',
      descr: 'Описание отсутствует',
      align: 'right-bottom',
    },
    {
      id: 'adv-6',
      title: 'Ортодонтия',
      descr: 'Описание отсутствует',
      align: 'right',
    },
    {
      id: 'adv-7',
      title: 'КТ (Компьютерная томография) зубов',
      descr: 'Описание отсутствует',
      align: 'right',
    },
    {
      id: 'adv-8',
      title: 'Изготовление и ремонт зубных протезов',
      descr: 'Описание отсутствует',
      align: 'right-bottom',
    },
  ];

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
            'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670607397/advantages/48c4c836863625_2_a3y0xc.png'
          }
          staticImage={false}
          adv1_title={adventages[0].title}
          adv2_title={adventages[1].title}
          adv3_title={adventages[2].title}
          adv4_title={adventages[3].title}
          adv5_title={adventages[4].title}
          adv6_title={adventages[5].title}
          adv7_title={adventages[6].title}
          adv8_title={adventages[7].title}
          adv1_descr={adventages[0].descr}
          adv2_descr={adventages[1].descr}
          adv3_descr={adventages[2].descr}
          adv4_descr={adventages[3].descr}
          adv5_descr={adventages[4].descr}
          adv6_descr={adventages[5].descr}
          adv7_descr={adventages[6].descr}
          adv8_descr={adventages[7].descr}
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
