import { combineReducers } from 'redux';

import wallet from './wallet';
import token from './token';
import order from './order';
import history from './history';
import event from './event';
import socket from './socket';

export default combineReducers({ wallet, token, order, history, socket, event });
