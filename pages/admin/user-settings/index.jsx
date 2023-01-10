// const { HeadSEO } = require('@/components/Layout');
// import { Button } from '@/components/Button';
// import { Input } from '@/components/Input';
// import { Container, Spacer, Wrapper } from '@/components/Layout';
// import { useCurrentUser } from '@/lib/user';
// import { Text } from '@nextui-org/react';
// import { useRouter } from 'next/router';
// import { useCallback, useRef, useState } from 'react';
// import toast from 'react-hot-toast';
// import AdminMenu from '@/page-components/Dashboard/AdminMenu';
// import styles from '../../../page-components/Auth/Auth.module.css';

const AdminUsersPage = () => {
  //   const emailRef = useRef();
  //   const passwordRef = useRef();
  //   const usernameRef = useRef();
  //   const nameRef = useRef();

  //   const { mutate } = useCurrentUser();

  //   const [isLoading, setIsLoading] = useState(false);

  //   const router = useRouter();

  //   const onSubmit = useCallback(
  //     async (e) => {
  //       e.preventDefault();
  //       try {
  //         setIsLoading(true);
  //         const response = await fetch('/api/users', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             email: emailRef.current.value,
  //             name: nameRef.current.value,
  //             password: passwordRef.current.value,
  //             username: usernameRef.current.value,
  //           }),
  //         });
  //         mutate({ user: response.user }, false);
  //         toast.success('Вы успешно создали аккаунт!');
  //         router.push('/admin');
  //       } catch (e) {
  //         toast.error(e.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     },
  //     [mutate, router]
  //   );
  return (
    <>
      {/* <HeadSEO title={'Регистрация пользователя'} />
      <Wrapper className={styles.root}>
        <AdminMenu />
        <div className={styles.main}>
          <form onSubmit={onSubmit}>
            <h1 className={styles.title}>Регистрация пользователя</h1>
            <Container alignItems='center'>
              <p className={styles.subtitle}>Логин</p>
              <div className={styles.seperator} />
            </Container>
            <Input
              ref={emailRef}
              htmlType='email'
              autoComplete='email'
              placeholder='Email'
              ariaLabel='Email'
              size='large'
              required
            />
            <Spacer size={0.5} axis='vertical' />
            <Input
              ref={passwordRef}
              htmlType='password'
              autoComplete='new-password'
              placeholder='Пароль'
              ariaLabel='Пароль'
              size='large'
              required
            />
            <Spacer size={0.75} axis='vertical' />
            <Container alignItems='center'>
              <p className={styles.subtitle}>О пользователе</p>
              <div className={styles.seperator} />
            </Container>
            <Input
              ref={usernameRef}
              autoComplete='username'
              placeholder='Никнейм (англ.)'
              ariaLabel='Никнейм (англ.)'
              size='large'
              required
            />
            <Spacer size={0.5} axis='vertical' />
            <Input
              ref={nameRef}
              autoComplete='name'
              placeholder='Имя пользователя'
              ariaLabel='Имя пользователя'
              size='large'
              required
            />
            <Spacer size={1} axis='vertical' />
            <Button
              htmlType='submit'
              className={styles.submit}
              type='success'
              size='large'
              loading={isLoading}
            >
              Зарегистрировать
            </Button>
          </form>
        </div>
        <div className={styles.footer}>
          <Text size={14}>
            Данный компонент позволяет зарегистрировать нового администратора
          </Text>
        </div>
      </Wrapper> */}
    </>
  );
};

export default AdminUsersPage;