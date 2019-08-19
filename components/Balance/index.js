import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import BalanceForm from '../../components/Balance/BalanceForm';
import UserBalance from '../../components/Balance/UserBalance';

import { wrapper } from './index.scss';

const Balance = memo(({ symbol }) => {
  const currentToken = useSelector(state => state.token.currentToken);

  return (
    <div className={wrapper}>
      <BalanceForm />
      <UserBalance symbol={symbol} />
    </div>
  );
});

export default Balance;
