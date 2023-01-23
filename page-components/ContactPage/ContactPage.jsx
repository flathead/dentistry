import { ButtonDent } from '@/components/Button/Button';
import { Container, Wrapper } from '@/components/Layout';
import { MapComponent } from '@/components/Map';
import { ModalWindow } from '@/components/ModalWindow';
import { Collapse, Grid, Text } from '@nextui-org/react';
import clsx from 'clsx';
import siteMetadata from 'data/siteMetadata';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Shield } from 'react-feather';
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
      <Wrapper>
        <Container className={styles.control} column>
          <h2 className={clsx(styles.title, styles.titleDark)}>
            <span>Адреса и телефоны</span>
            <br /> контроллирующих органов
          </h2>

          <Grid>
            <Collapse.Group shadow>
              <Collapse
                title='Федеральная служба по надзору в сфере защиты прав потребителей и благополучия человека'
                arrowIcon={<Shield />}
              >
                <Text>
                  Юр. адрес: г. Тула, ул. Мира 25
                  <br />
                  Почтовый адрес: г. Тула, ул. Оборонная 114, тел: 21-64-64
                </Text>
              </Collapse>
              <Collapse
                title='Управление Федеральной службы по надзору в сфере здравоохранения и социального развития по Тульской области'
                arrowIcon={<Shield />}
              >
                <Text>Адрес: г. Тула, ул. 9 Мая 1, тел: (4872) 25-15-36</Text>
              </Collapse>
              <Collapse
                title='Министерство Здравоохранения Тульской области'
                arrowIcon={<Shield />}
              >
                <Text>
                  Юр. адрес: г. Тула, Оборонная 114 Г, тел: (4872) 31-20-33
                </Text>
              </Collapse>
              <Collapse
                title='Областной комитет по защите прав потребителей'
                arrowIcon={<Shield />}
              >
                <Text>Адрес: г. Тула, ул. Свободы 38, тел: 36-50-50</Text>
              </Collapse>
              <Collapse
                title='Департамент здравоохранения Тульской области'
                arrowIcon={<Shield />}
              >
                <Text>
                  Отдел по лицензированию: г. Тула, Оборонная 114 Г, тел: (4872)
                  37-08-5
                </Text>
              </Collapse>
              <Collapse
                title='Прокуратура Тульской области'
                arrowIcon={<Shield />}
              >
                <Text>
                  Адрес: Тула, просп. Ленина, 55 тел.:{' '}
                  <a href='tel:+7 (4872) 36-43-07'>+7 (4872) 36-43-07</a>,{' '}
                  <a href='tel:+7 (4872) 36-06-99'>+7 (4872) 36-06-99</a>
                </Text>
              </Collapse>
            </Collapse.Group>
          </Grid>
        </Container>
      </Wrapper>
    </>
  );
};

export default ContactPage;
