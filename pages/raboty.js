import { HeadSEO } from '@/components/Layout';
import { PortfolioPage } from '@/page-components/PortfolioPage';

const Portfolio = () => {
  return (
    <>
      <HeadSEO
        title={'Результаты работы врачей стоматологии на Демонстрации'}
        description={
          'Наглядные результаты наших работ - до и после. Наша миссия – сделать современную стоматологию доступной для всех.'
        }
        canonicalUrl={'https://dent-71.ru/raboty'}
        ogImageUrl={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672928336/esteticheskaya_stomatologiya_rwqeq9.jpg'
        }
        ogTwitterImage={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672928336/esteticheskaya_stomatologiya_rwqeq9.jpg'
        }
      />
      <PortfolioPage />
    </>
  );
};

export default Portfolio;
