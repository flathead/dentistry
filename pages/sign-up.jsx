import { SignUp } from '@/page-components/Auth';
import Head from 'next/head';

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <SignUp />
    </>
  );
};

export default SignupPage;
