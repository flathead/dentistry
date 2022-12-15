import { Wrapper } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import { Login } from '@/page-components/Auth';
import Specialists from '@/page-components/Dashboard/StaffPage';

const StaffComponent = ({ user }) => {
  return (
    <>
      <noindex>
        <Wrapper>{user ? <Specialists user={user} /> : <Login />}</Wrapper>
      </noindex>
    </>
  );
};

const Staff = () => {
  const { data: { user } = {} } = useCurrentUser();
  return <StaffComponent user={user} />;
};

export default Staff;
