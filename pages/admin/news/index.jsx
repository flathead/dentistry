import { HeadSEO } from '@/components/Layout';
import { AdminNewsPage } from '@/page-components/Dashboard/AdminNewsPage';

const AdminNews = () => {
  return (
    <>
      <HeadSEO title={'Новости'} />
      <AdminNewsPage />
    </>
  );
};

export default AdminNews;
