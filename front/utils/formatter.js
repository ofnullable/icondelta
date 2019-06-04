export const toCurrency = value =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const toNumber = value => Number(value.replace(/,/gi, ''));

export const toHexString = value => `0x${value.toString(16)}`;

export const toDecimal = value => Number(value, 10);

export const toLoop = value => toHexString(value * 10 ** 18);

export const toIcx = value => {
  const result = (toDecimal(value) / 10 ** 18).toFixed(18);
  return Number(result) || 0;
};
