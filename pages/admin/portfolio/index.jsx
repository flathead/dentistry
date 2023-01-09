import { HeadSEO } from '@/components/Layout';
import PortfolioComponent from '@/page-components/Dashboard/PortfolioPage';

const AdminPortfolio = () => {
  return (
    <>
      <HeadSEO title={'Портфолио [ЦЕНТР]'} />
      <PortfolioComponent />
    </>
  );
};

export default AdminPortfolio;
