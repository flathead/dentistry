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
const Doctors = () => {
  const { data } = useSpecPages();
  const specialists = data
    ? data.reduce((acc, val) => [...acc, ...val.specialists], [])
    : [];

  return (
    <div>
      <Swiper
        modules={Pagination}
        slidesPerView={4}
        spaceBetween={20}
        pagination={true}
        className={styles.docSlider}
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
                <ButtonDent color='dark'>Записаться</ButtonDent>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Doctors;
