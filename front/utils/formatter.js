export const toCurrency = value => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const toNumber = value => Number(value.replace(/,/gi, ''));

export const toHexString = value => '0x' + value.toString(16);

export const toDecimal = value => Number(value, 16);

export const toLoop = value => toHexString(value * 10 ** 18);

export const toIcx = value => toDecimal(value / 10 ** 18);
