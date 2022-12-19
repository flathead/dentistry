import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import * as Icon from 'react-feather';
import { Container, Wrapper } from '.';
import { ButtonDent } from '../Button/Button';
import styles from './Footer.module.scss';
import { links } from './Nav';
import { ModalWindow } from '../ModalWindow';
import { SocialButton } from '../SocialButton';

const Footer = () => {
  const [isLoaded, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    setOpen(true);
    setOpen([]);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setIsLoading(true), 6000);

  return (
    <>
      <ModalWindow open={open} />
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
              <ButtonDent onClick={modalHandler} color={'blue'}>
                Записаться
              </ButtonDent>
            </Container>
          </Wrapper>
        </div>
        <div className={styles.footerContact}>
          <div className={styles.lawInfo}>
            <p>Лицензия ЛО-78-01-011139 от 01 октября 2020 года</p>
            <p>
              <a href={'#'} target={'/blank'}>
                Юридическая информация
              </a>
            </p>
            <p>
              Разработано в{' '}
              <a
                href='https://lobanov-media.ru'
                target='_blank'
                rel='noreferrer'
              >
                Lobanov.Media
              </a>
            </p>
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
            <Container className={styles.socials}>
              <SocialButton
                social={'vk'}
                size={26}
                src={'https://vk.com/familystomtula'}
              />
              <SocialButton social={'telegram'} size={26} />
              <SocialButton social={'whatsapp'} size={26} />
            </Container>
          </div>
          <button
            className={styles.scrollToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={'Прокрутить страницу наверх'}
            title={'Наверх'}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
              <path d='M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z' />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
