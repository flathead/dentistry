import { HeadSEO } from '@/components/Layout';
import { useServicePages } from '@/lib/service';
import { ServicePage } from '@/page-components/ServicePage';

const Uslugi = () => {
  const { data } = useServicePages();
  const services = data
    ? data.reduce((acc, val) => [...acc, ...val.services], [])
    : [];
  return (
    <>
      <HeadSEO
        title={'Услуги клиники'}
        description={
          'Ознакомьтесь с перечнем наших услуг. Наша цель - сделать стоматологию доступной и качественной!'
        }
      />
      <ServicePage services={services} />
    </>
  );
};

export default Uslugi;
