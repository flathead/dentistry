import { HeadSEO, Spacer, Wrapper } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import { Login } from '@/page-components/Auth';
import AdminMenu from '@/page-components/Dashboard/AdminMenu';
import AddNews from './AddNews';

const AdminNewsComponent = () => {
  return (
    <>
      <HeadSEO title={'Новости'} />
      <AddNews />
    </>
  );
};

const AdminNewsPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  return (
    <noindex>
      <Wrapper>
        {user && user.role === 'admin' ? (
          <>
            <AdminMenu />
            <Spacer size={1} />
            <AdminNewsComponent />
          </>
        ) : (
          <Login />
        )}
      </Wrapper>
    </noindex>
  );
};

export default AdminNewsPage;
