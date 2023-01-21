import { SignUp } from '@/page-components/Auth';
import { Settings } from '@/page-components/Settings';
import Head from 'next/head';

const SettingPage = () => {
  return (
    <>
      <Head>
        <title>Настройки</title>
      </Head>
      <Settings />
      <SignUp />
    </>
  );
};

export default SettingPage;
