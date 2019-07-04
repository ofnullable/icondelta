import React from 'react';

import HomeContainer from '../containers/Home';
import AT from '../redux/actionTypes';

import '../styles/index.scss';

const Home = ({}) => {
  return <HomeContainer />;
};

Home.getInitialProps = async context => {
  // TODO: Load user balance,
  const token = context.query.symbol;
  context.store.dispatch({
    type: AT.LOAD_BALANCE_REQUEST,
    address: '',
    token,
  });
  return { token };
};

export default Home;
