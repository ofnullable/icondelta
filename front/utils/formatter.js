export const toCurrency = value => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const toNumber = value => Number(value.replace(/,/gi, ''));

export const toHexString = value => '0x' + value.toString(16);

export const toDecimal = value => BigInt(value, 16);
