import { SHA3 } from 'sha3';

import { REDUX_STEP, ICX_ADDRESS, SCORE_ADDRESS } from './const';
import { toLoop, toBigNumber, toIcx } from './formatter';

const changeObjectState = (step, state, target, action) => {
  switch (step) {
    case REDUX_STEP.REQUEST:
      return {
        ...state,
        [target]: {
          data: {},
          isProceeding: true,
          error: '',
        },
      };
    case REDUX_STEP.SUCCESS: {
      return {
        ...state,
        [target]: {
          ...state[target],
          data: action.data || {},
          isProceeding: false,
        },
      };
    }
    case REDUX_STEP.FAILURE: {
      const { error } = action;
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: false,
          error,
        },
      };
    }
    default:
      return state;
  }
};

const changeArrayState = (step, state, target, action) => {
  switch (step) {
    case REDUX_STEP.REQUEST:
      return {
        ...state,
        [target]: {
          data: [],
          isProceeding: true,
          error: '',
        },
      };
    case REDUX_STEP.SUCCESS: {
      return {
        ...state,
        [target]: {
          ...state[target],
          data: action.data || [],
          isProceeding: false,
        },
      };
    }
    case REDUX_STEP.FAILURE: {
      const { error } = action;
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: false,
          error,
        },
      };
    }
    default:
      return state;
  }
};

export const changeState = (type, step, state, target, action) => {
  switch (type) {
    case 'ARR':
      return changeArrayState(step, state, target, action);
    case 'OBJ':
      return changeObjectState(step, state, target, action);
  }
};

export const makeRandomNumber = () => {
  if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
    var o = new Uint32Array(1);
    window.crypto.getRandomValues(o);
    return o[0];
  } else {
    console.warn('Falling back to pseudo-random client seed');
    return Math.floor(Math.random() * Math.pow(2, 32));
  }
};

//{icon delta SCORE address}{token get address}{token get amount}{token give address}{token give amount}{nonce}
const makeTxHash = (tokenGet, getAmount, tokenGive, giveAmount, nonce) => {
  const sha3 = new SHA3(256);
  const serialized = `${SCORE_ADDRESS}${tokenGet}${getAmount}${tokenGive}${giveAmount}${nonce}`;
  return sha3.update(serialized).digest('hex');
};

const makeBuyOrderParams = (type, amount, total, address, tokenAddress, nonce) => {
  return {
    type,
    nonce,
    hashed: makeTxHash(tokenAddress, amount, ICX_ADDRESS, total, nonce),
    tokenGet: tokenAddress,
    getAmount: amount,
    tokenGive: ICX_ADDRESS,
    giveAmount: total,
    makerAddress: address,
    // expireBlock: 10000,
  };
};

const makeSellOrderParams = (type, amount, total, address, tokenAddress, nonce) => {
  return {
    type,
    nonce,
    hashed: makeTxHash(ICX_ADDRESS, total, tokenAddress, amount, nonce),
    tokenGet: ICX_ADDRESS,
    getAmount: total,
    tokenGive: tokenAddress,
    giveAmount: amount,
    makerAddress: address,
    orderFills: 0,
    // expireBlock: 10000,
  };
};

export const makeOrderParams = (type, amount, total, address, tokenAddress) => {
  const nonce = makeRandomNumber();
  if (type === 'buy') {
    return makeBuyOrderParams(type, toLoop(amount), toLoop(total), address, tokenAddress, nonce);
  } else if (type === 'sell') {
    return makeSellOrderParams(type, toLoop(amount), toLoop(total), address, tokenAddress, nonce);
  }
};

const getPrice = order => {
  const { giveAmount, getAmount } = order;
  return order.type === 'buy'
    ? toBigNumber(giveAmount)
        .dividedBy(getAmount)
        .toNumber()
    : toBigNumber(getAmount)
        .dividedBy(giveAmount)
        .toNumber();
};

const getAmount = order => {
  const { getAmount, orderFills } = order;
  return order.type === 'buy'
    ? toIcx(toBigNumber(getAmount).minus(orderFills))
    : toBigNumber(order.total)
        .dividedBy(order.price)
        .toString();
};

const getTotal = order => {
  const { getAmount, orderFills, price } = order;
  return order.type === 'buy'
    ? toIcx(
        toBigNumber(getAmount)
          .minus(orderFills)
          .multipliedBy(price)
      )
    : toIcx(toBigNumber(getAmount).minus(orderFills));
};

export const addInfoToOrder = order => {
  if (order instanceof Array) {
    return order.map(o => {
      if (o.type === 'buy') {
        o.price = getPrice(o);
        o.amount = getAmount(o);
        o.total = getTotal(o);
      } else {
        o.price = getPrice(o);
        o.total = getTotal(o);
        o.amount = getAmount(o);
      }
      return o;
    });
  } else if (order instanceof Object) {
    if (order.type === 'buy') {
      order.price = getPrice(order);
      order.amount = getAmount(order);
      order.total = getTotal(order);
    } else {
      order.price = getPrice(order);
      order.total = getTotal(order);
      order.amount = getAmount(order);
    }
    return order;
  }
};
