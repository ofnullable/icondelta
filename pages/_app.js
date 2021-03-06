import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import store from '../redux/store';
import Layout from '../components/Layout';

import '../styles/index.scss';

const title = ' icondelta ';
const url = 'https://www.icondelta.ga';
const image = '/static/images/preview.png';
const description = 'Decentralized Exchange on ICON Network';

class IconDelta extends App {
  //   static async getInitialProps(appContext) {
  //     // calls page's `getInitialProps` and fills `appProps.pageProps`
  //     const appProps = await App.getInitialProps(appContext);
  //     return { ...appProps };
  //   }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Helmet
          title='icondelta'
          meta={[
            { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
            { name: 'title', content: title },
            { name: 'description', content: description },
            { name: 'twitter:site', content: url },
            { name: 'twitter:image', content: url + image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: url },
            { property: 'og:image', content: url + image },
          ]}
          link={[
            { rel: 'icon', href: '/static/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            { rel: 'stylesheet', href: 'https://unpkg.com/firacode@1.206.0/distr/fira_code.css' },
          ]}
        />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
}

export default withRedux(store)(withReduxSaga(IconDelta));
