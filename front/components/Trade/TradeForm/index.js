import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SHA3Hash } from 'sha3';

import AT from '../../../redux/actionTypes';
import { toBigNumber } from '../../../utils/formatter';

import { wrapper } from './index.scss';
import { primary, danger } from '../../Layout/style.scss';
import { SCORE_ADDRESS, ICX_ADDRESS } from '../../../utils/const';

const TradeForm = ({ type, token }) => {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [expires, setExpires] = useState(10000);

  const { address } = useSelector(state => state.wallet);
  const { order } = useSelector(state => state.socket);
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
    } else {
      setTotal(0);
    }
  };

  const handlePriceChange = e => {
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
    if (!isValidOrder() || !hasAddress()) return;

    if (!order.connected) {
      return alert('Can not create new order.. please refresh window');
    }
    const param = {
      signature: '0xTBD',
      tokenGet: type === 'Buy' ? token.address : ICX_ADDRESS,
      getAmount: type === 'Buy' ? amount : total,
      tokenGive: type === 'Buy' ? ICX_ADDRESS : token.address,
      giveAmount: type === 'Buy' ? total : amount,
      nonce: 0,
      makerAddress: address,
      expireBlock: expires,
    };
    console.log(order, param);
    order.emit('createOrder', param, res => {
      console.log('create order', res);
    });

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
        <input required type='text' value={total} readOnly />
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
