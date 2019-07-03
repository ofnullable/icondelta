import BigNumber from 'bignumber.js';

const WITH_COMMAS = i => {
  if (!i) return 0;

  let parts = i.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const toStringWithCommas = (i, round) => {
  if (!i) return '0';

  if (typeof i === 'string') {
    i = i.replace(/,/g, '');
  }
  if (round >= 0) {
    i = new BigNumber(i).toFixed(round);
  } else {
    i = new BigNumber(i).toFixed(9);
  }

  return WITH_COMMAS(i);
};

export const toNumber = str => {
  if (!str) return 0;
  return Number(str.replace(/,/gi, ''));
};

export const toHexString = value => value;
