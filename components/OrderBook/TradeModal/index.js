import React from 'react';

import { wrapper, modal, modalTitle, modalBody } from './index.scss';

const TradeModal = ({ visible, handleClose, title, children }) => {
  return (
    visible && (
      <>
        <div className={wrapper} onClick={handleClose} />
        <div className={modal}>
          <div className={modalTitle}>
            <b>{title}</b>
          </div>
          <div className={modalBody}>{children && children}</div>
        </div>
      </>
    )
  );
};

export default TradeModal;
