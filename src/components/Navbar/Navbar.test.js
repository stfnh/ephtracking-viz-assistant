import React from 'react';
import Navbar from './';
import { shallow } from 'enzyme';

describe('County FIPS Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('toggles the menu', () => {
    const wrapper = shallow(<Navbar />);
    const isActive = wrapper.state().isActive;
    wrapper.instance().toggleMenu();
    expect(wrapper.state().isActive).toBe(!isActive);
  });

  it('closes the menu', () => {
    const wrapper = shallow(<Navbar />);
    wrapper.setState({ isActive: true });
    wrapper.instance().closeMenu();
    expect(wrapper.state().isActive).toBe(false);
  });
});
