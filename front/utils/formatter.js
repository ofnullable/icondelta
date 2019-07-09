import BigNumber from 'bignumber.js';

const withComma = value => {
  if (!value) return 0;

  let parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const toStringWithCommas = (value, round) => {
  if (!value) return '0';

  if (typeof value === 'string') {
    value = value.replace(/,/g, '');
  }
  if (round && round >= 0) {
    value = new BigNumber(value).toFixed(round);
  } else {
    value = new BigNumber(value).toFixed(9);
  }

  return withComma(value);
};

export const toNumber = value => {
  if (!value) return 0;
  if (typeof value === 'string') {
    value = value.replace(/,/gi, '');
  }
  return new BigNumber(value).toNumber();
};

export const toHexString = value => {
  const parsed = Number(value);
  if (isNaN(parsed)) return '0x0';
  return `0x${parsed.toString(16)}`;
};

export const toLoop = val => {
  const parts = val.toString().split('.');
};

export const toIcx = (value, round = 9) => {
  if (!value) return 0;
  if (typeof value === 'string') {
    value = toNumber(value);
  }
  return new BigNumber(value).dividedBy(10 ** 18).toFixed(round);
};
