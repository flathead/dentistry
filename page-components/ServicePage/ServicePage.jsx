import { Doctors } from '@/components/Doctors';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { MapComponent } from '@/components/Map';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { Title } from '@/components/Title';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import HtmlParser from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';
import ReviewList from '../Reviews/ReviewList';
import styles from './ServicePage.module.scss';

const ServicePage = ({ services }) => {
  let first = {};

  try {
    services[0];
    first.name = services[0].name;
    first.preview = (
      <Image
        className={styles.preview}
        src={services[0].preview}
        alt={services[0].name}
        width={1200}
        height={300}
      />
    );
    first.description = services[0].description;
    first.price = services[0].price;
  } catch (e) {
    first.name = <LoadingDots />;
    first.preview = <Skeleton height={300} />;
    first.description = <LoadingDots />;
    first.price = <LoadingDots />;
  }
  const [button, setButton] = useState(false);
  const buttonHandler = () => {
    setButton(button === false ? true : false);
  };

  return (
    <>
      <Container className={styles.layout}>
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
            {first.name}
          </Title>
          {first.preview &&
          first.preview !==
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
            <a href='#callme'>Записаться на приём</a>
          </div>
          {first.description && first.description.length > 6 ? (
            <div id='description' className={styles.description}>
              {HtmlParser(first.description)}
            </div>
          ) : null}
          <Spacer size={2} />
          {first.price && first.price.length > 6 ? (
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
};

export default ServicePage;
