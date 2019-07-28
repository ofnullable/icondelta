import React from 'react';

import { wrapper, modal, title, body } from './TradeModal.scss';

const TradeModal = ({ visible, setVisible, children }) => {
  const handleBackgroundClick = e => {
    if (visible) {
      setVisible(false);
    }
  };

  const preventModalClose = e => {
    e.stopPropagation();
    console.log(children);
  };
  return (
    visible && (
      <>
        <div className={wrapper} onClick={handleBackgroundClick} />
        <div className={modal} onClick={preventModalClose}>
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
