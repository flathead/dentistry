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
import clsx from 'clsx';
import { ModalWindow } from '../ModalWindow';
import { useRouter } from 'next/router';
import { SocialButton } from '../SocialButton';
import siteMetadata from 'data/siteMetadata';

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
    id: 1,
    url: siteMetadata.siteUrl,
    name: 'О клинике',
  },
  {
    id: 2,
    url: `${siteMetadata.siteUrl}/uslugi`,
    name: 'Услуги',
  },
  {
    id: 3,
    url: `${siteMetadata.siteUrl}/vrachi`,
    name: 'Врачи',
  },
  {
    id: 4,
    url: `${siteMetadata.siteUrl}/aktsii`,
    name: 'Акции',
  },
  {
    id: 5,
    url: `${siteMetadata.siteUrl}/tekhnologii`,
    name: 'Технологии',
  },
  {
    id: 6,
    url: `${siteMetadata.siteUrl}/raboty`,
    name: 'Работы',
  },
  {
    id: 7,
    url: `${siteMetadata.siteUrl}/otzyvy`,
    name: 'Отзывы',
  },
  {
    id: 8,
    url: `${siteMetadata.siteUrl}/kontakty`,
    name: 'Контакты',
  },
];

const Nav = ({ top }) => {
  const router = useRouter();

  const [location, setLocation] = useState(null);

  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoading] = useState(false);
  const [visible, setVisibility] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      setLocation(window.location.pathname);
    }, 1000);
  }, [isLoaded, location]);

  const menuHandler = () => {
    setVisibility(visible === false ? true : false);
    visible !== true
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  };

  const hideHandler = () => {
    document.body.style.overflow = 'auto';
  };

  const linkHandler = () => {
    document.body.style.overflow = 'auto';
    setVisibility(false);
  };

  const modalHandler = (e) => {
    e.preventDefault();
    setOpen(true);
    setOpen([]);
  };
  return (
    <>
      <header
        className={clsx(styles.mainNavigation, visible && styles.menuOpened)}
        style={{ height: top >= 20 ? 60 + 'px' : 100 + 'px' }}
      >
        <Wrapper className={styles.wrapper}>
          <Container
            className={styles.content}
            alignItems='center'
            justifyContent='space-between'
          >
            <div className={styles.logoWrapper}>
              {/* TODO Сделать нормальную кнопку */}
              <ButtonDent
                color={'mobile'}
                menuOpen={visible}
                className={clsx(styles.mobileBtn, visible && styles.btnOpened)}
                onClick={menuHandler}
              >
                <span></span>
                <span></span>
                <span></span>
              </ButtonDent>
              <Link onClick={hideHandler} href='/' className={styles.logo}>
                {isLoaded ? (
                  <Image
                    src='/logo_2x.webp'
                    width={top >= 20 ? 160 : 200}
                    height={top >= 20 ? 40 : 50}
                    alt={'Логотип'}
                    className={styles.logo}
                    quality={100}
                  />
                ) : (
                  <Skeleton height={50} width={200} />
                )}
              </Link>
            </div>

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
                    hide={top >= 20 && window.innerWidth >= 1080 ? true : false}
                    row
                    alignItems={'center'}
                    gap={'2rem'}
                  >
                    {window.innerWidth >= 1080 ? (
                      <Container
                        className={clsx(styles.phones, styles.address)}
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
                    ) : null}
                    <Container
                      className={styles.phones}
                      gap={'10px'}
                      alignItems={'center'}
                    >
                      {window.innerWidth >= 1080 ? (
                        <Icon.Phone color='#193042' size={20} />
                      ) : null}
                      <Link
                        className={styles.contactLink}
                        href={'tel:84872707172'}
                      >
                        +7 (4872) 70-71-72
                      </Link>
                      <Link
                        className={styles.contactLink}
                        href={'tel:89534301668'}
                      >
                        +7 (953) 430-16-68
                      </Link>
                    </Container>
                  </Container>
                  <nav
                    itemscope
                    itemtype='http://schema.org/SiteNavigationElement'
                    className={clsx(
                      styles.nav,
                      links.length <= 4 && styles.navSmall
                    )}
                  >
                    {links.map((link, key) => (
                      <Link
                        key={key}
                        itemprop='url'
                        className={clsx(
                          styles.navLink,
                          router.pathname === link.url && styles.navLinkActive
                        )}
                        href={link.url}
                        title={
                          router.pathname === link.url
                            ? 'Вы на данной странице'
                            : null
                        }
                        style={{
                          cursor:
                            router.pathname === link.url ? 'help' : 'pointer',
                        }}
                        onClick={(e) =>
                          router.pathname === link.url
                            ? e.preventDefault()
                            : null
                        }
                      >
                        <span itemprop='name'>{link.name}</span>
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
                <ButtonDent onClick={modalHandler} color='white'>
                  Записаться
                </ButtonDent>
              ) : (
                <Skeleton
                  height={40}
                  width={150}
                  style={{ borderRadius: 40 }}
                />
              )}
            </Container>
          </Container>
        </Wrapper>

        {visible ? (
          <div
            className={clsx(
              styles.mobileMenu,
              visible && styles.mobileMenuOpened
            )}
          >
            <nav itemscope itemtype='http://schema.org/SiteNavigationElement'>
              {links.map((link, key) => (
                <Link
                  key={key}
                  itemprop='url'
                  className={clsx(
                    styles.navLink,
                    location.includes(link.url) && styles.active
                  )}
                  href={link.url}
                  onClick={linkHandler}
                >
                  <span itemprop='name'>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        ) : null}

        <ModalWindow open={open} />
      </header>
      <div className={styles.socials}>
        <SocialButton
          social={'vk'}
          size={26}
          src={'https://vk.com/familystomtula'}
        />
        {/* <SocialButton
          social={'telegram'}
          size={26}
          src={'https://t.me/+79534301668'}
        /> */}
        <SocialButton
          social={'whatsapp'}
          size={26}
          src={
            'https://api.whatsapp.com/send?phone=+79534301668&text=Здравствуйте!'
          }
        />
      </div>
    </>
  );
};

export default Nav;
