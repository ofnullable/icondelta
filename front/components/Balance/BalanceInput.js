import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AT from '../../redux/actionTypes';

import { wrapper, primary, danger } from './BalanceInput.scss';
import { toNumber } from '../../utils/formatter';
import storage from '../../utils/storage';

const BalanceForm = ({ type, token }) => {
  const [amount, setAmount] = useState('');
  const [name] = useState(token ? token.symbol : 'ICX');

  const address = useSelector(state => state.wallet.address || storage.get('address'));
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = ({ keyCode }) => {
    if (!amount) {
      return;
    }
    if (!/[0-9]*\.?[0-9]+/.test(amount)) {
      alert('Only numbers can be enterd.');
      return;
    }
    if (!keyCode || (keyCode && keyCode === 13)) {
      const params = {
        amount: Number(amount),
        address,
      };
      if (type === 'Deposit') {
        if (name === 'ICX') {
          dispatch({
            type: AT.ICX_DEPOSIT_REQUEST,
            ...params,
          });
        } else {
          dispatch({
            type: AT.TOKEN_DEPOSIT_REQUEST,
            ...params,
            tokenAddress: token.address,
          });
        }
      } else {
        if (name === 'ICX') {
          dispatch({
            type: AT.ICX_WITHDRAW_REQUEST,
            ...params,
          });
        } else {
          dispatch({
            type: AT.TOKEN_WITHDRAW_REQUEST,
            ...params,
            tokenAddress: token.address,
          });
        }
      }
      setAmount('');
    }
  };

  return (
    <div className={wrapper}>
      <p>
        {type} {name}
      </p>
      <input type='text' value={amount} onChange={handleInputChange} onKeyDown={handleSubmit} />
      <button className={type === 'Deposit' ? primary : danger} onClick={handleSubmit}>
        {type}
      </button>
    </div>
  );
};

export default BalanceForm;
