import { HeadSEO } from '@/components/Layout';
import { StaffPage } from '@/page-components/StaffPage';

const Staff = () => {
  return (
    <>
      <HeadSEO
        title='Все врачи Стоматологии на Демонстрации'
        description='Высококлассные специалисты Стоматологии на Демонстрации в городе Тула с большим опытом и стажем работы окажут самую качественную стоматологическую помощь!'
        ogImageUrl={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/ar_1:1,c_fill,g_auto,h_1000,w_1000/v1670692655/about(team)/IMG_2995_kiripv.jpg'
        }
        ogTwitterImage={
          'https://res.cloudinary.com/dv3q1dxpi/image/upload/ar_1:1,c_fill,g_auto,h_1000,w_1000/v1670692655/about(team)/IMG_2995_kiripv.jpg'
        }
      />
      <StaffPage />
    </>
  );
};

export default Staff;
