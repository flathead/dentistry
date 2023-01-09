import { Wrapper } from '@/components/Layout';
import { Promo } from '@/components/Promo';
import { Title } from '@/components/Title';
import { Spacer } from '@/components/Layout';
import { Doctors } from '@/components/Doctors';
import { Consultation } from '@/components/Consultation';
import { MapComponent } from '@/components/Map';
import ReviewList from '../Reviews/ReviewList';

const PromoPage = () => {
  return (
    <>
      <Wrapper>
        <Title size={1} template='pageTitle' center>
          <b>Акции</b> клиники
        </Title>
        <Promo />
        <Spacer size={4} />
        <Title template='pageTitle' size={2} center>
          Команда <b>профессионалов</b>
        </Title>
        <Doctors />
        <Spacer size={2} />
        <ReviewList
          template={'slider'}
          title={
            <>
              <b>Отзывы</b> наших пациентов
            </>
          }
        />
      </Wrapper>
      <Consultation />
      <Spacer size={4} />
      <Wrapper>
        <Title size={2} template='pageTitle'>
          <b>Контактная</b> информация
        </Title>
      </Wrapper>
      <MapComponent template='homepage' />
    </>
  );
};

export default PromoPage;
