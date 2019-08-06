import { serverApiInstance } from '../config';

export const loadTokensApi = () => {
  return serverApiInstance().get('/tokens');
};
