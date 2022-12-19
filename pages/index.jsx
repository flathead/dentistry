import { HeadSEO } from '@/components/Layout';
import Index from '@/page-components/Index/IndexPage';
import siteMetadata from 'data/siteMetadata';

export default function IndexPage() {
  return (
    <>
      <HeadSEO
        title={`Стоматология на Демонстрации`}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={'website'}
      />
      <Index />
    </>
  );
}
