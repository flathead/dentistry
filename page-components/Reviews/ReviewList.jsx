import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Review } from '@/components/Review';
import { Text } from '@/components/Text';
import { useReviewPages } from '@/lib/review';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Swiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from './ReviewList.module.scss';
import { Title } from '@/components/Title';
import { ButtonDent } from '@/components/Button/Button';
import { useState } from 'react';
import { ModalWindow } from '@/components/ModalWindow';
import { useRouter } from 'next/router';

const ReviewList = ({ template, title, count }) => {
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
  const { data, size, setSize, isLoadingMore, isReachingEnd } =
    useReviewPages();
  const reviews = data
    ? data.reduce((acc, val) => [...acc, ...val.reviews], [])
    : [];

  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    setOpen(true);
    setOpen([]);
  };

  const slides = {
    min: count === 1 ? 1 : 1,
    mobile: count === 1 ? 2 : 2,
    tablet: count === 1 ? 2 : 3,
    full: count === 1 ? 1 : 4,
  };

  const router = useRouter();

  return (
    <>
      {template === 'slider' ? (
        <Wrapper disabled={count ? true : false}>
          <Title size={2} template='pageTitle'>
            {title}
          </Title>
          <Swiper
            className={clsx(count && styles.mini, styles.slider)}
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
                slidesPerView: slides.min,
              },
              480: {
                slidesPerView: slides.mobile,
              },
              768: {
                slidesPerView: slides.tablet,
              },
              1080: {
                slidesPerView: slides.full,
              },
            }}
          >
            <div className={styles.sliderNavigation}>
              <SlideButton method='prev' />
              <SlideButton method='next' />
            </div>

            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div
                  className={clsx(
                    styles.wrap,
                    template === 'slider' && styles.slideWrap
                  )}
                >
                  <Review
                    className={styles.post}
                    review={review}
                    template={template}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Container center gap={'2rem'} className={styles.buttonContainer}>
            <ButtonDent color='blue' onClick={() => router.push('/otzyvy#add')}>
              Оставить отзыв
            </ButtonDent>
            <ButtonDent color='white' onClick={modalHandler}>
              Записаться
            </ButtonDent>
            <ModalWindow open={open} />
          </Container>
        </Wrapper>
      ) : (
        <div className={styles.root}>
          <Spacer axis='vertical' size={1} />
          <Wrapper>
            {reviews.map((review) => (
              <div key={review._id} className={styles.wrap}>
                <Review
                  className={styles.post}
                  review={review}
                  template={template}
                />
              </div>
            ))}
            <Container justifyContent='center'>
              {isReachingEnd ? (
                <Text color='secondary'>
                  Вы прочитали все отзывы. <a href='#add'>Напишите и свой!</a>{' '}
                  :)
                </Text>
              ) : (
                <Button
                  variant='ghost'
                  type='success'
                  loading={isLoadingMore}
                  onClick={() => setSize(size + 1)}
                >
                  Загрузить ещё
                </Button>
              )}
            </Container>
          </Wrapper>
        </div>
      )}
    </>
  );
};

export default ReviewList;
