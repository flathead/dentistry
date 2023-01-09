import {
  Button,
  Card,
  Input,
  Modal,
  Radio,
  Row,
  Text,
} from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { transliterate as tr, slugify } from 'transliteration';
import styles from './UpdateModal.module.scss';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useServicePages } from '@/lib/service';

const UpdateModal = ({ id, name, cat, photo, template, open }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(!open ? false : true);
  }, [open]);
  const closeModalHandler = () => {
    setVisible(false);
  };

  const nameRef = useRef();
  const categoryRef = useRef();
  const previewRef = useRef();
  const oldPreviewRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const [category, setCategory] = useState(cat);
  const [descriptionState, setDescriptionState] = useState(() =>
    EditorState.createEmpty()
  );
  const [priceState, setPriceState] = useState(() => EditorState.createEmpty());

  const { serviceMutate } = useServicePages();
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let formData = new FormData();

        if (template === 'service') {
          const translite = tr(nameRef.current.value);
          const slug = slugify(translite);

          formData.append('serviceId', id);
          formData.append('slug', slug);
          formData.append('name', nameRef.current.value);
          formData.append('category', categoryRef.current.value);
          if (previewRef.current.files && previewRef.current.files[0]) {
            formData.append('preview', previewRef.current.files[0]);
          } else {
            formData.append('oldimage', oldPreviewRef.current.value);
          }
          formData.append('description', descriptionRef.current.value);
          formData.append('price', priceRef.current.value);
        }

        const res = await fetch(
          `/api/${
            template === 'service'
              ? 'services'
              : template === 'promo'
              ? 'promos'
              : template === 'portfolio'
              ? 'portfolios'
              : template === 'doctor'
              ? 'doctors'
              : template === 'review'
              ? 'reviews'
              : null
          }`,
          {
            method: 'PATCH',
            body: formData,
          }
        );
        serviceMutate;

        if (res.status === 200) {
          toast.success(
            `${
              template === 'service'
                ? 'Услуга'
                : template === 'promo'
                ? 'Акция'
                : template === 'portfolio'
                ? 'Работа'
                : template === 'doctor'
                ? 'Запись о враче'
                : template === 'review'
                ? 'Запись об отзыве'
                : null
            }${name ? ' "' + name + '" ' : ' '}обновлена!`
          );
        } else {
          toast.error(
            `Ошибка при обновлении ${
              template === 'service'
                ? 'услуги'
                : template === 'promo'
                ? 'акции'
                : template === 'portfolio'
                ? 'работы'
                : template === 'doctor'
                ? 'врача'
                : template === 'review'
                ? 'отзыва'
                : null
            }: ${res.statusText}`
          );
        }
      } catch (e) {
        toast.error(e.message);
      }
      setTimeout(() => {
        setVisible(false);
      }, 300);
    },
    [serviceMutate, id, name, template]
  );

  /* useEffect(() => {
    usernameRef.current.value = user.username;
    nameRef.current.value = user.name;
    bioRef.current.value = user.bio;
    profilePictureRef.current.value = '';
  }, [mutate]); */

  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={visible}
      onClose={closeModalHandler}
    >
      <form onSubmit={onSubmit}>
        <Modal.Header>
          <Text id='modal-title' size={18}>
            Обновление{' '}
            <Text b size={18}>
              {template === 'service'
                ? 'услуги'
                : template === 'promo'
                ? 'акции'
                : template === 'portfolio'
                ? 'работы'
                : template === 'doctor'
                ? 'врача'
                : template === 'review'
                ? 'отзыва'
                : null}
              :
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Card variant='flat'>
              <Card.Body>
                <Text b style={{ marginBottom: '0' }} size={20}>
                  &quot;{name}&quot;
                </Text>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card variant='bordered'>
              <Card.Body>
                <div className={styles.addForm}>
                  <div className={styles.inputGroup}>
                    <div className={styles.photoGroup}>
                      <div className={styles.inputColumn}>
                        <Input
                          ref={nameRef}
                          type={'text'}
                          label={'Название услуги'}
                          placeholder={name}
                        />
                      </div>
                      <div className={styles.inputColumn}>
                        <input
                          type='hidden'
                          ref={oldPreviewRef}
                          value={photo}
                        />
                        <label for='previewinput'>Изображение услуги</label>
                        <input
                          id='previewinput'
                          ref={previewRef}
                          type={'file'}
                          placeholder={'Изображение'}
                        />
                      </div>
                    </div>
                    <input type='hidden' value={category} ref={categoryRef} />
                    <Radio.Group
                      label='Категория услуги'
                      value={category}
                      onChange={setCategory}
                      defaultValue={cat}
                      orientation='vertical'
                    >
                      <Radio
                        size='sm'
                        value='Без категории'
                        description='Для услуг без категории'
                      >
                        Без категории
                      </Radio>
                      <Radio
                        size='sm'
                        value='Лечение зубов'
                        description='Категория с услугами внутри'
                      >
                        Лечение зубов
                      </Radio>
                      <Radio
                        size='sm'
                        value='Удаление зубов'
                        description='Категория с услугами внутри'
                      >
                        Удаление зубов
                      </Radio>
                      <Radio
                        size='sm'
                        value='Чистка зубов'
                        description='Категория с услугами внутри'
                      >
                        Чистка зубов
                      </Radio>
                    </Radio.Group>
                  </div>
                  <div>
                    <p className={styles.blockTitle}>Описание услуги</p>
                    <Editor
                      editorState={descriptionState}
                      wrapperClassName={styles.richText}
                      toolbarClassName={styles.toolbar}
                      editorClassName={styles.textfield}
                      onEditorStateChange={setDescriptionState}
                      toolbar={{
                        options: [
                          'inline',
                          'list',
                          'textAlign',
                          'remove',
                          'history',
                        ],
                      }}
                    />

                    <textarea
                      className={styles.code}
                      disabled
                      ref={descriptionRef}
                      value={draftToHtml(
                        convertToRaw(descriptionState.getCurrentContent())
                      )}
                    />
                  </div>
                  <div>
                    <p className={styles.blockTitle}>Прайс-лист</p>
                    <Editor
                      editorState={priceState}
                      wrapperClassName={styles.richText}
                      toolbarClassName={styles.toolbar}
                      editorClassName={styles.textfield}
                      onEditorStateChange={setPriceState}
                      toolbar={{
                        options: [
                          'inline',
                          'list',
                          'textAlign',
                          'remove',
                          'history',
                        ],
                      }}
                    />

                    <textarea
                      className={styles.code}
                      disabled
                      ref={priceRef}
                      value={draftToHtml(
                        convertToRaw(priceState.getCurrentContent())
                      )}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color='primary' onPress={closeModalHandler}>
            Отменить
          </Button>
          <Button
            auto
            color='success'
            data-id={id}
            data-name={name}
            type='submit'
          >
            ОБНОВИТЬ
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
