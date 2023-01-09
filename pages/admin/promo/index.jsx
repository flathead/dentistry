import { HeadSEO } from '@/components/Layout';
import PromoComponent from '@/page-components/Dashboard/PromoPage';

const AdminPromo = () => {
  return (
    <>
      <HeadSEO title={'Акции [ЦЕНТР]'} />
      <PromoComponent />
    </>
  );
};

export default AdminPromo;
