import { HeadSEO } from '@/components/Layout';
import { NotFoundPage } from '@/page-components/NotFoundPage';

const NotFound = () => {
  return (
    <>
      <HeadSEO title={'Страница не найдена'} />
      <noindex>
        <NotFoundPage />
      </noindex>
    </>
  );
};

export default NotFound;
