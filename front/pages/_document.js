import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, helmet: Helmet.renderStatic() };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <Html {...htmlAttrs}>
        <Head>{Object.values(helmet).map(h => h.toComponent())}</Head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
