import styles from './IndexPage.module.scss';
import { Container, Spacer, Wrapper } from '@/components/Layout';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import Image from 'next/image';
import Offer from '../../components/Offer/Offer';
import { Title } from '@/components/Title';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import { ButtonDent } from '@/components/Button/Button';
import { Advantages } from '@/components/Advantages';
import { Fancybox } from '@/components/Fancybox';
import { Doctors } from '@/components/Doctors';
import MapComponent from '@/components/Map/Map';
import { Consultation } from '@/components/Consultation';
// import { ModalWindow } from '@/components/ModalWindow';
import { Promo } from '@/components/Promo';

const Index = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  //   const [open, setOpen] = useState(false);
  //   const modalHandler = () => {
  //     setOpen(true);
  //     setOpen([]);
  //   };

  const aboutPictures = [
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1676555905/VSS_6632_p93iwg.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1676555905/VSS_6632_p93iwg.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692655/about%28team%29/IMG_3004_ouqwrb.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692655/about%28team%29/IMG_3004_ouqwrb.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692652/about%28team%29/%D0%90%D1%84%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%B0%D0%BD%D0%B0_%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%BD%D0%B0_kz2cdz.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692652/about%28team%29/%D0%90%D1%84%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%B0%D0%BD%D0%B0_%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%BD%D0%B0_kz2cdz.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692659/about%28team%29/IMG_3001_iulhcp.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692659/about%28team%29/IMG_3001_iulhcp.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692661/about%28team%29/%D0%A2%D0%BE%D0%BB%D0%BA%D0%B0%D1%87%D0%B5%D0%B2%D0%B0_%D0%AE%D0%BB%D0%B8%D1%8F_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%BD%D0%B0_2_eobrdq.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692661/about%28team%29/%D0%A2%D0%BE%D0%BB%D0%BA%D0%B0%D1%87%D0%B5%D0%B2%D0%B0_%D0%AE%D0%BB%D0%B8%D1%8F_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%BD%D0%B0_2_eobrdq.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692664/about%28team%29/%D0%A1%D0%BC%D0%B8%D1%80%D0%BD%D0%BE%D0%B2_%D0%90%D1%80%D1%82%D0%B5%D0%BC_%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%B8%D1%87_dhhery.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692664/about%28team%29/%D0%A1%D0%BC%D0%B8%D1%80%D0%BD%D0%BE%D0%B2_%D0%90%D1%80%D1%82%D0%B5%D0%BC_%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%B8%D1%87_dhhery.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692675/about%28team%29/%D0%94%D0%BE%D1%80%D0%BE%D1%85%D0%BE%D0%B2_%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB_%D0%92%D0%B0%D0%BB%D0%B5%D1%80%D1%8C%D0%B5%D0%B2%D0%B8%D1%87_e0x4zd.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692675/about%28team%29/%D0%94%D0%BE%D1%80%D0%BE%D1%85%D0%BE%D0%B2_%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB_%D0%92%D0%B0%D0%BB%D0%B5%D1%80%D1%8C%D0%B5%D0%B2%D0%B8%D1%87_e0x4zd.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692679/about%28team%29/%D0%95%D1%80%D0%BC%D0%B0%D0%BA%D0%BE%D0%B2%D0%B0_%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0_%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%BD%D0%B0_fimjxs.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692679/about%28team%29/%D0%95%D1%80%D0%BC%D0%B0%D0%BA%D0%BE%D0%B2%D0%B0_%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0_%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%BD%D0%B0_fimjxs.jpg',
    },
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692679/about%28team%29/%D0%A1%D0%BA%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0_%D0%93%D0%B0%D0%BB%D0%B8%D0%BD%D0%B0_%D0%A8%D0%B0%D1%80%D0%B0%D0%BB%D0%B5%D0%B5%D0%B2%D0%BD%D0%B0_2_bp4lcx.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692679/about%28team%29/%D0%A1%D0%BA%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0_%D0%93%D0%B0%D0%BB%D0%B8%D0%BD%D0%B0_%D0%A8%D0%B0%D1%80%D0%B0%D0%BB%D0%B5%D0%B5%D0%B2%D0%BD%D0%B0_2_bp4lcx.jpg',
    },
  ];

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
    <>
      {/* <ModalWindow open={open} /> */}
      <Container fullwidth justifyContent={'space-between'}>
        <Offer
          template={'homepage'}
          title={
            <>
              <b>Красивая улыбка</b> наша профессия
            </>
          }
          subtitle={
            <>
              Запишись на бесплатную консультацию и получи{' '}
              <b>подробный план лечения зубов</b>.
            </>
          }
        />
      </Container>

      <Spacer size={4} />

      {/* <Wrapper>
        <Title size={2} template='pageTitle'>
          Новости
        </Title>
      </Wrapper>

      <Container fullwidth className={styles.news}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          autoplay={true}
        >
          <SwiperSlide className={styles.newsItem}>
            <div className={styles.newsItemContent}>
              <div className={styles.newsContentText}>
                <Title size={3} template='newsTitle'>
                  Эффективные методы лечения
                </Title>
                <h4 className={styles.newsItemDescr}>
                  Починка съемного протеза производится
                  <br />в день обращения
                </h4>
              </div>
              <ButtonDent onClick={modalHandler} color={'dark'}>
                Записаться
              </ButtonDent>
            </div>
            <div className={styles.newsItemPreview}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670598378/Rectangle_871_1_jfkrui.jpg'
                alt='Изображение новости'
                quality={80}
                priority={false}
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.newsItem}>
            <div className={styles.newsItemContent}>
              <div className={styles.newsContentText}>
                <Title size={3} template='newsTitle'>
                  Весь месяц
                </Title>
                <h4 className={styles.newsItemDescr}>
                  Компьютерная томография верхней и<br />
                  нижней челюсти ВСЕГО 250 рублей
                </h4>
                <p className={styles.newsItemDescrSub}>Без записи DVD диска</p>
              </div>
              <ButtonDent onClick={modalHandler} color={'dark'}>
                Записаться
              </ButtonDent>
            </div>
            <div className={styles.newsItemPreview}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670599717/news/Rectangle_784_glhzsw.jpg'
                alt='Изображение новости'
                quality={80}
                priority={false}
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.newsItem}>
            <div className={styles.newsItemContent}>
              <div className={styles.newsContentText}>
                <Title size={3} template='newsTitle'>
                  Интраоральный сканер 3D MEDIT I500
                </Title>
                <h4 className={styles.newsItemDescr}>
                  Качественный осмотр и лечение зубов
                </h4>
              </div>
              <ButtonDent onClick={modalHandler} color={'dark'}>
                Записаться
              </ButtonDent>
            </div>
            <div className={styles.newsItemPreview}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670599927/news/Rectangle_784_1_whnov4.jpg'
                alt='Изображение новости'
                quality={80}
                priority={false}
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.newsItem}>
            <div className={styles.newsItemContent}>
              <div className={styles.newsContentText}>
                <Title size={3} template='newsTitle'>
                  Врачи высшей категории
                </Title>
                <h4 className={styles.newsItemDescr}>
                  Качественный осмотр и лечение зубов
                </h4>
              </div>
              <ButtonDent onClick={modalHandler} color={'dark'}>
                Записаться
              </ButtonDent>
            </div>
            <div className={styles.newsItemPreview}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670600071/news/Rectangle_784_2_mvib6k.jpg'
                alt='Изображение новости'
                quality={80}
                priority={false}
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.newsItem}>
            <div className={styles.newsItemContent}>
              <div className={styles.newsContentText}>
                <Title size={3} template='newsTitle'>
                  ALL-ON-4
                </Title>
                <h4 className={styles.newsItemDescr}>
                  Протезирование зубов на 4 имплантах
                </h4>
              </div>
              <ButtonDent onClick={modalHandler} color={'dark'}>
                Записаться
              </ButtonDent>
            </div>
            <div className={styles.newsItemPreview}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670600152/news/Rectangle_784_3_c0c4ak.jpg'
                alt='Изображение новости'
                quality={80}
                priority={false}
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.newsItem}>
            <div className={styles.newsItemContent}>
              <div className={styles.newsContentText}>
                <Title size={3} template='newsTitle'>
                  Только современное стоматологическое оборудование
                </Title>
                <h4 className={styles.newsItemDescr}>
                  Протезирование зубов по демократичным ценам
                </h4>
              </div>
              <ButtonDent onClick={modalHandler} color={'dark'}>
                Записаться
              </ButtonDent>
            </div>
            <div className={styles.newsItemPreview}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670600219/news/Rectangle_784_4_xyzzjx.jpg'
                alt='Изображение новости'
                quality={80}
                priority={false}
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.newsItem}>
            <div className={styles.newsItemContent}>
              <div className={styles.newsContentText}>
                <Title size={3} template='newsTitle'>
                  Доступные стоматологиеские услуги
                </Title>
                <h4 className={styles.newsItemDescr}>
                  Профессиональная чистка зубов
                </h4>
              </div>
              <ButtonDent onClick={modalHandler} color={'dark'}>
                Записаться
              </ButtonDent>
            </div>
            <div className={styles.newsItemPreview}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670600261/news/Rectangle_784_5_pdghgp.jpg'
                alt='Изображение новости'
                quality={80}
                priority={false}
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>

      <Spacer size={4} /> */}

      <Container>
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
      </Container>

      <Spacer size={4} />

      <Container>
        <Wrapper>
          <div className={styles.about}>
            <div className={styles.aboutContent}>
              <Title size={2} template={'pageTitle'} className={styles.mt0}>
                О нашей <i>клинике</i>
              </Title>
              <p>
                <strong>Стоматология на Демонстрации</strong> — это клиника,
                которой можно доверить здоровье зубов всех членов семьи: от мала
                до велика. Мы находимся в самом центре города, до нас легко
                добраться как на машине, так и на общественном транспорте.
              </p>{' '}
              <p>Наши преимущества:</p>{' '}
              <ul>
                <li>
                  У нас можно лечиться всей семьей, не нужно искать разные
                  клиники.
                </li>{' '}
                <li>
                  Предоставляем широкий спектр услуг, мы собрали в одном месте
                  стоматологию, хирургию, ортопедию и ортодонтию.
                </li>{' '}
                <li>
                  Используем эффективные методы и международные протоколы
                  профилактики и лечения зубов.
                </li>
                <li>
                  Наши врачи работают только с сертифицированными препаратами от
                  официальных поставщиков.
                </li>{' '}
                <li>
                  Используем современную аппаратуру международного класса.
                </li>
              </ul>{' '}
              <h3>
                Практикуем индивидуальный подход и заботимся о каждом пациенте
              </h3>{' '}
              <p>
                Наш коллектив делает все, чтобы посещение клиники было для вас
                комфортно, а после — остались хорошее впечатление и настроение.
              </p>{' '}
              <ul>
                <li>
                  Мы ценим каждого пациента, поэтому стараемся найти максимально
                  удобное время для записи.
                </li>
                <li>
                  В клинике вас встретит администратор. К нему можно обратиться
                  с любым вопросом.
                </li>
                <li>Для ожидания приема предусмотрены уютные зоны.</li>
                <li>
                  Если вам требуется поэтапное лечение, стоматолог составит
                  индивидуальный, подходящий для вас график посещений.
                </li>
                <li>
                  Чтобы посещение стоматологии было доступным, мы регулярно
                  запускаем акционные предложения. Кроме этого, при выборе
                  материалов, специалист может предложить вам на выбор несколько
                  альтернатив, и вы выберете те, которые подойдут под ваш
                  бюджет.
                </li>
              </ul>
              <h3>Опытные врачи для взрослых и детей</h3>
              <p>
                В нашей клинике работают опытные стоматологи, хирурги,
                имплантологи и ортопеды. В своей практике они придерживаются
                правила: лучшее лечение — профилактика. Наши специалисты берутся
                даже за сложные случаи, например, удаление кист. Врачи помогут
                сохранить здоровье ваших природных зубов, вернуть и сформировать
                красивую ровную улыбку. Если по каким-то причинам вы потеряли
                некоторые зубы, врачи изготовят и установят вам качественные
                импланты. Они вернут прежний гармоничный вид и помогут выровнять
                прикус.
              </p>
              <p>
                Также в нашей клинике ведет прием детский стоматолог — врач с
                тёплым и бережным отношением к деткам, который лечит зубы
                ребенка «без слез и истерик».
              </p>{' '}
              <h3>Современные материалы и оборудование</h3>
              <p>
                Мы считаем, что успех лечения зубов на 70% зависит от
                квалификации стоматолога и на 30% от технического оснащения.
                Клиника на Демонстрации работает с проверенными поставщиками
                стоматологических материалов. Наши врачи отбирают продукты,
                которые хорошо зарекомендовали себя на практике. Все, от паст
                для отбеливания до специализированных стоматологических
                цементирующих средств и сплавов имеет высокие оценки у
                стоматологов по всему миру и их пациентов.
              </p>{' '}
              <p>
                Проводить гигиену, лечить, восстанавливать и удалять зубы
                качественно и безболезненно нам помогает высокотехнологичное
                оборудование. В клинике есть:
              </p>
              <ul>
                <li>
                  Современный внутриротовой (интраоральный) сканер 3D MEDIT I500
                  для лечения зубов.
                </li>
                <li>Отбеливающая система beyond.</li>
                <li>
                  Ультразвуковой аппарат Пьезотом (Piezotome) — используем его
                  для проведения хирургических операций, например, удаления
                  зубов без боли.
                </li>
              </ul>
            </div>
            <div className={styles.aboutSliders}>
              <Swiper
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={0}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.aboutMainSlider}
              >
                <Fancybox>
                  {aboutPictures.map((slideImg, key) => (
                    <SwiperSlide key={key}>
                      <button
                        className={styles.fancyboxBtn}
                        data-fancybox='gallery'
                        data-src={slideImg.full}
                      >
                        <Image
                          src={slideImg.sharpen}
                          alt={'Фотография специалиста'}
                          width={1000}
                          height={1000}
                          quality={90}
                        />
                      </button>
                    </SwiperSlide>
                  ))}
                </Fancybox>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={20}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.aboutThumbSlider}
              >
                {aboutPictures.map((thumbImg, key) => (
                  <SwiperSlide key={key} className={styles.thumbWrapper}>
                    <Image
                      src={thumbImg.sharpen}
                      alt={'Превью фото'}
                      width={200}
                      height={80}
                      quality={80}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </Wrapper>
      </Container>

      <Spacer size={4} />

      <Container>
        <Wrapper>
          <Title size={2} mt0 template={'pageTitle'}>
            Наша <i>команда</i>
          </Title>
          <Doctors />
        </Wrapper>
      </Container>

      <Spacer size={4} />

      <Container fullwidth className={styles.benefits}>
        <div className={styles.benefitsTitleWrapper}>
          <Title className={styles.benefitsTitle} size={2}>
            Наши <i>преимущества</i>
          </Title>
        </div>
        <div className={styles.benefitsList}>
          <div className={styles.benefit}>
            <div className={styles.benefitTitle}>
              <Image
                src={'/images/benefits/consultation.png'}
                quality={90}
                alt={'Бесплатная консультация'}
                width={50}
                height={50}
              />
              <p className={styles.benefitName}>Бесплатная консультация</p>
            </div>
            <p className={styles.benefitContent}>
              Важным этапом оказания грамотной стоматологической помощи является
              осмотр врача-стоматолога. После консультации специалист сможет
              составить точный план лечения и ответить на все интересующие
              пациента вопросы. Таким образом, пациент может быть уверенным в
              том, что стоит ожидать и какой будет результат.
            </p>
          </div>

          <div className={styles.benefit}>
            <div className={styles.benefitTitle}>
              <Image
                src={'/images/benefits/garantee.png'}
                quality={90}
                alt={'Гарантия качества'}
                width={50}
                height={50}
              />
              <p className={styles.benefitName}>Гарантия качества</p>
            </div>
            <p className={styles.benefitContent}>
              Мы даем гарантию на нашу работу любого уровня сложности. Наша
              клиника полностью несет ответственность за качество
              предоставляемых услуг, и соответственно уделяет особое внимание
              заботе о пациентах даже после проведенного вмешательства.
            </p>
          </div>

          <div className={styles.benefit}>
            <div className={styles.benefitTitle}>
              <Image
                src={'/images/benefits/staff.png'}
                quality={90}
                alt={'Экспертность врачей'}
                width={50}
                height={50}
              />
              <p className={styles.benefitName}>Экспертность врачей</p>
            </div>
            <p className={styles.benefitContent}>
              Наша клиника - это, в первую очередь, наши врачи. Специалисты
              стоматологии не только являются лучшими в своей области, но также
              постоянно развиваются. Наши врачи обучаются у лучших специалистов
              со всего мира и осваивают множество новых методик и протоколов в
              стоматологии, чтобы предоставить Вам качественное лечение.
            </p>
          </div>

          <div className={styles.benefit}>
            <div className={styles.benefitTitle}>
              <Image
                src={'/images/benefits/price.png'}
                quality={90}
                alt={'Семейный подход'}
                width={50}
                height={50}
              />
              <p className={styles.benefitName}>Семейный подход</p>
            </div>
            <p className={styles.benefitContent}>
              Стоматология на Демонстрации предоставляет весь спектр услуг для
              всей семьи. Вам больше не нужно искать разных врачей для своих
              детей или родителей, все необходимые процедуры можно сделать в
              одном месте. Благодаря, получению четкого протокола по каждому
              возрасту плавно перетекающего на взрослого, мы можем четко и
              грамотно спланировать лечение.
            </p>
          </div>
        </div>
      </Container>

      <Spacer size={4} />

      <Wrapper>
        <Promo homepage />
      </Wrapper>

      <Spacer size={4} />

      <Consultation page='home' />

      <Spacer size={4} />

      <Wrapper>
        <Title size={2} template={'pageTitle'}>
          Контактная <i>информация</i>
        </Title>
      </Wrapper>
      <MapComponent template='homepage' />
    </>
  );
};

export default Index;
