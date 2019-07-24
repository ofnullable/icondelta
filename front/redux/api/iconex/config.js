import IconService, { HttpProvider, IconBuilder } from 'icon-sdk-js';

import { isProd } from '../../../utils/const';

const getWalletUrl = () => {
  if (isProd) {
    //mainnet
    return 'https://wallet.icon.foundation';
  } else {
    //testnet
    return 'https://bicon.tracker.solidwallet.io';
  }
};

const getTrackerUrl = () => {
  if (isProd) {
    //mainnet
    return 'https://tracker.icon.foundation';
  } else {
    //testnet
    return 'https://bicon.tracker.solidwallet.io';
  }
};

const walletHttpProvider = new HttpProvider(`${getWalletUrl()}/api/v3`);
const trackerHttpProvider = new HttpProvider(`${getTrackerUrl()}/api/v3`);

export const walletService = new IconService(walletHttpProvider);
export const trackerService = new IconService(trackerHttpProvider);

export const { CallBuilder, TransactionBuilder } = IconBuilder;
