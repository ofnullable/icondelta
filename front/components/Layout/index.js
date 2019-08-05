import React from 'react';

import Header from './Header';
import Footer from './Footer';

import './style.scss';

export default ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
