import { combineReducers } from 'redux';

import wallet from './wallet';
import token from './token';
import order from './order';
import event from './event';

export default combineReducers({ wallet, token, order, event });
