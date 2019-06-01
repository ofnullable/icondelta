import { combineReducers } from 'redux';

import iconex from './iconex';
import tokens from './tokens';
import order from './order';
import trade from './trade';

export default combineReducers({ iconex, tokens, order, trade });
