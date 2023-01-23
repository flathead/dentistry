import { useCategoryPages } from '@/lib/category';
import { useServicePages } from '@/lib/service';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import styles from './ServiceCatalog.module.scss';

const ServiceCatalog = () => {
  const categoriesData = useCategoryPages().data;
  const servicesData = useServicePages().data;
  const categories = categoriesData
    ? categoriesData.reduce((acc, val) => [...acc, ...val.categories], [])
    : [];
  const services = servicesData
    ? servicesData.reduce((acc, val) => [...acc, ...val.services], [])
    : [];

  const [location, setLocation] = useState();
  useEffect(() => {
    setLocation(window.location.pathname);
  }, [location]);

  const [open, setOpen] = useState(false);

  const [cat, setCat] = useState('');

  const subHandler = (index) => {
    setCat(index);
    setOpen(open === false ? true : false);
  };

  const [button, setButton] = useState(false);
  const buttonHandler = () => {
    setButton(button === false ? true : false);
  };
  return (
    <>
      <Button
        className={styles.mobileBtn}
        onPress={buttonHandler}
        size={'lg'}
        flat
        color={button ? 'error' : 'primary'}
      >
        {button ? 'Скрыть' : 'Показать'} список услуг
      </Button>
      <nav className={clsx(styles.menu, !button && styles.hidden)}>
        <ul className={styles.categories}>
          {categories.map((category, index) => (
            <li
              key={category._id}
              className={clsx(
                styles.category,
                open === true && cat === index ? styles.open : null,
                category._id === '63cc3a9833d8de5360907776' && styles.hidden
              )}
              onClick={() => subHandler(index)}
            >
              <span className={styles.name}>
                <Link
                  className={
                    String(location).includes(category.slug) &&
                    styles.activeCategory
                  }
                  title={
                    String(location).includes(category.slug)
                      ? 'Вы находитесь в данной категории'
                      : null
                  }
                  href={`/uslugi/${category.slug}`}
                >
                  {category.title}
                </Link>{' '}
                {open === true && cat === index ? <ArrowUp /> : <ArrowDown />}
              </span>
              <ul className={styles.categorySubmenu}>
                {services.map((service) => (
                  <li
                    className={clsx(
                      styles.submenuItem,
                      service.categoryId !== category._id && styles.hidden,
                      String(location).includes(service.slug) &&
                        styles.activeService
                    )}
                    key={service._id}
                  >
                    <Link
                      title={
                        String(location).includes(service.slug)
                          ? 'Вы просматриваете эту услугу'
                          : null
                      }
                      href={`/uslugi/${service.categorySlug}/${service.slug}`}
                    >
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
              className={clsx(
                styles.item,
                service.categoryId !== '63cc3a9833d8de5360907776' &&
                  styles.hidden
              )}
              key={service._id}
            >
              <Link
                className={styles.itemLink}
                href={`/uslugi/${service.categorySlug}/${service.slug}`}
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ServiceCatalog;
