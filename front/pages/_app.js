import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import axios from 'axios';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import Layout from '../components/Layout';
import store from '../redux/store';

const title = ' icondelta ';
const url = 'https://www.icondelta.ga';
const description = 'Decentralized Exchange on ICON Network';

class IconDelta extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    if (ctx.isServer && cookie) {
      axios.defaults.headers.cookie = cookie;
      axios.defaults.withCredentials = true;
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Helmet
          title='icondelta'
          meta={[
            { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
            { name: 'title', content: title },
            { name: 'description', content: description },
            { name: 'twitter:site', content: url },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: url },
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
      </Container>
    );
  }
}

export default withRedux(store)(withReduxSaga(IconDelta));
