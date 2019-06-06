import { all, call } from 'redux-saga/effects';

import iconex from './iconex';
import order from './order';

// import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:8000/api';

export default function* sagas() {
  yield all([call(iconex), call(order)]);
}
