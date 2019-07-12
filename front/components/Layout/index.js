import React from 'react';

import Head from './Head';
import Header from './Header';
import Footer from './Footer';

import './style.scss';

export default ({ children }) => {
  return (
    <>
      <Head />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
