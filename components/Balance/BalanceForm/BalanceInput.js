import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  depositIcxEvent,
  depositTokenEvent,
  withdrawIcxEvent,
  withdrawTokenEvent,
} from '../../../utils/event';
import AT from '../../../redux/actionTypes';

import { wrapper, primary, danger } from './BalanceInput.scss';

const BalanceInput = memo(({ type, target, balance }) => {
  const [amount, setAmount] = useState('');
  const { address } = useSelector(state => state.wallet);
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
      if (target === 'ICX') {
        depositIcxEvent(amount, address);
      } else {
        depositTokenEvent(amount, address, target.address);
      }
    } else {
      if (target === 'ICX') {
        withdrawIcxEvent(amount, address);
      } else {
        withdrawTokenEvent(amount, address, target.address);
      }
    }
  };

  const amountValidation = () => {
    if (!amount) {
      alert('Please enter amount!');
      return;
    }
    if (isNaN(amount)) {
      alert('Only numbers can be enterd.');
      setAmount('');
      return;
    }
    if (balance.error) {
      alert(`Can't ${type.toLowerCase()}. Something went wrong`);
      return false;
    }
    if (type === 'Deposit') {
      if (Number(balance.data.undeposited) < amount) {
        alert(`Can't ${type.toLowerCase()} more then you have`);
        setAmount(balance.data.undeposited);
        return false;
      }
    } else {
      if (Number(balance.data.deposited) < amount) {
        alert(`Can't ${type} more then you have`);
        setAmount(balance.data.deposited);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = ({ keyCode }) => {
    if (!keyCode || (keyCode && keyCode === 13)) {
      if (!amountValidation()) {
        return;
      }

      eventDispatch();
      setAmount('');
    }
  };

  return (
    <div className={wrapper}>
      <p>
        {type} {target !== 'ICX' ? target && target.symbol : target}
      </p>
      <input
        type='text'
        value={amount}
        onChange={handleInputChange}
        onKeyDown={handleSubmit}
        placeholder='0'
      />
      <button className={type === 'Deposit' ? primary : danger} onClick={handleSubmit}>
        {type}
      </button>
    </div>
  );
});

export default BalanceInput;
