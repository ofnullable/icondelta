import React from 'react';
import { useSelector } from 'react-redux';

import BalanceForm from '../../components/Balance/BalanceForm';
import UserBalance from '../../components/Balance/UserBalance';

import { wrapper } from './index.scss';

const Balance = () => {
  const { address, icx, token } = useSelector(state => state.wallet);
  const currentToken = useSelector(state => state.token.currentToken);

  return (
    <div className={wrapper}>
      <BalanceForm address={address} token={currentToken} />
      <UserBalance currentToken={currentToken} icx={icx} token={token} />
    </div>
  );
};

export default Balance;
