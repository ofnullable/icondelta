import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';

export default class CustomDocument extends Document {
  static getInitialProps(context) {
    const page = context.renderPage(App => props => <App {...props} />);
    return { ...page, helmet: Helmet.renderStatic() };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>{Object.values(helmet).map(elem => elem.toComponent())}</head>
        <body {...bodyAttrs}>
          <Main /> {/* <=> _app.js */}
          {process.env.NODE_ENV === 'production' && (
            <script src='https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated' />
          )}
          <NextScript />
        </body>
      </html>
    );
  }
}
