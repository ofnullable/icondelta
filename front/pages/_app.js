import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';

import AT from '../redux/actionTypes';
import store from '../redux/store';
import Layout from '../components/Layout';

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
  const { req, res } = ctx;
  const state = ctx.store.getState();

  if (req.url === '/') {
    res.writeHead(302, { Location: '/AC3' });
    res.end();
  }

  if (!state.wallet.address) {
    ctx.store.dispatch({
      type: AT.LOAD_ADDRESS_REQUEST,
    });
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default withRedux(store)(withReduxSaga(IconDelta));
