import { HeadSEO } from '@/components/Layout';
import { ReviewsPage } from '@/page-components/ReviewsPage';

const Otzyvy = () => {
  return (
    <>
      <HeadSEO
        title='Отзывы о нашей клинике'
        description='Что пишут о нас наши пациенты - честное мнение каждого на странице отзывов. Были у нас? Оставьте отзыв и Вы!'
        canonicalUrl={'https://dent-71.ru/otzyvy'}
      />
      <ReviewsPage />
    </>
  );
};

export default Otzyvy;
