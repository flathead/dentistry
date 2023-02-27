import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import { CssBaseline } from '@nextui-org/react';
import siteMetadata from 'data/siteMetadata';
import { links } from '@/components/Layout/Nav';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    const jsonLD_Website = () => {
      return {
        __html: `
			{
				"@context": "http://www.schema.org",
				"@type": "WebSite",
				"name": "${siteMetadata.companyName.toString()}",
				"url": "${siteMetadata.siteUrl.toString()}"
			}
			`,
      };
    };
    const jsonLD_Organization = () => {
      return {
        __html: `
			{
				"@context": "https://schema.org",
				"@type": "MedicalOrganization",
				"name": "${siteMetadata.companyName.toString()}",
				"alternateName": "Центр экспертной стоматологии «Стоматология на Демонстрации»",
				"url": "${siteMetadata.siteUrl.toString()}",
				"logo": "https://dent-71.ru/logo_social.png",
				"contactPoint": [{
				  "@type": "ContactPoint",
				  "telephone": "${siteMetadata.phoneNumber.toString()}",
				  "contactType": "reservations",
				  "contactOption": ["TollFree","HearingImpairedSupported"],
				  "areaServed": "RU",
				  "availableLanguage": "Russian"
				},{
				  "@type": "ContactPoint",
				  "telephone": "${siteMetadata.phoneNumber2.toString()}",
				  "contactType": "customer service",
				  "contactOption": ["TollFree","HearingImpairedSupported"],
				  "areaServed": "RU",
				  "availableLanguage": "Russian"
				}],
				"sameAs": "https://vk.com/familystomtula"
			  }		  
			`,
      };
    };
    let linksArray = [];
    let i = 1;
    links.forEach((link) => {
      linksArray.push({
        '@type': 'SiteNavigationElement',
        position: `${i++}`,
        name: `${link.name}`,
        url: `${link.url}`,
      });
    });
    const jsonLD_Links = () => {
      return {
        __html: `
			{
				"@context":"http://schema.org",
				"@type":"ItemList",
				"itemListElement": ${JSON.stringify(linksArray)}
			}
		`,
      };
    };
    return (
      <Html lang='ru'>
        <Head>
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={jsonLD_Website()}
            key='item-jsonld'
          />
          <script
            type='application/ld+json'
            key='item-jsonld'
            dangerouslySetInnerHTML={jsonLD_Organization()}
          />
          <script
            type='application/ld+json'
            key='item-jsonld'
            dangerouslySetInnerHTML={jsonLD_Links()}
          />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&amp;display=swap'
            rel='stylesheet'
          />
          <link
            href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css'
            rel='stylesheet'
          />
          {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
