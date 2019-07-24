import { walletService, CallBuilder } from './config';
import { SCORE_ADDRESS } from '../../../utils/const';

const getIcx = address => {
  return walletService.getBalance(address).execute();
};

const getDepositedIcx = address => {
  const tx = new CallBuilder()
    .to(SCORE_ADDRESS)
    .method('balanceOf')
    .params({ _address: address })
    .build();
  return walletService.call(tx).execute();
};

const getToken = (address, tokenAddress) => {
  const tx = new CallBuilder()
    .to(tokenAddress)
    .method('balanceOf')
    .params({ _owner: address })
    .build();
  return walletService.call(tx).execute();
};

const getDepositedToken = (address, tokenAddress) => {
  const tx = new CallBuilder()
    .to(SCORE_ADDRESS)
    .method('tokenBalanceOf')
    .params({ _address: address, _tokenAddress: tokenAddress })
    .build();
  return walletService.call(tx).execute();
};

export const getIcxBalance = async address => {
  return {
    undeposited: await getIcx(address),
    deposited: await getDepositedIcx(address),
  };
};

export const getTokenBalance = async (address, tokenAddress) => {
  return {
    undeposited: await getToken(address, tokenAddress),
    deposited: await getDepositedToken(address, tokenAddress),
  };
};
