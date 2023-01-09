import { Container } from '@/components/Layout';
import { Dropdown } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import styles from './ServiceList.module.scss';
import { useServicePages } from '@/lib/service';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DeleteModal from '@/components/ModalWindow/DeleteModal';
import UpdateModal from '@/components/ModalWindow/UpdateModal';

const ServiceList = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [serviceId, setId] = useState('');
  const [serviceName, setName] = useState('');
  const [serviceSlug, setSlug] = useState('');
  const [serviceCat, setCat] = useState('');
  const [servicePhoto, setPhoto] = useState('');

  const modalHandler = (id, name, slug) => {
    setVisible(true);
    setVisible([]);
    setId(id);
    setName(name);
    setSlug(slug);
  };

  const updateModalHandler = (id, name, cat, photo) => {
    setUpdateVisible(true);
    setUpdateVisible([]);
    setId(id);
    setName(name);
    setCat(cat);
    setPhoto(photo);
  };

  const { data } = useServicePages();
  const services = data
    ? data.reduce((acc, val) => [...acc, ...val.services], [])
    : [];

  return (
    <Container column className={styles.specList}>
      <DeleteModal
        id={serviceId}
        name={serviceName}
        slug={serviceSlug}
        template={'service'}
        open={visible}
      />
      <UpdateModal
        id={serviceId}
        name={serviceName}
        cat={serviceCat}
        photo={servicePhoto}
        template={'service'}
        open={updateVisible}
      />
      <Table
        aria-label='Example table with static content'
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
        color={'primary'}
        selectionMode='multiple'
      >
        <Table.Header>
          <Table.Column>Название</Table.Column>
          <Table.Column>Категория</Table.Column>
          <Table.Column>Описание</Table.Column>
          <Table.Column>Прайс</Table.Column>
          <Table.Column width={2} />
        </Table.Header>
        <Table.Body>
          {services.map((service) => (
            <Table.Row key={service._id}>
              <Table.Cell>
                <Link href={`/uslugi/${service.slug}`}>{service.name}</Link>
              </Table.Cell>
              <Table.Cell>{service.category}</Table.Cell>
              <Table.Cell>
                <p className={styles.scrolledPar}>
                  {ReactHtmlParser(service.description)}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p className={styles.scrolledPar}>
                  {ReactHtmlParser(service.price)}
                </p>
              </Table.Cell>
              <Table.Cell>
                <Dropdown>
                  <Dropdown.Button flat>Действие</Dropdown.Button>
                  <Dropdown.Menu aria-label='Динамические действия'>
                    <Dropdown.Item color={'default'}>
                      <button
                        type='button'
                        onClick={() => router.push(`/uslugi/${service.slug}`)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0',
                          cursor: 'pointer',
                        }}
                      >
                        {'👁 Перейти'}
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item color={'default'}>
                      <button
                        type='button'
                        onClick={() =>
                          updateModalHandler(
                            service._id,
                            service.name,
                            service.category,
                            service.preview
                          )
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0',
                          cursor: 'pointer',
                        }}
                      >
                        {'✏ Изменить'}
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item color={'error'}>
                      <button
                        type='button'
                        onClick={() =>
                          modalHandler(service._id, service.name, service.slug)
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0',
                          cursor: 'pointer',
                        }}
                      >
                        {'🗙 Удалить'}
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default ServiceList;
