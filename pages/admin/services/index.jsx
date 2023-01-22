import { Wrapper } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import { Login } from '@/page-components/Auth';
import ServicesComponent from '@/page-components/Dashboard/ServicePage';

const AdminServicePage = ({ user }) => {
  return (
    <>
      <noindex>
        {user ? (
          <Wrapper>
            <ServicesComponent />
          </Wrapper>
        ) : (
          <Login />
        )}
      </noindex>
    </>
  );
};

const AdminServices = () => {
  const { data: { user } = {} } = useCurrentUser();
  return <AdminServicePage user={user} />;
};

export default AdminServices;
