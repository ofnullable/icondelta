import React, { useState } from 'react';

import { wrapper } from './index.scss';
import { primary, danger, addon } from '../../Layout/style.scss';

const TradeForm = ({ type, token }) => {
  const [expires, setExpires] = useState(10000);

  const handleInputChange = e => {
    setExpires(e.target.value);
  };

  const makeOrder = e => {
    e.preventDefault();
  };

  return (
    <form className={wrapper} onSubmit={makeOrder}>
      <div>
        <p>Amount to {type}</p>
        <input required type='text' />
      </div>
      <div>
        <p>Price</p>
        <input required type='text' />
      </div>
      <div>
        <p>Total</p>
        <input required type='text' />
      </div>
      <div>
        <p>Expires</p>
        <input required type='text' value={expires} onChange={handleInputChange} />
      </div>
      <button className={type === 'Buy' ? primary : danger} type='submit'>
        {type} Order
      </button>
    </form>
  );
};

export default TradeForm;
