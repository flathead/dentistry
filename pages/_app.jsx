import '@/assets/base.scss';
import { Layout } from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
// import { NextUIProvider } from '@nextui-org/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* TODO Обернуть всё в <NextUIProvider> и исправить при этом ошибку с отображением */}
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}
