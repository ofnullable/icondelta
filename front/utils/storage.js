import { isServer } from './const';

export const getItem = key => !isServer && sessionStorage.getItem(key);
export const setItem = (key, value) =>
  !isServer && sessionStorage.setItem(key, value);
