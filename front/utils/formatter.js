import BigNumber from 'bignumber.js';

const isBigNumber = value => {
  return BigNumber.isBigNumber(value);
};

const toBigNumber = value => {
  if (isBigNumber(value)) return value;
  if (typeof value === 'string') {
    value = value.replace(/,/gi, '');
  }
  return new BigNumber(value.toString());
};

const withComma = value => {
  if (!value) return 0;

  let parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const toStringWithCommas = (value, round = 9) => {
  if (!value) return '0';

  if (typeof value === 'string') {
    value = value.replace(/,/gi, '');
  }

  value = toBigNumber(value).toFixed(round);

  return withComma(value);
};

export const toNumber = value => {
  if (!value) return 0;
  if (typeof value === 'string') {
    value = value.replace(/,/gi, '');
  }
  return toBigNumber(value).toNumber();
};

export const toHexString = value => {
  const parsed = new BigNumber(value);
  if (isNaN(parsed)) return '0x0';
  return `0x${parsed.toString(16)}`;
};

export const toLoop = value => {
  return toBigNumber(value)
    .times(10 ** 18)
    .toNumber();
};

export const toIcx = (value, round = 9) => {
  if (!value) return 0;
  return toBigNumber(value)
    .dividedBy(10 ** 18)
    .toNumber();
  // .toFixed(round);
};
