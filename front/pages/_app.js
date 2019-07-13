import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Layout from '../components/Layout';
import axios from 'axios';

const IconDelta = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

IconDelta.getInitialProps = async ({ ctx, Component }) => {
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
};

export default withRedux(store)(withReduxSaga(IconDelta));
