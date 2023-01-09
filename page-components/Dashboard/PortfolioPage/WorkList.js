import { Container } from '@/components/Layout';
import { Button } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import styles from './WorkList.module.scss';
import { useState } from 'react';
import DeleteModal from '@/components/ModalWindow/DeleteModal';
import Image from 'next/image';
import { usePortfolioPages } from '@/lib/portfolio';

const WorkList = () => {
  const [visible, setVisible] = useState(false);
  const [workId, setId] = useState('');
  const [workTitle, setTitle] = useState('');

  const modalHandler = (id, title) => {
    setVisible(true);
    setVisible([]);
    setId(id);
    setTitle(title);
  };

  const { data } = usePortfolioPages();
  const works = data
    ? data.reduce((acc, val) => [...acc, ...val.works], [])
    : [];

  return (
    <Container column className={styles.specList}>
      <DeleteModal
        id={workId}
        name={workTitle}
        template={'portfolio'}
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
          <Table.Column>Название</Table.Column>
          <Table.Column>До</Table.Column>
          <Table.Column>После</Table.Column>
          <Table.Column width={2} />
        </Table.Header>
        <Table.Body>
          {works.map((work) => (
            <Table.Row key={work._id}>
              <Table.Cell>{work.title}</Table.Cell>
              <Table.Cell>
                <Image
                  style={{ borderRadius: '1rem', objectFit: 'cover' }}
                  src={work.before}
                  alt='До'
                  width={100}
                  height={60}
                />
              </Table.Cell>
              <Table.Cell>
                <Image
                  style={{ borderRadius: '1rem', objectFit: 'cover' }}
                  src={work.after}
                  alt='После'
                  width={100}
                  height={60}
                />
              </Table.Cell>

              <Table.Cell>
                <Button
                  color={'error'}
                  flat
                  size={'xs'}
                  type='button'
                  onClick={() => modalHandler(work._id, work.title)}
                >
                  {'🗙 Удалить'}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default WorkList;
