import { combineReducers } from 'redux';

import wallet from './wallet';
import token from './token';

export default combineReducers({ wallet, token });
