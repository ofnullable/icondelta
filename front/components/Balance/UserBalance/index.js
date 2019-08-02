import React from 'react';

import { wrapper, error } from './index.scss';

const UserBalance = ({ symbol, icx, token }) => {
  const renderItem = target => {
    if (target.isProceeding) {
      return <div style={{ width: '80%' }}>Loading</div>;
    } else if (target.error) {
      return (
        <div style={{ width: '80%' }} className={error}>
          {target.error}
        </div>
      );
    } else {
      return (
        <>
          <div>{target.data.undeposited || 0}</div>
          <div>{target.data.deposited || 0}</div>
        </>
      );
    }
  };

  return (
    <ul className={wrapper}>
      <li>
        <div width='20%'>name</div>
        <div width='40%'>wallet</div>
        <div width='40%'>score</div>
      </li>
      <li>
        <div>ICX</div>
        {renderItem(icx)}
      </li>
      <li>
        <div>{symbol}</div>
        {renderItem(token)}
      </li>
    </ul>
  );
};

export default UserBalance;
