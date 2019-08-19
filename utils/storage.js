import { isServer } from './const';

const get = key => !isServer && sessionStorage.getItem(key);
const set = (key, value) => !isServer && sessionStorage.setItem(key, value);
const remove = key => !isServer && sessionStorage.removeItem(key);

const getLocal = key => !isServer && JSON.parse(localStorage.getItem(key));
const setLocal = (key, value) => !isServer && localStorage.setItem(JSON.stringify(value));
const removeLocal = key => !isServer && localStorage.removeItem(key);

export default {
  get,
  set,
  remove,
};
