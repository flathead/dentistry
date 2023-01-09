import { Container } from '@/components/Layout';
import { Dropdown } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import Link from 'next/link';
import styles from './PromoList.module.scss';
import { useState } from 'react';
import DeleteModal from '@/components/ModalWindow/DeleteModal';
import UpdateModal from '@/components/ModalWindow/UpdateModal';
import { usePromoPages } from '@/lib/promo';

const PromoList = () => {
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [promoId, setId] = useState('');
  const [promoTitle, setTitle] = useState('');
  const [promoDescription, setDescription] = useState('');
  const [promoDate, setDate] = useState('');
  const [promoTime, setTime] = useState('');
  const [promoPhoto, setPhoto] = useState('');

  const modalHandler = (id, name) => {
    setVisible(true);
    setVisible([]);
    setId(id);
    setTitle(name);
  };

  const updateModalHandler = (id, name, description, date, time, photo) => {
    setUpdateVisible(true);
    setUpdateVisible([]);
    setId(id);
    setTitle(name);
    setDescription(description);
    setDate(date);
    setTime(time);
    setPhoto(photo);
  };

  const { data } = usePromoPages();
  const promos = data
    ? data.reduce((acc, val) => [...acc, ...val.promos], [])
    : [];

  return (
    <Container column className={styles.specList}>
      <DeleteModal
        id={promoId}
        name={promoTitle}
        template={'promo'}
        open={visible}
      />
      <UpdateModal
        id={promoId}
        name={promoTitle}
        description={promoDescription}
        date={promoDate}
        time={promoTime}
        photo={promoPhoto}
        template={'promo'}
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
          <Table.Column>Описание</Table.Column>
          <Table.Column>Дата</Table.Column>
          <Table.Column>Время</Table.Column>
          <Table.Column width={2} />
        </Table.Header>
        <Table.Body>
          {promos.map((promo) => (
            <Table.Row key={promo._id}>
              <Table.Cell>
                <Link href={`/aktsii/`}>{promo.title}</Link>
              </Table.Cell>
              <Table.Cell>
                <p className={styles.scrolledPar}>
                  <p>{promo.subtitle}</p>
                </p>
              </Table.Cell>
              <Table.Cell>
                {new Date(promo.date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{promo.time}</Table.Cell>
              <Table.Cell>
                <Dropdown>
                  <Dropdown.Button flat>Действие</Dropdown.Button>
                  <Dropdown.Menu aria-label='Динамические действия'>
                    <Dropdown.Item color={'default'}>
                      <button
                        type='button'
                        onClick={() =>
                          updateModalHandler(
                            promo._id,
                            promo.title,
                            promo.subtitle,
                            promo.date,
                            promo.time,
                            promo.preview
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
                        onClick={() => modalHandler(promo._id, promo.name)}
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

export default PromoList;
