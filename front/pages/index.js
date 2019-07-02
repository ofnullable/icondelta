import React from 'react';

import HomeContainer from '../containers/Home/HomeContainer';
import AT from '../redux/actionTypes';

import '../styles/index.scss';

const Home = ({}) => {
  return <HomeContainer />;
};

Home.getInitialProps = async context => {
  console.log('context - query', context.query);
  context.store.dispatch({
    type: AT.LOAD_BALANCE_REQUEST,
    token: context.query.symbol,
  });
};

export default Home;
