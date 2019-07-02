import { combineReducers } from 'redux';

import iconex from './iconex';
import tokens from './tokens';
import order from './order';

export default combineReducers({ iconex, tokens, order });
