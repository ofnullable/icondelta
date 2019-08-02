import React from 'react';

import { wrapper, error } from './index.scss';

const UserBalance = ({ symbol, icx, token }) => {
  const renderItem = target => {
    if (target.isProceeding) {
      return <td colSpan='2'>Loading</td>;
    } else if (target.error) {
      return (
        <td colSpan='2' className={error}>
          {target.error}
        </td>
      );
    } else {
      return (
        <>
          <td>{target.data.undeposited || 0}</td>
          <td>{target.data.deposited || 0}</td>
        </>
      );
    }
  };

  return (
    <table className={wrapper}>
      <thead>
        <tr>
          <th width='20%'>name</th>
          <th width='40%'>wallet</th>
          <th width='40%'>score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ICX</td>
          {renderItem(icx)}
        </tr>
        <tr>
          <td>{symbol}</td>
          {renderItem(token)}
        </tr>
      </tbody>
    </table>
  );
};

export default UserBalance;
