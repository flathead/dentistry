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

const Doctors = () => {
  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    setOpen(true);
    setOpen([]);
  };
  const { data } = useSpecPages();
  const specialists = data
    ? data.reduce((acc, val) => [...acc, ...val.specialists], [])
    : [];

  return (
    <div>
      <ModalWindow open={open} />
      <Swiper
        modules={Pagination}
        spaceBetween={10}
        pagination={true}
        className={styles.docSlider}
        breakpoints={{
          0: {
            // width: 0,
            slidesPerView: 1,
          },
          480: {
            // width: 400,
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1080: {
            slidesPerView: 4,
          },
        }}
      >
        {specialists.map((specialist) => (
          <SwiperSlide key={specialist._id}>
            <div className={styles.card}>
              <Link href={`/vrachi/${specialist._id}`}>
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
              <Link href={`/vrachi/${specialist._id}`}>
                <p className={styles.doctorName}>{specialist.name}</p>
              </Link>
              <p className={styles.doctorSpec}>{specialist.speciality}</p>
              <div className={styles.docSliderButtons}>
                <Link
                  className={styles.aboutSpec}
                  href={`/vrachi/${specialist._id}`}
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
    </div>
  );
};

export default Doctors;
