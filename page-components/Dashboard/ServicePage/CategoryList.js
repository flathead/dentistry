import { Container } from '@/components/Layout';
import { Dropdown } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import styles from './ServiceList.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DeleteModal from '@/components/ModalWindow/DeleteModal';
import UpdateModal from '@/components/ModalWindow/UpdateModal';
import { useCategoryPages } from '@/lib/category';

const CategoryList = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [categoryId, setId] = useState('');
  const [categoryName, setName] = useState('');
  const [categorySlug, setSlug] = useState('');
  const [categoryShort, setShort] = useState('');
  const [categoryDescription, setDescription] = useState('');
  const [categoryPrice, setPrice] = useState('');

  const [categoryPhoto, setPhoto] = useState('');

  const modalHandler = (id, name, slug) => {
    setId(id);
    setName(name);
    setSlug(slug);
    setVisible(true);
    setVisible([]);
    console.log('ID: ' + id + ', Slug: ' + slug + ', Name: ' + name);
  };

  const updateModalHandler = (id, title, short, description, price, photo) => {
    setId(id);
    setName(title);
    setShort(short);
    setDescription(description);
    setPrice(price);
    setPhoto(photo);
    setUpdateVisible(true);
    setUpdateVisible([]);
  };

  const { data } = useCategoryPages();
  const categories = data
    ? data.reduce((acc, val) => [...acc, ...val.categories], [])
    : [];

  return (
    <Container column className={styles.specList}>
      <DeleteModal
        id={categoryId}
        name={categoryName}
        slug={categorySlug}
        template={'category'}
        open={visible}
      />
      <UpdateModal
        id={categoryId}
        name={categoryName}
        photo={categoryPhoto}
        short={categoryShort}
        description={categoryDescription}
        price={categoryPrice}
        template={'category'}
        open={updateVisible}
      />
      <Table
        aria-label='Example table with static content'
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
        color={'primary'}
      >
        <Table.Header>
          <Table.Column>Название</Table.Column>
          <Table.Column>Краткое описание</Table.Column>
          <Table.Column>Полное описание</Table.Column>
          <Table.Column>Прайс</Table.Column>
          <Table.Column width={2} />
        </Table.Header>
        <Table.Body>
          {categories.map((category) => (
            <Table.Row key={category._id}>
              <Table.Cell>
                <Link href={`/uslugi/${category.slug}`}>{category.title}</Link>
              </Table.Cell>
              <Table.Cell>
                {category._id !== '63cc3a9833d8de5360907776' ?? (
                  <p className={styles.scrolledPar}>
                    {ReactHtmlParser(category.short)}
                  </p>
                )}
              </Table.Cell>
              <Table.Cell>
                {category._id !== '63cc3a9833d8de5360907776' ?? (
                  <p className={styles.scrolledPar}>
                    {ReactHtmlParser(category.description)}
                  </p>
                )}
              </Table.Cell>
              <Table.Cell>
                {category._id !== '63cc3a9833d8de5360907776' ?? (
                  <p className={styles.scrolledPar}>
                    {ReactHtmlParser(category.price)}
                  </p>
                )}
              </Table.Cell>

              <Table.Cell>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    disabled={
                      category._id === '63cc3a9833d8de5360907776' ?? true
                    }
                  >
                    Действие
                  </Dropdown.Button>
                  <Dropdown.Menu aria-label='Динамические действия'>
                    <Dropdown.Item color={'default'}>
                      <button
                        type='button'
                        onClick={() => router.push(`/uslugi/${category.slug}`)}
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
                            category._id,
                            category.title,
                            category.short,
                            category.description,
                            category.price,
                            category.preview
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
                            category._id,
                            category.title,
                            category.slug
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
        <Table.Pagination
          shadow
          noMargin
          align='center'
          rowsPerPage={3}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Container>
  );
};

export default CategoryList;
