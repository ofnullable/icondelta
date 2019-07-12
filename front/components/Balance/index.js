import React from 'react';
import { useSelector } from 'react-redux';

import BalanceForm from '../../components/Balance/BalanceForm';
import UserBalance from '../../components/Balance/UserBalance';

import { wrapper } from './index.scss';

const Balance = () => {
  const { address, deposited, undeposited } = useSelector(state => state.wallet);
  const token = useSelector(state => state.token.currentToken.data);

  return (
    <div className={wrapper}>
      <BalanceForm address={address} token={token} />
      <UserBalance token={token} deposited={deposited} undeposited={undeposited} />
    </div>
  );
};

export default Balance;
