export const toCurrency = value =>
  value > 999 ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value;

export const toNumber = value => Number(value.replace(/,/gi, ''));

export const toHexString = value => `0x${Number(value).toString(16)}`;

export const toDecimal = value => Number(value, 10);

export const toLoop = value => toHexString((value * 10 ** 18).toFixed());

export const toIcx = value => {
  const result = (toDecimal(value) / 10 ** 18).toFixed(18);
  return Number(result) || 0;
};
