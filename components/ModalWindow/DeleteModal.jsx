import { Button, Card, Modal, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const DeleteModal = ({ id, name, slug, template, open }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(!open ? false : true);
  }, [open]);
  const closeModalHandler = () => {
    setVisible(false);
  };
  const deleteOne = async (id) => {
    const body = {
      serviceId: id,
    };

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
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
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
        }${name ? ' "' + name + '" ' : ' '}удалена!`
      );
    } else {
      toast.error(
        `Ошибка при удалении ${
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

    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={visible}
      onClose={closeModalHandler}
    >
      <Modal.Header>
        <Text id='modal-title' size={18}>
          Удаление{' '}
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
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Card variant='flat'>
            <Card.Body>
              <Text style={{ margin: '0' }}>
                Вы собираетесь <span style={{ color: 'red' }}>удалить</span>{' '}
                {template === 'service'
                  ? 'услугу'
                  : template === 'promo'
                  ? 'акцию'
                  : template === 'portfolio'
                  ? 'работу'
                  : template === 'doctor'
                  ? 'врача'
                  : template === 'review'
                  ? 'отзыв'
                  : null}
                :
                <br />
                <Text b style={{ marginBottom: '0' }} size={20}>
                  &quot;{name}&quot;
                </Text>
              </Text>
            </Card.Body>
          </Card>
        </Row>
        <Row justify='space-between'>
          <Text size={14}>Это действие нельзя отменить.</Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color='primary' onPress={closeModalHandler}>
          Отменить
        </Button>
        <Button
          auto
          color='error'
          data-id={id}
          data-name={name}
          onPress={() => deleteOne(id, name, slug)}
        >
          УДАЛИТЬ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
