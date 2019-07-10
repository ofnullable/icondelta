import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AT from '../../../redux/actionTypes';

import { wrapper, primary, danger } from './BalanceInput.scss';
import {
  depositIcxEvent,
  depositTokenEvent,
  withdrawIcxEvent,
  withdrawTokenEvent,
} from '../../../utils/event';

const BalanceForm = ({ address, type, token }) => {
  const [amount, setAmount] = useState('');
  const [name] = useState(token ? token.symbol : 'ICX');

  const dispatch = useDispatch();

  const handleInputChange = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = ({ keyCode }) => {
    if (!amount) {
      alert('Please enter amount!');
      return;
    }

    if (!/[0-9]*\.?[0-9]+/.test(amount)) {
      alert('Only numbers can be enterd.');
      return;
    }

    if (!keyCode || (keyCode && keyCode === 13)) {
      if (type === 'Deposit') {
        if (name === 'ICX') {
          depositIcxEvent(amount, address);
        } else {
          depositTokenEvent(amount, address, tokenAddress);
        }
      } else {
        if (name === 'ICX') {
          withdrawIcxEvent(amount, address);
        } else {
          withdrawTokenEvent(amount, address, tokenAddress);
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
