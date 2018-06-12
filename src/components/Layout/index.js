import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';

const Layout = ({ children, title, subtitle }) => (
  <div>
    <section className="hero is-primary">
      <div className="hero-head">
        <Navbar />
      </div>
      <div className="hero-body has-text-centered">
        <h1 className="title">{title}</h1>
        { subtitle && <h2 className="subtitle">{subtitle}</h2> }
      </div>
    </section>
    <div className="container">{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default Layout;
