const { HeadSEO } = require('@/components/Layout');
const { SignUp } = require('@/page-components/Auth');

const AdminUsers = () => {
  return (
    <>
      <HeadSEO title={'Регистрация пользователя'} />
      <SignUp />
    </>
  );
};

export default AdminUsers;
