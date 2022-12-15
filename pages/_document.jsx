import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html lang='ru'>
        <Head>
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
