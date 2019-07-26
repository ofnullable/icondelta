import { combineReducers } from 'redux';

import wallet from './wallet';
import token from './token';
import order from './order';
import history from './history';
import socket from './socket';
import event from './event';

export default combineReducers({ wallet, token, order, history, socket, event });
