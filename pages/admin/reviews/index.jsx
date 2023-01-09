import { Wrapper } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import { AdminReviewsList } from '@/page-components/Dashboard/AdminReviewsList';

const AdminReviewPage = ({ user }) => {
  let isAdmin;
  user && user.role === 'admin' ? (isAdmin = true) : (isAdmin = false);
  return (
    <>
      <noindex>
        {isAdmin ? (
          <Wrapper>
            <AdminReviewsList />
          </Wrapper>
        ) : (
          <p>Not admin</p>
        )}
      </noindex>
    </>
  );
};

const AdminReviews = () => {
  const { data: { user } = {} } = useCurrentUser();
  return <AdminReviewPage user={user} />;
};

export default AdminReviews;
