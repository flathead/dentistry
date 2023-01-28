import styles from './Doctors.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useSpecPages } from '@/lib/post';
import Link from 'next/link';
import { ButtonDent } from '../Button/Button';
import { useState } from 'react';
import { ModalWindow } from '../ModalWindow';
import { Container } from '../Layout';

const Doctors = ({ servicepage }) => {
  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    setOpen(true);
    setOpen([]);
  };
  const count = {
    min: 1,
    mobile: servicepage ? 1 : 2,
    tablet: servicepage ? 1 : 3,
    full: servicepage ? 2 : 4,
    max: servicepage ? 3 : 4,
  };
  const { data } = useSpecPages();
  const specialists = data
    ? data.reduce((acc, val) => [...acc, ...val.specialists], [])
    : [];

  return (
    <>
      <Container className={styles.wrapper}>
        <ModalWindow open={open} />
        <Swiper
          modules={Pagination}
          spaceBetween={10}
          pagination={true}
          className={styles.docSlider}
          breakpoints={{
            0: {
              // width: 0,
              slidesPerView: count.min,
            },
            480: {
              // width: 400,
              slidesPerView: count.mobile,
            },
            768: {
              slidesPerView: count.tablet,
            },
            1080: {
              slidesPerView: count.full,
            },
            1400: {
              slidesPerView: count.max,
            },
          }}
        >
          {specialists.map((specialist) => (
            <SwiperSlide key={specialist._id}>
              <div className={styles.card}>
                <div>
                  <Link
                    href='/vrachi/[specialistSlug]'
                    as={`/vrachi/${specialist.slug}`}
                  >
                    <div className={styles.preview}>
                      <Image
                        src={specialist.photo}
                        alt={'Фотография специалиста'}
                        height={400}
                        width={400}
                        quality={90}
                      />
                      <p className={styles.experience}>
                        Стаж: {specialist.experience}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href='/vrachi/[specialistSlug]'
                    as={`/vrachi/${specialist.slug}`}
                  >
                    <p className={styles.doctorName}>{specialist.name}</p>
                  </Link>
                  <p className={styles.doctorSpec}>{specialist.speciality}</p>
                </div>
                <div className={styles.docSliderButtons}>
                  <Link
                    className={styles.aboutSpec}
                    href='/vrachi/[specialistSlug]'
                    as={`/vrachi/${specialist.slug}`}
                  >
                    Подробнее
                  </Link>

                  <ButtonDent onClick={modalHandler} color='dark'>
                    Записаться
                  </ButtonDent>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

export default Doctors;
