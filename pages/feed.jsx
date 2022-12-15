import { Feed } from '@/page-components/Feed';
import Head from 'next/head';

const FeedPage = () => {
  return (
    <>
      <Head>
        <title>Фид</title>
      </Head>
      <Feed />
    </>
  );
};

export default FeedPage;
