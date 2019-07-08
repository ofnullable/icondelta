import { combineReducers } from 'redux';

import wallet from './wallet';
import token from './token';
import event from './event';

export default combineReducers({ wallet, token, event });
