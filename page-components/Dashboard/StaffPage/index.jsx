import { Container } from '@/components/Layout';
import AdminMenu from '../AdminMenu';
import AddSpec from './AddSpecialist';
import SpecialistList from './SpecialistList';

const Specialists = ({ user }) => {
  return (
    <Container column>
      <AdminMenu />
      <AddSpec user={user} />
      <SpecialistList />
    </Container>
  );
};

export default Specialists;
