import { Consultation } from '@/components/Consultation';
import { Spacer, Wrapper } from '@/components/Layout';
import { MapComponent } from '@/components/Map';
import { Title } from '@/components/Title';
import Image from 'next/image';
import ReviewList from '../Reviews/ReviewList';
import styles from './TechPage.module.scss';

const TechPage = () => {
  function createLabel(number, titles) {
    // год, года, лет
    const cases = [2, 0, 1, 1, 1, 2];
    return `${
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }`;
  }
  const date = new Date();
  return (
    <>
      <Wrapper>
        <Title size={1} template='pageTitle'>
          Артикон
        </Title>
        <Image
          className={styles.picture}
          src={
            'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672948041/articon_lz83gv.jpg'
          }
          alt='Артикон'
          width={1200}
          height={717}
        />
        <div className={styles.about}>
          <p>
            <strong>ARTICON</strong> давно уже известное имя в стоматологических
            кругах. Группа компаний «Артикон» уже много лет сотрудничает и
            поставляет оборудование и материалы стоматологическим клиникам из
            Германии, США и Южной Корее. Но также эта компания славится и своим
            высококлассным фрезерным центром в Москве, который работает на
            аппаратах CAD/ CAM.
          </p>
          <p>
            Мы сотрудничаем с фрезерным центром <strong>ARTICON</strong> уже{' '}
            <span title='С 2016 года'>
              {date.getFullYear() - 2016}{' '}
              {createLabel(date.getFullYear() - 2016, ['год', 'года', 'лет'])}
            </span>
            . Началось все с покупки оборудования, в том числе и 3D сканнера
            Medit. После проходили обучение для освоения навыков работы с
            высокоточным стоматологическим оборудованием. А сейчас перешли на
            более тесное сотрудничество их зуботехнической лабораторией.
          </p>
          <p>
            <strong>Артикон</strong> изготавливает для нас навигационные шаблоны
            для немедленной нагрузки и установки имплантов. Благодаря точному
            расчету шаблоны помогают установить доктору импланты нужного
            размера, а пациенту уйти с временными коронками уже в день операции.
            Также, исходя из конструкции будущего протеза и с помощью шаблонов,
            доктор устанавливает импланты максимально точно и в
            оптимально-правильном положении. Это в дальнейшем помогает избежать
            ошибок и сделать работу более эстетичной и функциональной.
          </p>
          <p>
            Более того, все работы на имплантах мы выполняем в цифровом
            протоколе с <strong>Артиконом</strong>, так как они обеспечивают
            высокое качество и точность, благодаря современному оборудованию и
            технологиям. Все остальные работы выполняют наши профессиональные
            техники, с чьими работами вы можете ознакомиться в фотогалерее.
            Кроме того, если Вы желаете, чтобы над Вашей улыбкой работал
            определенный техник, укажите его имя при составлении плана лечения,
            и мы исполним Ваши пожелания. Нам важно, чтобы Ваш опыт лечения у
            нас был комфортным и приятным!
          </p>
        </div>
      </Wrapper>
      <Spacer size={2} />
      <ReviewList
        template={'slider'}
        title={
          <>
            <b>Отзывы</b> наших пациентов
          </>
        }
      />
      <Spacer size={2} />
      <Consultation />
      <Spacer size={4} />
      <Wrapper>
        <Title size={2} template='pageTitle'>
          <b>Контактная</b> информация
        </Title>
      </Wrapper>
      <MapComponent template={'homepage'} />
    </>
  );
};

export default TechPage;
