import React, { useState } from 'react';

import {
  depositIcxEvent,
  depositTokenEvent,
  withdrawIcxEvent,
  withdrawTokenEvent,
} from '../../../utils/event';

import { wrapper } from './BalanceInput.scss';
import { primary, danger } from '../../Layout/style.scss';

const BalanceForm = ({ address, type, token }) => {
  const [amount, setAmount] = useState('');

  const handleInputChange = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = ({ keyCode }) => {
    if (!keyCode || (keyCode && keyCode === 13)) {
      if (!amount) {
        alert('Please enter amount!');
        return;
      }
      if (!/[0-9]*\.?[0-9]+/.test(amount)) {
        alert('Only numbers can be enterd.');
        return;
      }

      eventDispatch();
      setAmount('');
    }
  };

  const eventDispatch = () => {
    if (type === 'Deposit') {
      if (token) {
        depositTokenEvent(amount, address, token.address);
      } else {
        depositIcxEvent(amount, address);
      }
    } else {
      if (token) {
        withdrawTokenEvent(amount, address, token.address);
      } else {
        withdrawIcxEvent(amount, address);
      }
    }
  };

  return (
    <div className={wrapper}>
      <p>
        {type} {token ? token.symbol : 'ICX'}
      </p>
      <input type='text' value={amount} onChange={handleInputChange} onKeyDown={handleSubmit} />
      <button className={type === 'Deposit' ? primary : danger} onClick={handleSubmit}>
        {type}
      </button>
    </div>
  );
};

export default BalanceForm;
