import { Container } from '@/components/Layout';
import AdminMenu from '../AdminMenu';
import AddService from './AddService';
import ServiceList from './ServiceList';

const ServicesComponent = ({ user }) => {
  return (
    <Container column>
      <AdminMenu />
      <AddService user={user} />
      <ServiceList />
    </Container>
  );
};

export default ServicesComponent;
