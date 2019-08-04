import { iconService, CallBuilder } from './config';
import { SCORE_ADDRESS } from '../../../utils/const';

const getIcx = address => {
  return iconService.getBalance(address).execute();
};

const getDepositedIcx = address => {
  const tx = new CallBuilder()
    .to(SCORE_ADDRESS)
    .method('balanceOf')
    .params({ _address: address })
    .build();
  return iconService.call(tx).execute();
};

const getToken = (address, tokenAddress) => {
  const tx = new CallBuilder()
    .to(tokenAddress)
    .method('balanceOf')
    .params({ _owner: address })
    .build();
  return iconService.call(tx).execute();
};

const getDepositedToken = (address, tokenAddress) => {
  const tx = new CallBuilder()
    .to(SCORE_ADDRESS)
    .method('tokenBalanceOf')
    .params({ _address: address, _tokenAddress: tokenAddress })
    .build();
  return iconService.call(tx).execute();
};

export const getIcxBalance = async address => {
  try {
    return {
      undeposited: await getIcx(address),
      deposited: await getDepositedIcx(address),
    };
  } catch (e) {
    throw new Error('Fail to get ICX balance');
  }
};

export const getTokenBalance = async (address, tokenAddress) => {
  try {
    return {
      undeposited: await getToken(address, tokenAddress),
      deposited: await getDepositedToken(address, tokenAddress),
    };
  } catch (e) {
    throw new Error('Fail to get balance for token:', tokenAddress);
  }
};
