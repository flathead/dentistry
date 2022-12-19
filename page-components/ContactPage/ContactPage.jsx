import { ButtonDent } from '@/components/Button/Button';
import { Container, Wrapper } from '@/components/Layout';
import { MapComponent } from '@/components/Map';
import { ModalWindow } from '@/components/ModalWindow';
import siteMetadata from 'data/siteMetadata';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './ContactPage.module.scss';

const ContactPage = () => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);
  const modalHandler = () => {
    setOpen(true);
    setOpen([]);
  };
  return (
    <>
      <ModalWindow open={open} />
      <Container fullwidth column className={styles.contact}>
        <Wrapper>
          <h1 className={styles.title}>
            Контактная <i>информация</i>
          </h1>
        </Wrapper>
        <div className={styles.contactWrapper}>
          <div className={styles.map}>
            <MapComponent />
          </div>
          <div className={styles.information}>
            <Image
              src={siteMetadata.siteLogo}
              alt={'Логотип'}
              quality={100}
              width={200}
              height={50}
            />
            <p className={styles.phone}>
              <a href={`tel:${siteMetadata.phoneNumber}`}>
                {siteMetadata.phoneNumber}
              </a>
            </p>
            <p>300034, г. Тула, ул. Демонстрации 38В, пом. 19</p>
            <p>
              <span>Пн – Сб</span> 9.00-20.00, <span>Воскресенье</span> –
              выходной.
            </p>
            <ButtonDent
              className={styles.button}
              color={'blue'}
              onClick={modalHandler}
            >
              {width <= 360 ? 'Консультация' : 'Записаться на консультацию'}
            </ButtonDent>
            <p className={styles.smallText}>
              ОГРН: 121700009829, выдан Управлением Федеральной налоговой
              службой по Тульской области 24.08.2021 года
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactPage;
