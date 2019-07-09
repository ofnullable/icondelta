import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Balance from '../../components/Balance';
import UserBalance from '../../components/UserBalance';
import AT from '../../redux/actionTypes';

const BalanceContainer = () => {
  const currentToken = useSelector(state => state.token.currentToken.data);
  const deposited = useSelector(state => state.wallet.deposited);
  const undeposited = useSelector(state => state.wallet.undeposited);

  return (
    <div>
      <Balance token={currentToken} />
      <UserBalance token={currentToken} deposited={deposited} undeposited={undeposited} />
    </div>
  );
};

export default BalanceContainer;
