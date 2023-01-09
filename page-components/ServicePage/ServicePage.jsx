import { Doctors } from '@/components/Doctors';
import { Spacer, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { MapComponent } from '@/components/Map';
import { Title } from '@/components/Title';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
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

  const categories = [
    {
      key: 0,
      name: 'Лечение зубов',
    },
    {
      key: 1,
      name: 'Удаление зубов',
    },
    {
      key: 2,
      name: 'Чистка зубов',
    },
  ];

  const [open, setOpen] = useState(false);
  const [button, setButton] = useState(false);
  const [cat, setCat] = useState('');

  const buttonHandler = () => {
    setButton(button === false ? true : false);
  };

  const subHandler = (index) => {
    setCat(index);
    setOpen(open === false ? true : false);
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
        <nav className={clsx(styles.menu, button === false && styles.hidden)}>
          <ul className={styles.categories}>
            {categories.map((category, index) => (
              <li
                key={category.key}
                className={clsx(
                  styles.category,
                  open === true && cat === index ? styles.open : null
                )}
                onClick={() => subHandler(index)}
              >
                <span className={styles.name}>
                  {category.name}{' '}
                  {open === true && cat === index ? <ArrowUp /> : <ArrowDown />}
                </span>
                <ul className={styles.categorySubmenu}>
                  {services.map((service) => (
                    <li
                      className={clsx(
                        styles.submenuItem,
                        service.category !== category.name && styles.hidden
                      )}
                      key={service._id}
                    >
                      <Link href={`/uslugi/${service.slug}`}>
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {services.map((service) => (
              <li
                key={service._id}
                className={clsx(
                  styles.item,
                  service.category !== 'Без категории' && styles.hidden
                )}
              >
                <Link
                  className={styles.itemLink}
                  href={`/uslugi/${service.slug}`}
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.content}>
          <Title size={1} className={styles.serviceTitle} center>
            {first.name}
          </Title>
          <div className={styles.offer}>{first.preview}</div>
          <div className={styles.anchors}>
            <a href='#description'>Услуга</a>
            <a href='#price'>Цена</a>
            <a href='#doctors'>Врачи</a>
            <a href='#reviews'>Отзывы</a>
            <a href='#callme'>Записаться на приём</a>
          </div>
          <div id='description' className={styles.description}>
            {HtmlParser(first.description)}
          </div>
          <Spacer size={2} />
          <div id='price' className={styles.price}>
            <p className={styles.subTitle}>Цена</p>
            {HtmlParser(first.price)}
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
};

export default ServicePage;
