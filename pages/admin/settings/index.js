import { Settings } from '@/page-components/Settings';
import Head from 'next/head';

const SettingPage = () => {
  return (
    <>
      <Head>
        <title>Настройки</title>
      </Head>
      <Settings />
    </>
  );
};

export default SettingPage;
