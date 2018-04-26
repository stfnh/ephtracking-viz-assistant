import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <div className="container">{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
