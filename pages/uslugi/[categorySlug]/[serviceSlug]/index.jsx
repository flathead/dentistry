import { findServiceBySlug } from '@/api-lib/db/service';
import { getMongoDb } from '@/api-lib/mongodb';
import { Doctors } from '@/components/Doctors';
import { Spacer, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { MapComponent } from '@/components/Map';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { Title } from '@/components/Title';
import ReviewList from '@/page-components/Reviews/ReviewList';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import HtmlParser from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';
import styles from '../Service.module.scss';

export default function Service({ service }) {
  let serv = {};
  try {
    service;
    serv.title = service.name;
    serv.short = service.short;
    serv.preview = (
      <Image
        className={styles.preview}
        src={service.preview}
        alt={service.title}
        width={1200}
        height={300}
      />
    );
    serv.description = service.description;
    serv.price = service.price;
  } catch (e) {
    serv.name = <LoadingDots />;
    serv.preview = <Skeleton height={300} />;
    serv.short = <LoadingDots />;
    serv.description = <LoadingDots />;
    serv.price = <LoadingDots />;
  }

  const [button, setButton] = useState(false);

  const buttonHandler = () => {
    setButton(button === false ? true : false);
  };

  return (
    <>
      <div className={styles.layout}>
        <Button
          className={styles.mobileBtn}
          onPress={buttonHandler}
          size={'lg'}
          flat
          color={button ? 'error' : 'primary'}
        >
          {button ? 'Скрыть' : 'Показать'} список услуг
        </Button>
        <ServiceCatalog />
        <div className={styles.content}>
          <Title size={1} className={styles.serviceTitle} center>
            {serv.title}
          </Title>
          {service.preview &&
          service.preview !==
            'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg' ? (
            <div className={styles.offer}>{serv.preview}</div>
          ) : null}
          <div className={styles.anchors}>
            {service.description && service.description.length > 6 ? (
              <a href='#description'>Услуга</a>
            ) : null}
            {service.price && service.price.length > 6 ? (
              <a href='#price'>Цена</a>
            ) : null}
            <a href='#doctors'>Врачи</a>
            <a href='#reviews'>Отзывы</a>
            <a href='#callme'>Записаться на приём</a>
          </div>
          {service.description && String(service.description).length >= 6 ? (
            <div id='description' className={styles.description}>
              {HtmlParser(serv.description)}
            </div>
          ) : null}
          <Spacer size={2} />
          {service.price && service.price.length > 6 ? (
            <>
              <div id='price' className={styles.price}>
                <p className={styles.subTitle}>Цена</p>
                {HtmlParser(serv.price)}
                <p className={styles.warning}>
                  *Окончательная цена лечения определяется после консультации с
                  лечащим врачом.
                </p>
              </div>
              <Spacer size={2} />
            </>
          ) : null}
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
      </div>
      <Wrapper>
        {/* <div>
            <Title size={2} template='pageTitle'>
              Деятельность клиники подтверждена официальной лицензией
            </Title>
			<Spacer size={4} />
          </div> */}
        <Spacer size={4} />
        <Title size={2} template='pageTitle'>
          <b>Контактная</b> информация
        </Title>
      </Wrapper>
      <MapComponent template={'homepage'} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const service = await findServiceBySlug(db, context.params.serviceSlug);
  if (!service) {
    return {
      notFound: true,
    };
  }

  service._id = String(service._id);
  service.slug = String(service.slug);
  service.name = String(service.name);
  service.description = String(service.description);
  service.preview = String(service.preview);
  service.price = String(service.price);
  service.creatorId = String(service.creatorId);
  service.creator._id = String(service.creator._id);
  service.categoryId = String(service.categoryId);
  service.createdAt = service.createdAt.toJSON();
  return { props: { service } };
}
