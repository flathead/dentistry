import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { Text } from '@/components/Text';
import styles from './VerifyEmail.module.css';

export const VerifyEmail = ({ valid }) => {
  return (
    <Wrapper className={styles.root}>
      <Container column alignItems='center'>
        <Text
          className={styles.text}
          color={valid ? 'success-light' : 'secondary'}
        >
          {valid
            ? 'Спасибо что подтвердили свой Email!'
            : 'Кажется, ссылка больше недействительна :('}
        </Text>
        <p>
          {valid
            ? 'Теперь Вы можете выйти с этой страницы.'
            : 'Пожалуйста, подтвердите почту заново.'}
        </p>
        <Spacer size={4} axis='vertical' />
        <ButtonLink
          href='/'
          passHref
          variant='ghost'
          type='success'
          size='large'
        >
          Вернуться на домашнюю страницу
        </ButtonLink>
      </Container>
    </Wrapper>
  );
};
