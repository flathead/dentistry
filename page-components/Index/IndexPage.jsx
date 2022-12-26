import styles from './IndexPage.module.scss';
import { Container, Spacer, Wrapper } from '@/components/Layout';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import Image from 'next/image';
import Offer from '../../components/Offer/Offer';
import { Title } from '@/components/Title';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { ButtonDent } from '@/components/Button/Button';
import { Advantages } from '@/components/Advantages';
import { Fancybox } from '@/components/Fancybox';
import { Doctors } from '@/components/Doctors';
import MapComponent from '@/components/Map/Map';
import { Consultation } from '@/components/Consultation';
import { ModalWindow } from '@/components/ModalWindow';

const Index = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    setOpen(true);
    setOpen([]);
  };

  const aboutPictures = [
    {
      full: 'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670692655/about%28team%29/IMG_2995_kiripv.jpg',
      sharpen:
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1670692655/about%28team%29/IMG_2995_kiripv.jpg',
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

  return (
    <>
      <ModalWindow open={open} />
      <Container fullwidth offer justifyContent={'space-between'}>
        <Offer
          template={'homepage'}
          title={
            <>
              <b>Лечим зубы</b> без боли и с гарантией на <i>результат</i>
            </>
          }
          subtitle={
            <>
              Запишись на бесплатную консультацию и получи подробный{' '}
              <strong>план лечения зубов.</strong>
            </>
          }
        />
      </Container>

      <Spacer size={4} />

      <Wrapper>
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

      <Spacer size={4} />

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
            adv1_title={'Лечение зубов'}
            adv1_descr={'Описание отсутствует'}
            adv2_title={'Удаление зубов'}
            adv2_descr={
              'Удаление зуба — хирургическая операция в стоматологии по экстракции зуба из зубной альвеолы'
            }
            adv3_title={'Имплантация зубов'}
            adv3_descr={'Описание отсутствует'}
            adv4_title={'Эстетическая реставрация'}
            adv4_descr={'Описание отсутствует'}
            adv5_title={'Профессиональная гигиена'}
            adv5_descr={'Описание отсутствует'}
            adv6_title={'Ортодонтия'}
            adv6_descr={'Описание отсутствует'}
            adv7_title={'КТ (Компьютерная томография) зубов'}
            adv7_descr={'Описание отсутствует'}
            adv8_title={'Изготовление и ремонт зубных протезов'}
            adv8_descr={'Описание отсутствует'}
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
                Стоматология на <b>Демонстрации</b> — это сеть клиник в г. Тула.
                Здесь вы можете получить любую стоматологическую помощь
                экспертного класса без наценок.
              </p>
              <p>
                Наша миссия – сделать современную стоматологию доступной для
                всех.
              </p>
              <p>
                Наша стоматологическая клиника рада предложить своим пациентам
                не только безопасную и качественную анестезию, но и гибкую
                ценовую политику. А грамотный индивидуальный подход позволяет
                персоналу клиники предоставлять услуги своевременно и
                профессионально.
              </p>
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
              Консультация - первый и очень важный этап получения мед. помощи в
              стоматологиии. Она проводится стоматологом -терапевтом, с
              привлечением в случае неообходимости- глав. врача.
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
              Огромное значение длявысокого качества лечения имеет современное
              оборудование, которое почти в нашей стоматологиии закупают у
              ведущих европейских производителей.
            </p>
          </div>

          <div className={styles.benefit}>
            <div className={styles.benefitTitle}>
              <Image
                src={'/images/benefits/staff.png'}
                quality={90}
                alt={'Квалифицированный персонал'}
                width={50}
                height={50}
              />
              <p className={styles.benefitName}>Квалифицированный персонал</p>
            </div>
            <p className={styles.benefitContent}>
              Вся наша команда подобрана главным врачом и управляющим клиники.
              Получать одинаково превосходный результат работы нам позволяют
              контроль главного врача.
            </p>
          </div>

          <div className={styles.benefit}>
            <div className={styles.benefitTitle}>
              <Image
                src={'/images/benefits/price.png'}
                quality={90}
                alt={'Низкие цены'}
                width={50}
                height={50}
              />
              <p className={styles.benefitName}>Низкие цены</p>
            </div>
            <p className={styles.benefitContent}>
              Важно ориентироваться на возможности большинства клиентов, поэтому
              наша стоматология может позволить делать скидки нашим клиентам.
            </p>
          </div>
        </div>
      </Container>

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
