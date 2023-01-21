import { Container, Wrapper } from '@/components/Layout';
import AdminMenu from '../AdminMenu';
import AddWork from './AddWork';
import WorkList from './WorkList';

const PortfolioComponent = () => {
  return (
    <Container column>
      <Wrapper>
        <AdminMenu />
        <AddWork />
        <WorkList />
      </Wrapper>
    </Container>
  );
};

export default PortfolioComponent;
