import { Container } from '@/components/Layout';
import { Button } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import styles from './AdminReviewsList.module.scss';
import { useState } from 'react';
import DeleteModal from '@/components/ModalWindow/DeleteModal';
import { useReviewPages } from '@/lib/review';
import AdminMenu from '../AdminMenu';

const AdminReviewPage = () => {
  const [visible, setVisible] = useState(false);
  const [workId, setId] = useState('');
  const [workTitle, setTitle] = useState('');

  const modalHandler = (id, title) => {
    setVisible(true);
    setVisible([]);
    setId(id);
    setTitle(title);
  };

  const { data } = useReviewPages();
  const reviews = data
    ? data.reduce((acc, val) => [...acc, ...val.reviews], [])
    : [];

  return (
    <>
      <AdminMenu />
      <Container column className={styles.specList}>
        <DeleteModal
          id={workId}
          name={workTitle}
          template={'review'}
          open={visible}
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
            <Table.Column>Имя</Table.Column>
            <Table.Column>Оценка</Table.Column>
            <Table.Column>Отзыв</Table.Column>
            <Table.Column width={2} />
          </Table.Header>
          <Table.Body>
            {reviews.map((review) => (
              <Table.Row key={review._id}>
                <Table.Cell>{review.name}</Table.Cell>
                <Table.Cell>{review.rating}/5</Table.Cell>
                <Table.Cell>
                  <div className={styles.scrolledPar}>
                    <p>{review.content}</p>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <Button
                    color={'error'}
                    flat
                    size={'xs'}
                    type='button'
                    onClick={() => modalHandler(review._id, review.name)}
                  >
                    {'🗙 Удалить'}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};

export default AdminReviewPage;
