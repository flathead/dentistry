import { Wrapper } from '@/components/Layout';
import AdminMenu from './AdminMenu';
import Charts from './Charts';
import Hello from './Hello';

const Dashboard = ({ user }) => {
  return (
    <Wrapper>
      <AdminMenu />
      <Hello user={user} />
      <Charts />
    </Wrapper>
  );
};

export default Dashboard;
