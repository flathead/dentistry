import { HeadSEO } from '@/components/Layout';
import { TechPage } from '@/page-components/TechPage';

const Tech = () => {
  return (
    <>
      <HeadSEO title={'Технологии нашей клиники'} />
      <TechPage />
    </>
  );
};

export default Tech;
