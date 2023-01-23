import { HeadSEO } from '@/components/Layout';
import { ServicePage } from '@/page-components/ServicePage';

const Uslugi = () => {
  return (
    <>
      <HeadSEO
        title={'Услуги клиники'}
        description={
          'Ознакомьтесь с перечнем наших услуг. Наша цель - сделать стоматологию доступной и качественной!'
        }
      />
      <ServicePage />
    </>
  );
};

export default Uslugi;
