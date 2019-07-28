import React from 'react';

import { wrapper } from './Modal.scss';

const Modal = ({ visible, setVisible }) => {
  const handleBackgroundClick = () => {
    if (visible) {
      setVisible(false);
    }
  };
  return (
    visible && (
      <div className={wrapper} onClick={handleBackgroundClick}>
        a
      </div>
    )
  );
};

export default Modal;
