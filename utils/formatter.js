import BigNumber from 'bignumber.js';

const isBigNumber = value => {
  return BigNumber.isBigNumber(value);
};

export const toBigNumber = value => {
  if (isBigNumber(value)) return value;
  if (typeof value === 'string') {
    value = value.replace(/,/gi, '');
  }
  return new BigNumber(`${value}`);
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

export const toHexString = value => {
  if (!isBigNumber(value)) {
    value = toBigNumber(value);
  }
  if (isNaN(value)) throw new Error('Can not convert to hex string');
  return `0x${value.toString(16)}`;
};

export const toHexLoop = value => {
  return toHexString(toBigNumber(value).times(10 ** 18));
};

export const toLoop = value => {
  return toBigNumber(value)
    .times(10 ** 18)
    .toNumber();
};

export const toIcx = (value, round = 9) => {
  if (!value) return 0;

  const parsed = toBigNumber(value)
    .dividedBy(10 ** 18)
    .toString(10);

  const parts = parsed.split('.');
  if (parts[1] && parts[1].length > 9) {
    return toBigNumber(parsed).toFixed(round);
  }
  return parsed.toString(10);
};
