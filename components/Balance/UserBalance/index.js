import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import BalanceItem from './BalanceItem';

import { wrapper, error, loading } from './index.scss';

const UserBalance = memo(({ symbol }) => {
  const { icx, token } = useSelector(state => state.wallet);

  const renderItem = (name, target) => {
    if (target.isProceeding) {
      return (
        <li>
          <div>{name}</div>
          <div style={{ width: '80%' }} className={loading}>
            <i className='material-icons'>rotate_right</i>
          </div>
        </li>
      );
    } else if (target.error) {
      return (
        <li>
          <div>{name}</div>
          <div style={{ width: '80%' }} className={error}>
            {target.error}
          </div>
        </li>
      );
    } else {
      return (
        <BalanceItem
          symbol={name}
          deposited={target.data.deposited}
          undeposited={target.data.undeposited}
        />
      );
    }
  };

  return (
    <ul className={wrapper}>
      <li>
        <div>name</div>
        <div>wallet</div>
        <div>score</div>
      </li>
      {renderItem('ICX', icx)}
      {renderItem(symbol, token)}
    </ul>
  );
});

export default UserBalance;
