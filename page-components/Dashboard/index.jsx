import { Wrapper } from '@/components/Layout';
import AdminMenu from './AdminMenu';
import Hello from './Hello';

const Dashboard = ({ user }) => {
  return (
    <Wrapper>
      <AdminMenu />
      <Hello user={user} />
    </Wrapper>
  );
};

export default Dashboard;
