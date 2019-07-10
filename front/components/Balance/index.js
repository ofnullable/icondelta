import React from 'react';
import { useSelector } from 'react-redux';

import BalanceForm from '../../components/Balance/BalanceForm';
import UserBalance from '../../components/Balance/UserBalance';

import { wrapper } from './index.scss';

const Balance = () => {
  const address = useSelector(state => state.wallet.address);
  const currentToken = useSelector(state => state.token.currentToken.data);
  const deposited = useSelector(state => state.wallet.deposited);
  const undeposited = useSelector(state => state.wallet.undeposited);

  return (
    <div className={wrapper}>
      <BalanceForm address={address} token={currentToken} />
      <UserBalance token={currentToken} deposited={deposited} undeposited={undeposited} />
    </div>
  );
};

export default Balance;
