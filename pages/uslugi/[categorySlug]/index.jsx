import { findCategoryBySlug } from '@/api-lib/db/any';
import { getMongoDb } from '@/api-lib/mongodb';
import { Doctors } from '@/components/Doctors';
import { HeadSEO, Spacer, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { MapComponent } from '@/components/Map';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { Title } from '@/components/Title';
import ReviewList from '@/page-components/Reviews/ReviewList';
import Image from 'next/image';
import Link from 'next/link';
import HtmlParser from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';
import styles from '../../../page-components/ServicePage/ServicePage.module.scss';
import * as Icon from 'react-feather';
import { ModalWindow } from '@/components/ModalWindow';

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

const [open, setOpen] = useState();
  const callmeHandle = (e) => {
    e.preventDefault();
    setOpen(true);
    setOpen([]);
  };

  return (
    <>
		<ModalWindow open={open} />

      <HeadSEO
        title={categ.title}
        ogImageUrl={category.preview ? category.preview : null}
        ogTwitterImage={category.preview ? category.preview : null}
        canonicalUrl={`https://dent-71.ru/uslugi/${category.slug}`}
      />
	  
      <div className={styles.layout}>
        <ServiceCatalog />
        <div className={styles.content}>
          <Title size={1} className={styles.serviceTitle} center>
            {categ.title}
          </Title>
          {categ.short && categ.short.length > 6 ? (
            <div className={styles.description}>{HtmlParser(categ.short)}</div>
          ) : null}
          {categ.preview &&
          categ.preview !==
            'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg' ? (
            <div className={styles.offer}>{categ.preview}</div>
          ) : null}
          <div className={styles.anchors}>
            {categ.description && categ.description.length > 6 ? (
              <a href='#description'>Услуга</a>
            ) : null}
            {categ.price && categ.price.length > 6 ? (
              <a href='#price'>Цена</a>
            ) : null}
            <a href='#doctors'>Врачи</a>
            <a href='#reviews'>Отзывы</a>
            <a href onClick={callmeHandle}>
              Записаться на приём
            </a>
          </div>
          {categ.description && categ.description.length > 6 ? (
            <div id='description' className={styles.description}>
              {HtmlParser(categ.description)}
            </div>
          ) : null}
          <Spacer size={2} />
          {categ.price && categ.price.length > 6 ? (
            <>
              <div id='price' className={styles.price}>
                <p className={styles.subTitle}>Цена</p>
                {HtmlParser(categ.price)}
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
