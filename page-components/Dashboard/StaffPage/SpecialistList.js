import { Container } from '@/components/Layout';
import { Dropdown } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import styles from './SpecialistList.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DeleteModal from '@/components/ModalWindow/DeleteModal';
import UpdateModal from '@/components/ModalWindow/UpdateModal';
import { useSpecPages } from '@/lib/post';

const SpecialistList = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [doctorId, setId] = useState('');
  const [doctorName, setName] = useState('');
  const [doctorSlug, setSlug] = useState('');
  const [doctorPhoto, setPhoto] = useState('');
  const [doctorSpeciality, setSpecliality] = useState('');
  const [doctorEducation, setEducation] = useState('');
  const [doctorExperience, setExperience] = useState('');

  const modalHandler = (id, name, slug) => {
    setVisible(true);
    setVisible([]);
    setId(id);
    setName(name);
    setSlug(slug);
  };

  const updateModalHandler = (
    id,
    name,
    speciality,
    experience,
    education,
    photo
  ) => {
    setUpdateVisible(true);
    setUpdateVisible([]);
    setId(id);
    setName(name);
    setSpecliality(speciality);
    setEducation(education);
    setExperience(experience);
    setPhoto(photo);
  };

  const { data } = useSpecPages();
  const specialists = data
    ? data.reduce((acc, val) => [...acc, ...val.specialists], [])
    : [];

  return (
    <Container column className={styles.specList}>
      <DeleteModal
        id={doctorId}
        name={doctorName}
        slug={doctorSlug}
        template={'doctor'}
        open={visible}
      />
      <UpdateModal
        id={doctorId}
        name={doctorName}
        speciality={doctorSpeciality}
        education={doctorEducation}
        experience={doctorExperience}
        photo={doctorPhoto}
        template={'doctor'}
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
              <Table.Cell>
                <p className={styles.scrolledPar}>
                  {ReactHtmlParser(specialist.education)}
                </p>
              </Table.Cell>
              <Table.Cell>
                <Dropdown>
                  <Dropdown.Button flat>Действие</Dropdown.Button>
                  <Dropdown.Menu aria-label='Динамические действия'>
                    <Dropdown.Item color={'default'}>
                      <button
                        type='button'
                        onClick={() =>
                          router.push(`/vrachi/${specialist.slug}`)
                        }
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
                            specialist._id,
                            specialist.name,
                            specialist.speciality,
                            specialist.experience,
                            specialist.education,
                            specialist.photo
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
                          modalHandler(
                            specialist._id,
                            specialist.name,
                            specialist.slug
                          )
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

export default SpecialistList;
