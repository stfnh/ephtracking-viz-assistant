import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  closeMenu() {
    this.setState({
      isActive: false
    });
  }

  render() {
    const menuClass = this.state.isActive
    ? 'navbar-menu is-active'
    : 'navbar-menu';
    return (
      <nav className="navbar main-nav" arial-label="main navigation">
        <div className="container" style={{marginTop: 0}} >
        <div className="navbar-brand">
          <NavLink exact activeClassName="is-active" className="navbar-item" to="/">
            HOME
          </NavLink>
          <button className="button navbar-burger" onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </button>              
        </div>
        <div className={menuClass}>
          <div className="navbar-start">
            <NavLink activeClassName="is-active" onClick={this.closeMenu} className="navbar-item" to="/timeseries">
              Time-Series Chart
            </NavLink>
            <NavLink activeClassName="is-active" onClick={this.closeMenu} className="navbar-item" to="/choropleth">
              Choropleth Map
            </NavLink>
            <NavLink activeClassName="is-active" onClick={this.closeMenu} className="navbar-item" to="/bubblechart">
              Bubble Chart
            </NavLink>
          </div>
          <div className="navbar-end navbar-menu">

                <a className="navbar-item" target="_blank" rel="noopener noreferrer" href="https://github.com/stfnh/ephtracking-viz-assistant">
                  <span className="icon">
                    <i className="fa fa-github"></i>
                  </span>
                </a>
          </div>
        </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
