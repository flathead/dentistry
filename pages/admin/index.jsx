import { ButtonLink } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import Dashboard from '@/page-components/Dashboard';
import { useRouter } from 'next/router';
import { NextUIProvider } from '@nextui-org/react';
import Head from 'next/head';
import { Login } from '@/page-components/Auth';

const UserName = ({ user }) => {
  const router = useRouter();
  return (
    <div>
      {user.role !== 'admin' ? (
        <Container>
          <h3>У вас недостаточно прав для просмотра данной страницы</h3>
          <ButtonLink href='/'>На главную</ButtonLink>
          {setTimeout(() => {
            router.push('/');
          }, 5000)}
        </Container>
      ) : (
        <Container>
          <Dashboard user={user} />
        </Container>
      )}
    </div>
  );
};

const AdminPage = () => {
  const { data: { user } = {} } = useCurrentUser();
  const siteName = 'Панель ' + process.env.NEXT_PUBLIC_SITE_NAME;
  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>
      <noindex>
        <NextUIProvider>
          <Wrapper>
            {user && user.role == 'admin' ? (
              <>
                <UserName user={user} />
              </>
            ) : (
              <>
                <Login />
              </>
            )}
          </Wrapper>
        </NextUIProvider>
      </noindex>
    </>
  );
};

export default AdminPage;
