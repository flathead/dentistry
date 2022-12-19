import Head from 'next/head';
import siteMetadata from 'data/siteMetadata';

const HeadSEO = ({
  title,
  description,
  canonicalUrl,
  ogTwitterImage,
  ogImageUrl,
  ogType,
  children,
}) => {
  return (
    <Head>
      <title>{title || 'Стоматология на Демонстрации'}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta
        name='description'
        content={
          description ||
          'Стоматологическая клиника в городе Тула — «Стоматология на Демонстрации». Наша миссия – сделать современную стоматологию доступной для всех.'
        }
      />
      <meta
        name='keywords'
        content={
          'стоматология, тула, зубной, демонстрации, зубы, зуб, болит, лечение'
        }
      />
      <meta name='twitter:card' content='summary' />
      <meta
        name='twitter:title'
        content={title || 'Стоматология на Демонстрации'}
      />
      <meta
        name='twitter:description'
        content={
          description ||
          'Стоматологическая клиника в городе Тула — «Стоматология на Демонстрации». Наша миссия – сделать современную стоматологию доступной для всех.'
        }
      />
      <meta
        name='twitter:image'
        content={ogTwitterImage || siteMetadata.siteLogoSquare}
      />
      <link rel='canonical' href={canonicalUrl || siteMetadata.siteUrl} />
      <meta property='og:locale' content='ru_RU' />
      <meta property='og:site_name' content={siteMetadata.companyName} />
      <meta property='og:type' content={ogType || 'website'} />
      <meta
        property='og:title'
        content={title || 'Стоматология на Демонстрации'}
      />
      <meta
        property='og:description'
        content={
          description ||
          'Стоматологическая клиника в городе Тула — «Стоматология на Демонстрации». Наша миссия – сделать современную стоматологию доступной для всех.'
        }
      />
      <meta
        property='og:image'
        content={ogImageUrl || siteMetadata.siteLogoSquare}
      />
      <meta property='og:url' content={canonicalUrl || siteMetadata.siteUrl} />
      {children}
    </Head>
  );
};

export default HeadSEO;
