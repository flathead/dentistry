import { Container, Wrapper } from '@/components/Layout';
import { Title } from '@/components/Title';
import { Reviews } from '../Reviews';
import Image from 'next/image';
import AddReview from '../Reviews/AddReview';
import styles from './ReviewPage.module.scss';
import { MapComponent } from '@/components/Map';

const ReviewsPage = () => {
  return (
    <>
      <Container fullwidth className={styles.offer}>
        <div className={styles.information}>
          <Title size={1}>
            Оставьте свой <b>отзыв</b>
          </Title>
          <p className={styles.offerSubtitle}>
            Для нас очень важен отзыв о лечении зубов каждого нашего пациента!
          </p>
          <p className={styles.offerSubtitle}>
            Напишите нам в удобной для Вас форме Ваше мнение, благодарность или
            жалобу. Мы обязательно отреагируем на Ваш вопрос!
          </p>
          <ul className={styles.offerBenefits}>
            <li className={styles.offerBenefit}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672051449/Group_111_ygcfrf.png'
                alt='Точка'
                width={34}
                height={34}
              />
              Ценим Ваше мнение
            </li>
            <li className={styles.offerBenefit}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672051449/Group_111_ygcfrf.png'
                alt='Точка'
                width={34}
                height={34}
              />
              Быстро реагируем на вопросы
            </li>
            <li className={styles.offerBenefit}>
              <Image
                src='https://res.cloudinary.com/dv3q1dxpi/image/upload/v1672051449/Group_111_ygcfrf.png'
                alt='Точка'
                width={34}
                height={34}
              />
              Предложим пути решения
            </li>
          </ul>
        </div>
        <div className={styles.addReview}>
          <AddReview template='form' />
        </div>
      </Container>
      <Reviews />
      <Wrapper>
        <Title size={2} template='pageTitle'>
          <b>Контактная</b> информация
        </Title>
      </Wrapper>
      <MapComponent template={'homepage'} />
    </>
  );
};

export default ReviewsPage;
