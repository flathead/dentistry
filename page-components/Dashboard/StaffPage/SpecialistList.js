import { Container } from '@/components/Layout';
import { useSpecPages } from '@/lib/post';
import { Button } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import * as Icon from 'react-feather';
import styles from './SpecialistList.module.scss';
import Tooltip from '@/components/Tooltip';

const SpecialistList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useSpecPages();
  const specialists = data
    ? data.reduce((acc, val) => [...acc, ...val.specialists], [])
    : [];

  return (
    <Container column className={styles.specList}>
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
          <Table.Column>Специализация</Table.Column>
          <Table.Column>Стаж работы</Table.Column>
          <Table.Column>Образование</Table.Column>
          <Table.Column width={2} />
        </Table.Header>
        <Table.Body>
          {specialists.map((specialist) => (
            <Table.Row key={specialist._id}>
              <Table.Cell>
                <Link href={`/vrachi/${specialist.slug}`}>
                  {specialist.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{specialist.speciality}</Table.Cell>
              <Table.Cell>{specialist.experience}</Table.Cell>
              <Table.Cell>{ReactHtmlParser(specialist.education)}</Table.Cell>
              <Table.Cell css={{ d: 'flex' }}>
                <Tooltip
                  content='Страница врача'
                  rounded
                  color='primary'
                  placement='top'
                >
                  <button>
                    <Icon.Eye />
                  </button>
                </Tooltip>
                <Tooltip
                  content='Редактировать'
                  rounded
                  color='warning'
                  placement='top'
                >
                  <button>
                    <Icon.PenTool />
                  </button>
                </Tooltip>
                <Tooltip
                  content='Удалить'
                  rounded
                  color='error'
                  placement='top'
                >
                  <button>
                    <Icon.Delete />
                  </button>
                </Tooltip>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {isReachingEnd ? (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.6rem',
          }}
        >
          <Icon.Table />
          Вы просмотрели всех специалистов
        </p>
      ) : (
        <Button
          variant='ghost'
          type='success'
          loading={isLoadingMore}
          onClick={() => setSize(size + 1)}
        >
          Загрузить ещё
        </Button>
      )}
    </Container>
  );
};

export default SpecialistList;
