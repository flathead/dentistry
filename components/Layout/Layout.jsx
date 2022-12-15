import Head from 'next/head';
import { useEffect, useState } from 'react';
import Panel from '../Panel';
import Footer from './Footer';
import styles from './Layout.module.css';
import Nav from './Nav';

const Layout = ({ children }) => {
  const [scrollTop, setClientWindowHeight] = useState('');
  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta
          key='viewport'
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta
          name='description'
          content={`Стоматологическая клиника в городе Тула — «${process.env.NEXT_PUBLIC_SITE_NAME}». Наша миссия – сделать современную стоматологию доступной для всех.`}
        />
        <meta property='og:title' content='Стоматология на Демонстрации' />
        <meta
          property='og:description'
          content={`Стоматологическая клиника в городе Тула — «${process.env.NEXT_PUBLIC_SITE_NAME}». Наша миссия – сделать современную стоматологию доступной для всех.`}
        />
        <meta
          property='og:image'
          content={`${process.env.NEXT_PUBLIC_WEB_URI}/logo_social.png`}
        />
      </Head>
      <Nav top={scrollTop} />
      <main top={scrollTop} className={styles.main}>
        <Panel top={scrollTop} />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
