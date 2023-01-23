import { HeadSEO } from '@/components/Layout';
import { TechPage } from '@/page-components/TechPage';

const Tech = () => {
  return (
    <>
      <HeadSEO
        title={'Технологии нашей клиники'}
        canonicalUrl={'https://dent-71.ru/tekhnologii'}
      />
      <TechPage />
    </>
  );
};

export default Tech;
