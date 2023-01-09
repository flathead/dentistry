import { HeadSEO } from '@/components/Layout';
import { PromoPage } from '@/page-components/PromoPage';

const Aktsii = () => {
  return (
    <>
      <HeadSEO
        title={'Акции стоматологии на Демонстрации'}
        description={
          'Все акции, проводимые в нашей клинике - на одной странице. Наша миссия – сделать современную стоматологию доступной для всех.'
        }
        canonicalUrl={'https://dent-71.ru/aktsii'}
        ogImageUrl={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927207/original_5f3123d2746a0b19cb5871e9_5f4df4b91ec73_ngykxi.webp'
        }
        ogTwitterImage={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672927207/original_5f3123d2746a0b19cb5871e9_5f4df4b91ec73_ngykxi.webp'
        }
      />
      <PromoPage />
    </>
  );
};

export default Aktsii;
