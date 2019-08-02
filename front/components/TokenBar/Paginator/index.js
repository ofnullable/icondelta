import React from 'react';

import { wrapper, active, disabled } from './index.scss';

const Paginator = ({ page = 1, perPage = 10, total, setPage }) => {
  const last = Math.ceil(total / perPage);
  const next = page < last ? page + 1 : 0;

  const handleClick = page => e => {
    if (e.target.className === disabled) return false;
    if (isValidPage(page)) setPage(page);
  };

  const handleChange = e => {
    if (isValidPage(e.target.value)) setPage(e.target.value);
  };

  const isValidPage = value => {
    if (!value) return false;
    if (isNaN(value)) return false;
    if (value < 1) return false;
    if (value > last) return false;
    return true;
  };

  return (
    <div className={wrapper}>
      <button className={page > 1 ? active : disabled} onClick={handleClick(1)}>
        &lt;&lt;
      </button>
      <button className={page > 1 ? active : disabled} onClick={handleClick(page - 1)}>
        &lt;
      </button>
      <div>
        <p>Page</p>
        <input type='text' value={page} onChange={handleChange} />
        <p>&#47; {last}</p>
      </div>
      <button className={next ? active : disabled} onClick={handleClick(page + 1)}>
        &gt;
      </button>
      <button className={page < last ? active : disabled} onClick={handleClick(last)}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Paginator;
