import { isServer } from './const';

const get = key => !isServer && sessionStorage.getItem(key);
const set = (key, value) => !isServer && sessionStorage.setItem(key, value);
const remove = key => !isServer && sessionStorage.removeItem(key);

export default {
  get,
  set,
  remove,
};
