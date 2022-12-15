/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import Link from 'next/link';
import { ButtonDent } from '../Button/Button';
import Container from './Container';
import styles from './Nav.module.scss';
import Wrapper from './Wrapper';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import * as Icon from 'react-feather';
import { useEffect, useState } from 'react';

/* const UserMenu = ({ user, mutate }) => {
  const menuRef = useRef();
  

  return (
    <div className={styles.user}>
      <button
        className={styles.trigger}
        ref={avatarRef}
        onClick={() => setVisible(!visible)}
      >
        <Avatar size={32} username={user.username} url={user.profilePicture} />
      </button>
      <div
        ref={menuRef}
        role='menu'
        aria-hidden={visible}
        className={styles.popover}
      >
        {visible && (
          <div className={styles.menu}>
            <Link
              className={styles.item}
              passHref
              href={`/user/${user.username}`}
            >
              Профиль
            </Link>
            <Link className={styles.item} passHref href='/settings'>
              Настройки
            </Link>
            <div className={styles.item} style={{ cursor: 'auto' }}>
              <Container alignItems='center'>
                <span>Theme</span>
                <Spacer size={0.5} axis='horizontal' />
                <ThemeSwitcher />
              </Container>
            </div>
            <button onClick={onSignOut} className={styles.item}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; */

export const links = [
  {
    url: '/',
    name: 'О клинике',
  },
  {
    url: '/ulsugi/',
    name: 'Услуги',
  },
  {
    url: '/vrachi/',
    name: 'Врачи',
  },
  {
    url: '/aktsii/',
    name: 'Акции',
  },
  {
    url: '/tekhnologii/',
    name: 'Технологии',
  },
  {
    url: '/nashi-raboty/',
    name: 'Наши работы',
  },
  {
    url: '/otzyvy/',
    name: 'Отзывы',
  },
  {
    url: '/kontakty/',
    name: 'Контакты',
  },
];

const Nav = ({ top }) => {
  const [isLoaded, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(true), 6000);
  return (
    <header
      className={styles.mainNavigation}
      style={{ height: top >= 20 ? 60 + 'px' : 100 + 'px' }}
    >
      <Wrapper className={styles.wrapper}>
        <Container
          className={styles.content}
          alignItems='center'
          justifyContent='space-between'
        >
          <Link href='/' className={styles.logo}>
            {isLoaded ? (
              <Image
                src='/logo.svg'
                width={top >= 20 ? 160 : 200}
                height={top >= 20 ? 40 : 50}
                alt={'Логотип'}
              />
            ) : (
              <Skeleton height={50} width={200} />
            )}
          </Link>

          <Container
            column
            alignItems={'center'}
            justifyContent={'center'}
            gap={top >= 20 ? 0 : '1rem'}
            styles={{ transition: 'all .3s' }}
          >
            {isLoaded ? (
              <>
                <Container
                  hide={top >= 20 ? true : false}
                  row
                  alignItems={'center'}
                  gap={'2rem'}
                >
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
                    <Link
                      className={styles.contactLink}
                      href={'tel:84872707117'}
                    >
                      +7 (4872) 70-71-17
                    </Link>
                    <Link
                      className={styles.contactLink}
                      href={'tel:89534230335'}
                    >
                      +7 (953) 423-03-35
                    </Link>
                  </Container>
                </Container>
                <nav className={styles.nav}>
                  {links.map((link, key) => (
                    <Link key={key} className={styles.navLink} href={link.url}>
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </>
            ) : (
              <Skeleton width='40vw' style={{ maxWidth: 400 }} count={2} />
            )}
          </Container>

          <Container column gap='2rem'>
            {isLoaded ? (
              <ButtonDent color='white'>Записаться</ButtonDent>
            ) : (
              <Skeleton height={40} width={150} style={{ borderRadius: 40 }} />
            )}
          </Container>
        </Container>
      </Wrapper>
    </header>
  );
};

export default Nav;
