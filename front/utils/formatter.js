export const toCurrency = value => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const toNumber = value => Number(value.replace(/,/gi, ''));
