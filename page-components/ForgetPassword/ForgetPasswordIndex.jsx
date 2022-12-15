import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import { Text } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ForgetPassword.module.css';

const ForgetPasswordIndex = () => {
  const emailRef = useRef();
  // 'loading' || 'success'
  const [status, setStatus] = useState();
  const [email, setEmail] = useState('');
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      await fetcher('/api/user/password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      });
      setEmail(emailRef.current.value);
      setStatus('success');
    } catch (e) {
      toast.error(e.message);
      setStatus(undefined);
    }
  }, []);

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        {status === 'success' ? (
          <>
            <h1 className={styles.title}>Проверьте вашу почту</h1>
            <p className={styles.subtitle}>
              Письмо отправлено на{' '}
              <Text as='span' color='link'>
                {email}
              </Text>
              . Пожалуйста, пройдите по ссылке в письме чтобы сбросить пароль.
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Восстановление пароля</h1>
            <p className={styles.subtitle}>
              Введите Email, который был указан при регистрации на сайте и мы
              отправим вам ссылку для сброса пароля.
            </p>
            <Spacer size={1} />
            <form onSubmit={onSubmit}>
              <Input
                ref={emailRef}
                htmlType='email'
                autoComplete='email'
                placeholder='Ваш Email'
                ariaLabel='Ваш Email'
                size='large'
                required
              />
              <Spacer size={0.5} axis='vertical' />
              <Button
                htmlType='submit'
                className={styles.submit}
                type='success'
                size='large'
                loading={status === 'loading'}
              >
                Продолжить
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
          Войти
        </ButtonLink>
      </div>
    </Wrapper>
  );
};

export default ForgetPasswordIndex;
