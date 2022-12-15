import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import { TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isValidating) return;
    if (user) router.replace('/feed');
  }, [user, router, isValidating]);

  const onSubmit = useCallback(
    async (event) => {
      setIsLoading(true);
      event.preventDefault();
      try {
        const response = await fetcher('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success('Вы успешно авторизованы.');
      } catch (e) {
        toast.error(
          'Неправильный логин или пароль. Администраторы предупреждены о попытке входа.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>Авторизация</h1>
        <form onSubmit={onSubmit}>
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
            autoComplete='current-password'
            placeholder='Пароль'
            ariaLabel='Пароль'
            size='large'
            required
          />
          <Spacer size={0.5} axis='vertical' />
          <Button
            htmlType='submit'
            className={styles.submit}
            type='success'
            size='large'
            loading={isLoading}
          >
            Войти
          </Button>
          <Spacer size={0.25} axis='vertical' />
          <ButtonLink
            href='/forget-password'
            passHref
            type='success'
            size='large'
            variant='ghost'
          >
            Забыли пароль?
          </ButtonLink>
        </form>
      </div>
      <div className={styles.footer}>
        <TextLink href='/sign-up' passHref color='link' variant='highlight'>
          Нет аккаунта? Зарегистрируйтесь!
        </TextLink>
      </div>
    </Wrapper>
  );
};

export default Login;
