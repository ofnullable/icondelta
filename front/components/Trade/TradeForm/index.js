import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AT from '../../../redux/actionTypes';
import { toBigNumber } from '../../../utils/formatter';
import { makeOrderParams } from '../../../utils/utils';
import { requestSignatureEvent } from '../../../utils/event';

import { wrapper, primary, danger } from './index.scss';

const TradeForm = ({ type }) => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [expires, setExpires] = useState(0);

  const { address, icx, token } = useSelector(state => state.wallet);
  const currentToken = useSelector(state => state.token.currentToken);
  const sockets = useSelector(state => state.socket.sockets);
  const dispatch = useDispatch();

  const loadAddress = () => {
    dispatch({ type: AT.LOAD_ADDRESS_REQUEST });
  };

  const isValidOrder = () => {
    if (!price || !amount || !total) {
      alert('Please enter valid value');
      return false;
    }
    if (isNaN(price) || isNaN(amount) || isNaN(total)) {
      alert('Please enter valid value');
      return false;
    }
    console.log(Number(total), icx, token);
    if (type === 'buy') {
      if (Number(total) > icx.data.deposited) {
        alert('You do not have enough funds to send this order');
        return false;
      }
    } else {
      if (Number(amount) > token.data.deposited) {
        alert('You do not have enough funds to send this order');
        return false;
      }
    }
    return true;
  };

  const resetInputs = () => {
    setPrice('');
    setAmount('');
    setTotal('');
  };

  const handleAmountChange = e => {
    if (!address) {
      loadAddress();
      return;
    }
    const value = e.target.value;
    setAmount(value);
    if (price && value) {
      setTotal(toBigNumber(value).times(price));
    } else {
      setTotal(0);
    }
  };

  const handlePriceChange = e => {
    if (!address) {
      loadAddress();
      return;
    }
    const value = e.target.value;
    setPrice(value);
    if (amount && value) {
      setTotal(toBigNumber(value).times(amount));
    } else {
      setTotal(0);
    }
  };

  const makeOrder = e => {
    e.preventDefault();

    if (!isValidOrder()) return;

    if (!sockets || sockets.order || !sockets.order.connected) {
      return alert('Can not create new order.. please refresh window');
    }

    const data = makeOrderParams(type, amount, total, address, currentToken.address);
    dispatch({
      type: AT.SAVE_TEMPORAL_ORDER,
      data,
    });

    requestSignatureEvent(address, data.hashed);
    resetInputs();
  };

  return (
    <form className={wrapper} onSubmit={makeOrder}>
      <div>
        <p>Amount to {type}</p>
        <input required type='text' value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <p>{`Price ( ${currentToken.symbol} / ICX )`}</p>
        <input required type='text' value={price} onChange={handlePriceChange} />
      </div>
      <div>
        <p>Total ( ICX )</p>
        <input required type='text' value={total} readOnly />
      </div>
      <div>
        <p>Expires</p>
        <input required type='text' value={expires} readOnly />
      </div>
      <button className={type === 'buy' ? primary : danger} type='submit'>
        {type} Order
      </button>
    </form>
  );
};

export default TradeForm;
