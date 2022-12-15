import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import { fetcher } from '@/lib/fetch';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ForgetPassword.module.css';

const NewPassword = ({ token }) => {
  const passwordRef = useRef();
  // 'loading' | 'success'
  const [status, setStatus] = useState();
  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setStatus('loading');
      try {
        await fetcher('/api/user/password/reset', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            password: passwordRef.current.value,
          }),
        });
        setStatus('success');
      } catch (e) {
        toast.error(e.message);
        setStatus(undefined);
      }
    },
    [token]
  );
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Сброс пароля</h1>
      {status === 'success' ? (
        <>
          <p className={styles.subtitle}>Ваш пароль успешно обновлён.</p>
        </>
      ) : (
        <>
          <p className={styles.subtitle}>
            Введите новый пароль для вашего аккаунта
          </p>
          <Spacer size={1} />
          <form onSubmit={onSubmit}>
            <Input
              ref={passwordRef}
              htmlType='password'
              autoComplete='new-password'
              placeholder='Новый пароль'
              ariaLabel='Новый пароль'
              size='large'
              required
            />
            <Spacer size={0.5} axis='vertical' />
            <Button
              htmlType='submit'
              className={styles.submit}
              type='success'
              size='large'
            >
              Сбросить пароль
            </Button>
          </form>
        </>
      )}
      <Spacer size={0.25} axis='vertical' />
      <ButtonLink
        href='/login'
        passHref
        type='success'
        size='large'
        variant='ghost'
      >
        Вернуться к авторизации
      </ButtonLink>
    </div>
  );
};

const BadLink = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Invalid Link</h1>
      <p className={styles.subtitle}>
        Кажется, ссылка по которой вы перешли, больше недействительна.
        Пожалуйста, закройте эту вкладку и попробуйте снова.
      </p>
      <Spacer size={1} />
      <ButtonLink
        href='/login'
        passHref
        type='success'
        size='large'
        variant='ghost'
      >
        Вернуться к авторизации
      </ButtonLink>
    </div>
  );
};

const ForgetPasswordToken = ({ valid, token }) => {
  return (
    <Wrapper className={styles.root}>
      {valid ? <NewPassword token={token} /> : <BadLink />}
    </Wrapper>
  );
};

export default ForgetPasswordToken;
