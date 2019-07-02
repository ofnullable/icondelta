import React from 'react';

import Head from './Head';
import Header from './Header/Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Head title='ICONDELTA' />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
