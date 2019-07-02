import BigNumber from 'bignumber.js';

export const toStringWithCommas = (i, round) => {
  if (!i) return 0;

  if (typeof i === 'string') {
    i = i.replace(/,/g, '');
  }
  if (round >= 0) {
    i = new BigNumber(i).toFixed(round);
  } else {
    i = new BigNumber(i).toFixed(9);
  }

  return withCommas(i);
};

export const toNumber = str => {};

const withCommas = i => {
  if (!i) return 0;

  let parts = i.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
