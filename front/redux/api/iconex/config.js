import IconService, { HttpProvider, IconBuilder } from 'icon-sdk-js';

import { isProd } from '../../../utils/const';

const getWalletUrl = () => {
  let base = '';
  if (isProd) {
    //mainnet
    base += 'https://wallet.icon.foundation';
  } else {
    //testnet
    base += 'https://bicon.net.solidwallet.io';
  }
  return 'https://bicon.net.solidwallet.io/api/v3'; // base + '/api/v3';
};

const getTrackerUrl = () => {
  let base = '';
  if (isProd) {
    //mainnet
    base += 'https://tracker.icon.foundation';
  } else {
    //testnet
    base += 'https://bicon.tracker.solidwallet.io';
  }
  return 'https://bicon.tracker.solidwallet.io/api/v3'; //base + '/api/v3';
};

const walletHttpProvider = new HttpProvider(`${getWalletUrl()}`);
const trackerHttpProvider = new HttpProvider(`${getTrackerUrl()}`);

export const walletService = new IconService(walletHttpProvider);
export const trackerService = new IconService(trackerHttpProvider);

export const { CallBuilder, TransactionBuilder } = IconBuilder;
