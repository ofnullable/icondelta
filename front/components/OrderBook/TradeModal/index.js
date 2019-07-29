import React from 'react';

import { wrapper, modal, title, body } from './index.scss';

const TradeModal = ({ visible, setVisible, children }) => {
  const handleBackgroundClick = e => {
    if (visible) {
      setVisible(false);
    }
  };

  return (
    visible && (
      <>
        <div className={wrapper} onClick={handleBackgroundClick} />
        <div className={modal}>
          <div className={title}>
            <b>Trade</b>
          </div>
          <div className={body}>{children && children}</div>
        </div>
      </>
    )
  );
};

export default TradeModal;
