import { Wrapper } from '@/components/Layout';
import Charts from './Charts';
import Hello from './Hello';

const Dashboard = ({ user }) => {
  return (
    <Wrapper>
      <Hello user={user} />

      <Charts />
    </Wrapper>
  );
};

export default Dashboard;
