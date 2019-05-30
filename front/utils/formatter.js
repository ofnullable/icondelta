export const numberFormatter = value =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
