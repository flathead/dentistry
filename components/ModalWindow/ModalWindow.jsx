/* eslint-disable no-unused-vars */
import { sendMsg } from '@/lib/telegram';
import { Button, Input, Text, Modal, useInput } from '@nextui-org/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Phone, User } from 'react-feather';
import toast from 'react-hot-toast';

const ModalWindow = ({ open }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const nameRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    setModalVisible(!open ? false : true);
  }, [open]);

  const modalCloseHandler = () => {
    setModalVisible(false);
  };

  const modalSendHandler = () => {
    sendMsg(
      `📞 <b>Заявка на обратный звонок!</b>%0A%0AИмя: ${nameRef.current.value}%0AТелефон: ${phoneRef.current.value}%0A%0AОтправлено со страницы:%0A${window.location.href}`
    );
    localStorage.setItem('username', nameRef.current.value);
    localStorage.setItem('userphone', phoneRef.current.value);
    let userName = '',
      userPhone = '';
    localStorage.getItem('username')
      ? (userName = localStorage.getItem('username'))
      : null;
    localStorage.getItem('userphone')
      ? (userPhone = localStorage.getItem('userphone'))
      : null;
    toast.success(
      `Спасибо${
        userName ? ', ' + userName + '! ' : '! '
      }Ваша заявка отправлена.`
    );
    setModalVisible(false);
    nameRef.current.value = '';
    phoneRef.current.value = '';
  };

  const { value, reset, bindings } = useInput('');

  const validatePhone = (value) => {
    return value.match(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/i);
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: '',
        color: '',
        disabled: false,
      };
    const isValid = validatePhone(value);
    return {
      text: isValid ? 'Корректный номер' : 'Введите корректный номер',
      color: isValid ? 'success' : 'error',
      disabled: isValid ? false : true,
    };
  }, [value]);
  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={modalVisible}
      onClose={modalCloseHandler}
    >
      <Modal.Header>
        <Text id='modal-title' size={18}>
          Заявка{' '}
          <Text b size={18}>
            на обратный звонок
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color='primary'
          size='lg'
          placeholder='Ваше имя'
          type='text'
          ref={nameRef}
          contentLeft={<User />}
        />
        <Input
          {...bindings}
          onClearClick={reset}
          status={helper.color}
          color={helper.color}
          helperColor={helper.color}
          helperText={helper.text}
          clearable
          bordered
          fullWidth
          size='lg'
          placeholder='Ваш телефон'
          type='tel'
          ref={phoneRef}
          contentLeft={<Phone />}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color='error' onClick={modalCloseHandler}>
          Закрыть
        </Button>
        <Button auto onClick={modalSendHandler}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
