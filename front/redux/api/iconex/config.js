import IconService, { HttpProvider, IconBuilder } from 'icon-sdk-js';

import { isProd } from '../../../utils/const';

const getIconUrl = () => {
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

const httpProvider = new HttpProvider(`${getIconUrl()}`);

export const iconService = new IconService(httpProvider);

export const { CallBuilder } = IconBuilder;
