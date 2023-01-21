import { findCategoryBySlug } from '@/api-lib/db/any';
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
import styles from '../../../page-components/ServicePage/ServicePage.module.scss';

export default function Service({ category }) {
  let categ = {};
  try {
    category;
    categ.title = category.title;
    categ.short = category.short;
    categ.preview = (
      <Image
        className={styles.preview}
        src={category.preview}
        alt={category.title}
        width={1200}
        height={300}
      />
    );
    categ.description = category.description;
    categ.price = category.price;
  } catch (e) {
    categ.name = <LoadingDots />;
    categ.preview = <Skeleton height={300} />;
    categ.short = <LoadingDots />;
    categ.description = <LoadingDots />;
    categ.price = <LoadingDots />;
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
            {categ.title}
          </Title>
          <div className={styles.offer}>{categ.preview}</div>
          <div className={styles.anchors}>
            <a href='#description'>Услуга</a>
            <a href='#price'>Цена</a>
            <a href='#doctors'>Врачи</a>
            <a href='#reviews'>Отзывы</a>
            <a href='#callme'>Записаться на приём</a>
          </div>
          <div id='description' className={styles.description}>
            {HtmlParser(categ.description)}
          </div>
          <Spacer size={2} />
          <div id='price' className={styles.price}>
            <p className={styles.subTitle}>Цена</p>
            {HtmlParser(categ.price)}
            <p className={styles.warning}>
              *Окончательная цена лечения определяется после консультации с
              лечащим врачом.
            </p>
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

  const category = await findCategoryBySlug(db, context.params.categorySlug);
  if (!category) {
    return {
      notFound: true,
    };
  }

  category._id = String(category._id);
  category.slug = String(category.slug);
  category.title = String(category.title);
  category.short = String(category.short);
  category.description = String(category.description);
  category.preview = String(category.preview);
  category.price = String(category.price);
  category.creatorId = String(category.creatorId);
  category.creator._id = String(category.creator._id);
  category.createdAt = category.createdAt.toJSON();
  return { props: { category } };
}
