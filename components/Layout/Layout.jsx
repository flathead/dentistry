import { useEffect, useState } from 'react';
import Panel from '../Panel';
import Footer from './Footer';
import styles from './Layout.module.scss';
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
