import { Wrapper } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import ServicesComponent from '@/page-components/Dashboard/ServicePage';

const AdminServicePage = ({ user }) => {
  let isAdmin;
  user && user.role === 'admin' ? (isAdmin = true) : (isAdmin = false);
  return (
    <>
      <noindex>
        {isAdmin ? (
          <Wrapper>
            <ServicesComponent />
          </Wrapper>
        ) : (
          <p>Not admin</p>
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
