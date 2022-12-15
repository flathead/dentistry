import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import * as Icon from 'react-feather';
import { Container, Wrapper } from '.';
import { ButtonDent } from '../Button/Button';
import styles from './Footer.module.scss';
import { links } from './Nav';

const Footer = () => {
  const [isLoaded, setIsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setIsLoading(true), 6000);

  return (
    <footer>
      <div className={styles.footerWrapper}>
        <Wrapper>
          <Container className={styles.footerLayout}>
            <Link href={'/'}>
              {isLoaded ? (
                <Image src={'/logo.png'} alt='' height={50} width={200} />
              ) : (
                <Skeleton count={1} height={50} width={200} />
              )}
            </Link>
            <Container
              className={styles.footerNav}
              gap={'1rem'}
              alignItems={'center'}
            >
              {links.map((link, key) => (
                <Link key={key} className={styles.footerLink} href={link.url}>
                  {link.name}
                </Link>
              ))}
            </Container>
            <ButtonDent color={'blue'}>Записаться</ButtonDent>
          </Container>
        </Wrapper>
      </div>
      <div className={styles.footerContact}>
        <div className={styles.lawInfo}>
          <p>Лицензия ЛО-78-01-011139 от 01 октября 2020 года</p>
          <Link href={'#'} target={'/blank'}>
            Юридическая информация
          </Link>
        </div>
        <div className={styles.contacts}>
          <Container
            className={styles.phones}
            gap={'10px'}
            alignItems={'center'}
          >
            <Icon.MapPin color='#193942' size={20} />
            <Link
              className={styles.contactLink}
              href={'https://maps.yandex.ru'}
            >
              г.Тула ул Демонстрации, 38В
            </Link>
          </Container>
          <Container
            className={styles.phones}
            gap={'10px'}
            alignItems={'center'}
          >
            <Icon.Phone color='#193042' size={20} />
            <Link className={styles.contactLink} href={'tel:84872707117'}>
              +7 (4872) 70-71-17
            </Link>
            <Link className={styles.contactLink} href={'tel:89534230335'}>
              +7 (953) 423-03-35
            </Link>
          </Container>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
