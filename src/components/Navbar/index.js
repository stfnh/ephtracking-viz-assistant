import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar is-primary">

    <div id="navbarExampleTransparentExample" className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-brand">
        <NavLink exact activeClassName="is-active" className="navbar-item" to="/">
          HOME
        </NavLink>
        </div>
        <NavLink activeClassName="is-active" className="navbar-item" to="/timeseries">
          Time-Series Chart
        </NavLink>
        <NavLink activeClassName="is-active" className="navbar-item" to="/choropleth">
          Choropleth map
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
