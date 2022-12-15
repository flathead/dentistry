import { Container } from '@/components/Layout';
import { Title } from '@/components/Title';
import AddSpec from './AddSpecialist';
import SpecialistList from './SpecialistList';

const Specialists = ({ user }) => {
  return (
    <Container column>
      <Title size={1}>Персонал клиники</Title>
      <AddSpec user={user} />
      <SpecialistList />
    </Container>
  );
};

export default Specialists;
