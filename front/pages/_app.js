import React from 'react';
import Helmet from 'react-helmet';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';
import Layout from '../components/Layout';

const IconDelta = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Helmet
        title='icondelta'
        htmlAttributes={{ lang: 'ko' }}
        meta={[
          { charSet: 'UTF-8' },
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
          { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
          {
            name: 'description',
            content: ' Decentralized Exchange on ICON Network ',
          },
          { name: 'og:title', content: 'icondelta' },
          {
            name: 'og:description',
            content: ' Decentralized Exchange on ICON Network ',
          },
          { property: 'og:type', content: 'website' },
        ]}
        link={[
          { rel: 'shortcut icon', href: '/static/favicon.ico' },
          {
            rel: 'stylesheet',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          },
          {
            rel: 'stylesheet',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          },
          {
            rel: 'stylesheet',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css',
          },
        ]}
        script={[
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.js',
          },
        ]}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

IconDelta.getInitialProps = async context => {
  const { ctx, Component } = context;
  const state = ctx.store.getState();

  if (!state.iconex.address) {
    // TODO: connect server to receive user wallet address
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

const isProd = process.env.NODE_ENV === 'production';

const logger = store => next => action => {
  console.log(action);
  next(action);
};

const storeConfig = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = isProd ? [sagaMiddleware] : [sagaMiddleware, logger];

  const reduxDevtools =
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__;

  const enhancer = isProd
    ? compose(applyMiddleware(...middlewares))
    : compose(
        applyMiddleware(...middlewares),
        reduxDevtools ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      );

  const store = createStore(reducers, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(sagas);
  return store;
};

export default withRedux(storeConfig)(withReduxSaga(IconDelta));
