import { useCurrentUser } from '@/lib/user';

const { HeadSEO } = require('@/components/Layout');
const { SignUp } = require('@/page-components/Auth');

const AdminUsersPage = ({ user }) => {
  return (
    <>
      <HeadSEO title={'Регистрация пользователя'} />
      <SignUp user={user} />
    </>
  );
};

const Users = () => {
  const { data: { user } = {} } = useCurrentUser();
  return <AdminUsersPage user={user} />;
};

export default Users;
