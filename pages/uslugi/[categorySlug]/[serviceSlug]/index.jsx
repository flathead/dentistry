import { findServiceBySlug } from '@/api-lib/db/service';
import { getMongoDb } from '@/api-lib/mongodb';
import { Doctors } from '@/components/Doctors';
import { HeadSEO, Spacer, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { MapComponent } from '@/components/Map';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { Title } from '@/components/Title';
import ReviewList from '@/page-components/Reviews/ReviewList';
import Image from 'next/image';
import HtmlParser from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';
import * as Icon from 'react-feather';
import styles from '../Service.module.scss';
import Link from 'next/link';

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

  return (
    <>
      <HeadSEO
        title={service.title}
        ogImageUrl={service.preview ? service.preview : null}
        ogTwitterImage={service.preview ? service.preview : null}
        canonicalUrl={`https://dent-71.ru/uslugi/${service.categorySlug}/${service.slug}`}
      />
      <div className={styles.layout}>
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
      </div>
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
