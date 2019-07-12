import React from 'react';

import { wrapper } from './index.scss';

const TokenSearchForm = ({ handleChange }) => {
  return (
    <div className={wrapper}>
      <input type='text' onChange={handleChange} />
      <div>
        <i class='material-icons'>search</i>
      </div>
    </div>
  );
};

export default TokenSearchForm;
