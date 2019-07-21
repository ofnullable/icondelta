import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AT from '../../../redux/actionTypes';
import { toBigNumber } from '../../../utils/formatter';

import { wrapper } from './index.scss';
import { primary, danger } from '../../Layout/style.scss';

const TradeForm = ({ type, token }) => {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [expires, setExpires] = useState(10000);

  const { address } = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  const hasAddress = () => {
    if (!address) {
      dispatch({ type: AT.LOAD_ADDRESS_REQUEST, symbol: token.symbol });
      return false;
    }
    return true;
  };

  const isValidOrder = () => {
    if (!price || !amount || !total) return false;
    if (isNaN(price) || isNaN(amount) || isNaN(total)) return false;
    return true;
  };

  const resetInputs = () => {
    setPrice('');
    setAmount('');
    setTotal('');
  };

  const handleAmountChange = e => {
    const value = e.target.value;
    setAmount(value);
    if (price && value) {
      setTotal(toBigNumber(value).times(price));
    }
  };

  const handlePriceChange = e => {
    const value = e.target.value;
    setPrice(value);
    if (amount && value) {
      setTotal(toBigNumber(value).times(amount));
    }
  };

  const makeOrder = e => {
    e.preventDefault();
    if (!isValidOrder() || !hasAddress()) return;

    alert('valid order!');
    resetInputs();
  };

  return (
    <form className={wrapper} onSubmit={makeOrder}>
      <div>
        <p>Amount to {type}</p>
        <input required type='text' value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <p>Price</p>
        <input required type='text' value={price} onChange={handlePriceChange} />
      </div>
      <div>
        <p>Total</p>
        <input required type='text' readOnly value={total} />
      </div>
      <div>
        <p>Expires</p>
        <input required type='text' value={expires} readOnly />
      </div>
      <button className={type === 'Buy' ? primary : danger} type='submit'>
        {type} Order
      </button>
    </form>
  );
};

export default TradeForm;
