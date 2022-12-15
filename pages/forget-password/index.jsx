import { ForgetPasswordIndex } from '@/page-components/ForgetPassword';
import Head from 'next/head';

const ForgetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Восстановление пароля</title>
      </Head>
      <ForgetPasswordIndex />
    </>
  );
};

export default ForgetPasswordPage;
