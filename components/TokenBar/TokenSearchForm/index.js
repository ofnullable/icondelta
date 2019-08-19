import React from 'react';

import { wrapper } from './index.scss';

const TokenSearchForm = ({ handleChange }) => {
  return (
    <div className={wrapper}>
      <input type='text' onChange={handleChange} />
      <button>
        <i className='material-icons'>search</i>
      </button>
    </div>
  );
};

export default TokenSearchForm;
