import React from 'react';

import styles from './Footer.scss';

const footer = () => {
  return (
    <div className={styles.footer}>
      <p>&copy;2019 ICONDELTA</p>
      <div className='sns' />
    </div>
  );
};

export default footer;
