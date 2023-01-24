import {
  Button,
  Card,
  Input,
  Modal,
  Radio,
  Row,
  Text,
  Textarea,
} from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { transliterate as tr, slugify } from 'transliteration';
import styles from './UpdateModal.module.scss';

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useServicePages } from '@/lib/service';
import { usePromoPages } from '@/lib/promo';
import { usePortfolioPages } from '@/lib/portfolio';
import { useSpecPages } from '@/lib/post';
import { Wysiwyg } from '../Wysiwyg';
import { useCategoryPages } from '@/lib/category';
import { useReviewPages } from '@/lib/review';

const UpdateModal = ({
  id,
  name,
  cat,
  description,
  before,
  after,
  date,
  time,
  photo,
  speciality,
  experience,
  template,
  open,
}) => {
	const categoryData = useCategoryPages().data;
	const serviceData = useServicePages().data;
	const promoData = usePromoPages().data;
	const portfolioData = usePortfolioPages().data;
	const doctorData = useSpecPages().data;
	const reviewData = useReviewPages().data;

	const categories = categoryData
    ? categoryData.reduce((acc, val) => [...acc, ...val.categories], [])
    : [];
	const services = serviceData
    ? serviceData.reduce((acc, val) => [...acc, ...val.services], [])
    : [];
	const promos = promoData
    ? promoData.reduce((acc, val) => [...acc, ...val.promos], [])
    : [];
  const works = portfolioData
    ? portfolioData.reduce((acc, val) => [...acc, ...val.works], [])
    : [];
	const doctors = doctorData
    ? doctorData.reduce((acc, val) => [...acc, ...val.doctors], [])
    : [];
	const reviews = reviewData
    ? reviewData.reduce((acc, val) => [...acc, ...val.reviews], [])
    : [];

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(!open ? false : true);
  }, [open]);
  const closeModalHandler = () => {
    setVisible(false);
  };

  const nameRef = useRef(template === 'doctor' ? doctors[id].name : null);
  const categoryRef = useRef();
  const previewRef = useRef();
  const oldPreviewRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const beforeRef = useRef();
  const afterRef = useRef();
  const oldBeforeRef = useRef();
  const oldAfterRef = useRef();

  const specialityRef = useRef();
  const experienceRef = useRef();

  const promoDescriptionRef = useRef();
  const promoDateRef = useRef();
  const promoTimeRef = useRef();

  const [category, setCategory] = useState(cat);
  const [promoDate, setDate] = useState(date);
  const [promoTime, setTime] = useState(time);

  const [descriptionState, setDescriptionState] = useState(() =>
    EditorState.createEmpty()
  );
  const [priceState, setPriceState] = useState(() => EditorState.createEmpty());

  const { serviceMutate } = useServicePages();
  const { promoMutate } = usePromoPages();
  const { portfolioMutate } = usePortfolioPages();
  const { doctorMutate } = useSpecPages();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (template === 'promo') {
        setDate(promoDateRef.current.value);
        setTime(promoTimeRef.current.value);
      }
      try {
        let formData = new FormData();

        if (template === 'service') {
          const translite = tr(nameRef.current.value);
          const slug = slugify(translite);

          formData.append('itemId', id);
          formData.append('slug', slug);
          formData.append('name', nameRef.current.value);
          formData.append('categoryId', categoryRef.current.value);
          if (previewRef.current.files && previewRef.current.files[0]) {
            formData.append('preview', previewRef.current.files[0]);
          } else {
            formData.append('oldimage', oldPreviewRef.current.value);
          }
          formData.append('description', descriptionRef.current.value);
          formData.append('price', priceRef.current.value);
        }
        if (template === 'promo') {
          formData.append('itemId', id);
          formData.append('title', nameRef.current.value);
          formData.append('subtitle', promoDescriptionRef.current.value);
          if (previewRef.current.files && previewRef.current.files[0]) {
            formData.append('preview', previewRef.current.files[0]);
          } else {
            formData.append('oldimage', oldPreviewRef.current.value);
          }
          formData.append('date', promoDateRef.current.value);
          formData.append('time', promoTimeRef.current.value);
        }
        if (template === 'portfolio') {
          formData.append('title', nameRef.current.value);
          if (beforeRef.current.files[0]) {
            formData.append('workbefore', beforeRef.current.files[0]);
          } else {
            formData.append('oldbefore', oldBeforeRef.current.value);
          }
          if (afterRef.current.files[0]) {
            formData.append('workafter', afterRef.current.files[0]);
          } else {
            formData.append('oldafter', oldAfterRef.current.value);
          }
        }
        if (template === 'doctor') {
          const translite = tr(nameRef.current.value);
          const slug = slugify(translite);

          formData.append('itemId', id);
          formData.append('slug', slug);
          formData.append('name', nameRef.current.value);
          formData.append('speciality', specialityRef.current.value);
          formData.append('experience', experienceRef.current.value);
          formData.append('education', descriptionRef.current.value);
          if (previewRef.current.files[0]) {
            formData.append('preview', previewRef.current.files[0]);
          } else {
            formData.append('oldimage', oldPreviewRef.current.value);
          }
        }

        const res = await fetch(
          `/api/${
            template === 'service'
              ? 'services'
              : template === 'promo'
              ? 'promos'
              : template === 'portfolio'
              ? 'works'
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
        template === 'service'
          ? serviceMutate
          : template === 'promo'
          ? promoMutate
          : template === 'portfolio'
          ? portfolioMutate
          : template === 'doctor'
          ? doctorMutate
          : null;

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
    [
      serviceMutate,
      promoMutate,
      portfolioMutate,
      doctorMutate,
      id,
      name,
      template,
    ]
  );

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
                          label={
                            template === 'service'
                              ? 'Название услуги'
                              : template === 'promo'
                              ? 'Название акции'
                              : template === 'portfolio'
                              ? 'Название работы'
                              : template === 'doctor'
                              ? 'Имя врача (ФИО)'
                              : null
                          }
                          placeholder={name}
                        />
                        {template === 'portfolio' ? (
                          <>
                            <input
                              type='hidden'
                              ref={oldBeforeRef}
                              value={before}
                            />
                            <input
                              type='hidden'
                              ref={oldAfterRef}
                              value={after}
                            />
                            <div className={styles.inputColumn}>
                              <label htmlFor='before'>До</label>
                              <input
                                id='before'
                                ref={beforeRef}
                                type='file'
                                name='workbefore'
                                placeholder='До'
                              />
                            </div>
                            <div className={styles.inputColumn}>
                              <label htmlFor='after'>После</label>
                              <input
                                id='after'
                                ref={afterRef}
                                type='file'
                                name='workafter'
                                placeholder='После'
                              />
                            </div>
                          </>
                        ) : null}
                        {template === 'promo' ? (
                          <>
                            <Textarea
                              ref={promoDescriptionRef}
                              label={'Описание акции'}
                              placeholder={description}
                            />
                            <Input
                              ref={promoDateRef}
                              type='date'
                              placeholder={promoDate}
                              label='Дата'
                            />
                            <Input
                              ref={promoTimeRef}
                              type='time'
                              placeholder={promoTime}
                              label='Время'
                            />
                          </>
                        ) : null}
                      </div>
                      {template === 'doctor' ? (
                        <>
                          <div className={styles.inputColumn}>
                            <Input
                              ref={experienceRef}
                              type={'text'}
                              label={'Опыт врача'}
                              placeholder={experience}
                            />
                          </div>
                          <div className={styles.inputColumn}>
                            <Input
                              ref={specialityRef}
                              type={'text'}
                              label={'Специальность'}
                              placeholder={speciality}
                            />
                          </div>
                        </>
                      ) : null}
                      {!template === 'portfolio' ||
                      !template === 'review' ||
                      template === 'doctor' ? (
                        <div className={styles.inputColumn}>
                          <input
                            type='hidden'
                            ref={oldPreviewRef}
                            value={photo}
                          />
                          <label for='previewinput'>
                            Изображение{' '}
                            {template === 'service'
                              ? 'услуги'
                              : template === 'promo'
                              ? 'акции'
                              : null}
                          </label>
                          <input
                            id='previewinput'
                            ref={previewRef}
                            type={'file'}
                            placeholder={'Изображение'}
                          />
                        </div>
                      ) : null}
                    </div>
                    {template === 'service' ? (
                      <>
                        <input
                          type='hidden'
                          value={category}
                          ref={categoryRef}
                        />
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
                      </>
                    ) : null}
                  </div>
                  {template === 'service' || template === 'doctor' ? (
                    <>
                      <div>
                        <p className={styles.blockTitle}>
                          {template === 'service'
                            ? 'Описание услуги'
                            : template === 'doctor'
                            ? 'Образование врача'
                            : null}
                        </p>
                        <Wysiwyg
                          state={descriptionState}
                          setState={setDescriptionState}
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
                      {template === 'service' ? (
                        <div>
                          <p className={styles.blockTitle}>Прайс-лист</p>
                          <Wysiwyg
                            state={priceState}
                            setState={setPriceState}
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
                      ) : null}
                    </>
                  ) : null}
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
