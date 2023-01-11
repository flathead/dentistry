import { Spacer, Wrapper } from '@/components/Layout';
import { Title } from '@/components/Title';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import Image from 'next/image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from './PortfolioPage.module.scss';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Advantages } from '@/components/Advantages';
import { MapComponent } from '@/components/Map';
import ReviewList from '../Reviews/ReviewList';
import { usePortfolioPages } from '@/lib/portfolio';

// const results = [
//   {
//     id: 'result-01',
//     title: 'Имплантация all-on-6 и виниры на зубы',
//     before:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927920/portfolio/1before_rbs7gd.webp',
//     after:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927919/portfolio/1after_q1teg6.webp',
//   },
//   {
//     id: 'result-02',
//     title: 'Имплантация all-on-6 и виниры на зубы',
//     before:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672929001/portfolio/2before_dmie9o.webp',
//     after:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672929001/portfolio/2after_psyglx.webp',
//   },
//   {
//     id: 'result-03',
//     title: 'Имплантация all-on-6 и виниры на зубы',
//     before:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927920/portfolio/1before_rbs7gd.webp',
//     after:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927919/portfolio/1after_q1teg6.webp',
//   },
//   {
//     id: 'result-04',
//     title: 'Имплантация all-on-6 и виниры на зубы',
//     before:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672929001/portfolio/2before_dmie9o.webp',
//     after:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672929001/portfolio/2after_psyglx.webp',
//   },
//   {
//     id: 'result-05',
//     title: 'Имплантация all-on-6 и виниры на зубы',
//     before:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927920/portfolio/1before_rbs7gd.webp',
//     after:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927919/portfolio/1after_q1teg6.webp',
//   },
//   {
//     id: 'result-06',
//     title: 'Имплантация all-on-6 и виниры на зубы',
//     before:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672929001/portfolio/2before_dmie9o.webp',
//     after:
//       'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672929001/portfolio/2after_psyglx.webp',
//   },
// ];

const SlideButton = ({ method }) => {
  const slider = useSwiper();
  switch (method) {
    case 'next':
      return (
        <button
          className={clsx(styles.sliderBtn, styles.next)}
          onClick={() => slider.slideNext()}
          title='Далее'
        >
          <ArrowRight size={30} />
        </button>
      );
    case 'prev':
      return (
        <button
          className={clsx(styles.sliderBtn, styles.prev)}
          onClick={() => slider.slidePrev()}
          title='Назад'
        >
          <ArrowLeft size={30} />
        </button>
      );
  }
};

const PortfolioPage = () => {
  const { data } = usePortfolioPages();
  const works = data
    ? data.reduce((acc, val) => [...acc, ...val.works], [])
    : [];
  return (
    <>
      <Wrapper>
        <Title size={1} template='pageTitle' crop>
          Как преображаются <b>улыбки</b> наших пациентов
        </Title>
        {works && works.length >= 1 ? (
          <Swiper
            className={styles.slider}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            loop
            autoplay
            navigation={{ nextEl: '.next' }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
              },
              560: {
                slidesPerView: 3,
              },
              900: {
                slidesPerView: 4,
              },
            }}
          >
            <div className={styles.sliderNavigation}>
              <SlideButton method='prev' />
              <SlideButton method='next' />
            </div>

            {works.map((work) => (
              <SwiperSlide key={work.id} className={styles.slide}>
                <span className={styles.slideTitle}>{work.title}</span>
                <ImgComparisonSlider className={styles.compare} hover>
                  <div className={styles.slotBefore} slot='first'>
                    <Image
                      alt='До'
                      title='До'
                      width={400}
                      height={400}
                      src={work.before}
                    />
                  </div>
                  <div className={styles.slotAfter} slot='second'>
                    <Image
                      alt='После'
                      title='После'
                      width={400}
                      height={400}
                      src={work.after}
                    />
                  </div>
                </ImgComparisonSlider>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
        <p className={styles.portfolioDescription}>
          Об уровне специалистов нашей клиники самым наглядным образом говорят
          примеры наших работ. Наша клиника предоставляет большой спектр
          различных услуг, которые позволят блистать Вашей улыбке.
        </p>

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
      <Spacer size={4} />
      <Wrapper>
        <Title size={2} template='pageTitle'>
          <b>Контактная</b> информация
        </Title>
      </Wrapper>
      <MapComponent template='homepage' />
    </>
  );
};

export default PortfolioPage;
