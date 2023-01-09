import { Container, Wrapper } from '@/components/Layout';
import AdminMenu from '../AdminMenu';
import AddPromo from './AddPromo';
import PromoList from './PromoList';

const PromoComponent = ({ user }) => {
  return (
    <Container column>
      <Wrapper>
        <AdminMenu />
        <AddPromo user={user} />
        <PromoList />
      </Wrapper>
    </Container>
  );
};

export default PromoComponent;
