import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import App, { Container } from 'next/app';

import store from '../redux/store';
import Layout from '../components/Layout';

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
