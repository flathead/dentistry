import { Container } from '@/components/Layout';
import { Text } from '@nextui-org/react';
import AdminMenu from '../AdminMenu';
import AddCategory from './AddCategory';
import AddService from './AddService';
import CategoryList from './CategoryList';
import ServiceList from './ServiceList';

const ServicesComponent = ({ user }) => {
  return (
    <Container column>
      <AdminMenu />

      <Text h1>Категории</Text>
      <Text size={16}>
        Добавляйте, редактируйте и удаляйте категории услуг.
      </Text>

      <AddCategory />
      <CategoryList />

      <Text h1>Услуги</Text>
      <Text size={16}>Добавляйте, редактируйте и удаляйте услуги.</Text>

      <AddService user={user} />
      <ServiceList />
    </Container>
  );
};

export default ServicesComponent;
