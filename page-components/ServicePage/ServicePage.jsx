import { Doctors } from '@/components/Doctors';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { MapComponent } from '@/components/Map';
import { ModalWindow } from '@/components/ModalWindow';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { Title } from '@/components/Title';
import { useServicePages } from '@/lib/service';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import * as Icon from 'react-feather';
import HtmlParser from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';
import ReviewList from '../Reviews/ReviewList';
import styles from './ServicePage.module.scss';

const ServicePage = () => {
  const { data } = useServicePages();
  const services = data
    ? data.reduce((acc, val) => [...acc, ...val.services], [])
    : [];

  let first = {};

  try {
    services[0];
    first.name = services[0].name;
    if (
      services[0].preview &&
      services[0].preview !==
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg'
    ) {
      first.preview = (
        <Image
          className={styles.preview}
          src={services[0].preview}
          alt={services[0].name}
          width={1200}
          height={300}
        />
      );
    }

    first.description = services[0].description;
    first.price = services[0].price;
  } catch (e) {
    first.name = <LoadingDots />;
    first.preview = <Skeleton height={300} />;
    first.description = <LoadingDots />;
    first.price = <LoadingDots />;
  }

  const [open, setOpen] = useState();
  const callmeHandle = (e) => {
    e.preventDefault();
    setOpen(true);
    setOpen([]);
  };

  let preview;
  try {
    preview = services[0].preview;
  } catch (error) {
    preview = '';
  }

  return (
    <>
      <ModalWindow open={open} />
      <Container className={styles.layout}>
        <ServiceCatalog />
        <div className={styles.content}>
          <Title size={1} className={styles.serviceTitle} center>
            {first.name}
          </Title>
          {preview !==
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg' ? (
            <div className={styles.offer}>{first.preview}</div>
          ) : null}
          <div className={styles.anchors}>
            {first.description && first.description.length > 6 ? (
              <a href='#description'>Услуга</a>
            ) : null}
            {first.price && first.price.length > 6 ? (
              <a href='#price'>Цена</a>
            ) : null}
            <a href='#doctors'>Врачи</a>
            <a href='#reviews'>Отзывы</a>
            <a href onClick={callmeHandle}>
              Записаться на приём
            </a>
          </div>
          {first.description && first.description.length > 6 ? (
            <div id='description' className={styles.description}>
              {HtmlParser(first.description)}
            </div>
          ) : null}
          <Spacer size={2} />
          {first && first.length > 6 ? (
            <>
              <div id='price' className={styles.price}>
                <p className={styles.subTitle}>Цена</p>
                {HtmlParser(first.price)}
                <p className={styles.warning}>
                  *Окончательная цена лечения определяется после консультации с
                  лечащим врачом.
                </p>
              </div>
              <Spacer size={2} />
            </>
          ) : null}
          <div className={styles.advantages}>
            <p className={styles.subTitle}>Преимущества нашей стоматологии</p>
            <div className={styles.advantageList}>
              <div className={styles.advantage}>
                <div className={styles.imageBox}>
                  <Image
                    src='/images/service/1.png'
                    alt=''
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.textBox}>
                  <p>
                    Демократичные цены позволяют нам обслуживать довольно
                    большой поток пациентов.
                  </p>
                </div>
              </div>
              <div className={styles.advantage}>
                <div className={styles.imageBox}>
                  <Image
                    src='/images/service/2.png'
                    alt=''
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.textBox}>
                  <p>
                    Безопасные технологии последнего поколения – наличие в
                    клинике инновационного европейского оборудования.
                  </p>
                </div>
              </div>
              <div className={styles.advantage}>
                <div className={styles.imageBox}>
                  <Image
                    src='/images/service/3.png'
                    alt=''
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.textBox}>
                  <p>
                    Качество наших услуг всегда на высоте! Регулируя соотношение
                    цены и качества, мы стараемся сделать клинику лучшей !
                  </p>
                </div>
              </div>
              <div className={styles.advantage}>
                <div className={styles.imageBox}>
                  <Image
                    src='/images/service/4.png'
                    alt=''
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.textBox}>
                  <p>
                    Атмосфера в клинике доброжелательная и гостеприимная. Мы
                    стараемся создать максимально комфортную обстановку.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Spacer size={2} />
          <div id='doctors'>
            <p className={styles.subTitle}>Наши врачи</p>
            <Doctors two />
          </div>
          <Spacer size={4} />
          <div id='reviews'>
            <Title size={2} template='pageTitle' center>
              Отзывы
            </Title>
            <ReviewList template={'slider'} count={1} />
          </div>
        </div>
      </Container>
      <Wrapper>
        <div>
          <Title size={2} template='pageTitle'>
            Деятельность клиники подтверждена официальной лицензией
          </Title>
          <Link
            href={'/files/ОГРН.pdf'}
            download
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1ch',
              fontWeight: 700,
            }}
          >
            <Icon.Link size={16} /> ОГРН (скачать PDF)
          </Link>
          <Link
            href={'/files/сайт.docx'}
            download
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1ch',
              fontWeight: 700,
            }}
          >
            <Icon.Link size={16} /> Сайт (скачать DOCX)
          </Link>
          <Spacer size={4} />
        </div>
        <Spacer size={4} />
        <Title size={2} template='pageTitle'>
          <b>Контактная</b> информация
        </Title>
      </Wrapper>
      <MapComponent template={'homepage'} />
    </>
  );
};

export default ServicePage;
