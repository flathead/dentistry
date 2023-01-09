import { ButtonDent } from '@/components/Button/Button';
import { useRouter } from 'next/router';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.errorTitle}>404</h1>
        <p className={styles.errorSubtitle}>Страница не найдена</p>
        <ButtonDent color={'blue'} onClick={() => router.push('/')}>
          На главную
        </ButtonDent>
      </div>
    </div>
  );
};

export default NotFoundPage;
