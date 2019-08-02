import React from 'react';
import { useSelector } from 'react-redux';

import BalanceForm from '../../components/Balance/BalanceForm';
import UserBalance from '../../components/Balance/UserBalance';

import { wrapper } from './index.scss';

const Balance = ({ symbol }) => {
  const { address, icx, token } = useSelector(state => state.wallet);
  const currentToken = useSelector(state => state.token.currentToken);

  return (
    <div className={wrapper}>
      <BalanceForm
        address={address}
        token={currentToken}
        icxBalance={icx && icx.data}
        tokenBalance={token && token.data}
      />
      <UserBalance symbol={symbol} icx={icx} token={token} />
    </div>
  );
};

export default Balance;
