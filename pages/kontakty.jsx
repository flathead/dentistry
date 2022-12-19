import { HeadSEO } from '@/components/Layout';
import { ContactPage } from '@/page-components/ContactPage';

const Contact = () => {
  return (
    <>
      <HeadSEO
        title={'Контакты — Стоматология на Демонстрации'}
        canonicalUrl='https://dent-71.ru/kontakty'
        description={
          'Как нас найти, куда позвонить и где мы находимся — вся информация о нас на одной странице. Наша миссия – сделать современную стоматологию доступной для всех.'
        }
        ogImageUrl={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/c_scale,q_60,w_1200/v1671414812/og/concessional-prescriptions_taxrw5.webp'
        }
        ogTwitterImage={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/c_scale,q_60,w_1200/v1671414812/og/concessional-prescriptions_taxrw5.webp'
        }
      />
      <ContactPage />
    </>
  );
};

export default Contact;
