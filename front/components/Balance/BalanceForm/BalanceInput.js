import React, { useState, memo } from 'react';
import { useDispatch } from 'react-redux';

import {
  depositIcxEvent,
  depositTokenEvent,
  withdrawIcxEvent,
  withdrawTokenEvent,
} from '../../../utils/event';
import AT from '../../../redux/actionTypes';

import { wrapper, primary, danger } from './BalanceInput.scss';

const BalanceInput = memo(({ address, type, token, balance }) => {
  // console.log(balance);
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = e => {
    if (!address) {
      dispatch({ type: AT.LOAD_ADDRESS_REQUEST });
      return;
    }
    setAmount(e.target.value);
  };

  const eventDispatch = () => {
    if (type === 'Deposit') {
      if (token === 'ICX') {
        depositIcxEvent(amount, address);
      } else {
        depositTokenEvent(amount, address, token.address);
      }
    } else {
      if (token === 'ICX') {
        withdrawIcxEvent(amount, address);
      } else {
        withdrawTokenEvent(amount, address, token.address);
      }
    }
  };

  const amountValidation = () => {
    if (type === 'Deposit') {
      if (Number(balance.undeposited) < amount) {
        return false;
      }
    } else {
      if (Number(balance.deposited) < amount) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = ({ keyCode }) => {
    if (!keyCode || (keyCode && keyCode === 13)) {
      if (!amount) {
        alert('Please enter amount!');
        return;
      }
      if (isNaN(amount)) {
        alert('Only numbers can be enterd.');
        setAmount('');
        return;
      }
      if (!amountValidation()) {
        alert(`Can't ${type} more then you have`);
        setAmount(type === 'Deposit' ? balance.undeposited : balance.deposited);
        return;
      }
      eventDispatch();
      setAmount('');
    }
  };

  return (
    <div className={wrapper}>
      <p>
        {type} {token !== 'ICX' ? token && token.symbol : token}
      </p>
      <input type='text' value={amount} onChange={handleInputChange} onKeyDown={handleSubmit} />
      <button className={type === 'Deposit' ? primary : danger} onClick={handleSubmit}>
        {type}
      </button>
    </div>
  );
});

export default BalanceInput;
