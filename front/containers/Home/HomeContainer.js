import React from 'react';
import BalanceContainer from '../Balance/BalanceContainer';

import styles from './HomeContainer.scss';

const HomeContainer = () => {
  return (
    <div className={styles.container}>
      <BalanceContainer />
    </div>
  );
};

export default HomeContainer;
