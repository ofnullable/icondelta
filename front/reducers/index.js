import { combineReducers } from 'redux';

import iconex from './iconex';
import tokens from './tokens';
import histories from './history';

export default combineReducers({ iconex, tokens, histories });
