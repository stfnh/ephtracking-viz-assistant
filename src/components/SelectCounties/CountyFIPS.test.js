import React from 'react';
import CountyFIPS from './';
import { shallow } from 'enzyme';
import COUNTIES from './counties';

describe('County FIPS Component', () => {
  const stateFIPS = 1; // Alabama
  const handleCheck = () => {};
  const filterCounties = stateFIPS =>
    COUNTIES.filter(c => stateFIPS === c.stateFips).map(c => ({
      value:
        c.stateFips.toString().padStart(2, '0') +
        c.countyFips.toString().padStart(3, '0'),
      label: c.countyName,
      icon: <i className="fa fa-map-marker" />
    }));

  it('renders correctly', () => {
    const wrapper = shallow(
      <CountyFIPS stateFips={stateFIPS} handleCheck={handleCheck} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('filters counties based on state FIPS code', () => {
    const wrapper = shallow(
      <CountyFIPS stateFips={stateFIPS} handleCheck={handleCheck} />
    );
    let counties = wrapper.state().counties;
    let filteredCounties = filterCounties(stateFIPS);
    expect(counties).toEqual(filteredCounties);
    // update props
    wrapper.setProps({ stateFips: 2 });
    counties = wrapper.state().counties;
    filteredCounties = filterCounties(2);
    expect(counties).toEqual(filteredCounties);
    wrapper.setProps({ stateFips: 2 });
  });

  it('expands correctly', () => {
    const wrapper = shallow(
      <CountyFIPS stateFips={stateFIPS} handleCheck={handleCheck} />
    );
    expect(wrapper.state().expanded).toEqual([]);
    const expandedList = ['key-1', 'key-2', 'key-3'];
    wrapper.instance().handleExpand(expandedList);
    expect(wrapper.state().expanded).toEqual(expandedList);
  });

  it('sets checked items correctly', () => {
    let checkedCounties = null;
    const setChecked = checked => {
      checkedCounties = checked;
    };
    const wrapper = shallow(
      <CountyFIPS stateFips={stateFIPS} handleCheck={setChecked} />
    );
    expect(wrapper.state().checked).toEqual([]);
    let checkedItems = ['key-1', 'key-2', 'key-3'];
    wrapper.instance().handleCheck(checkedItems);
    expect(wrapper.state().checked).toEqual(checkedItems);
    expect(checkedCounties).toEqual(checkedItems);
    // check all
    checkedItems = wrapper.state().counties.map(i => i.label);
    wrapper.instance().handleCheck(checkedItems);
    expect(wrapper.state().checked).toEqual(checkedItems);
    expect(checkedCounties).toEqual(['ALL']);
  });

  it('only calls the filter function if props.stateFips changes', () => {
    const wrapper = shallow(
      <CountyFIPS stateFips={stateFIPS} handleCheck={handleCheck} />
    );
    wrapper.instance().filterCounties = jest.fn();
    wrapper.update();
    // same stateFips as before, no call
    wrapper.setProps({ stateFips: 1 });
    expect(wrapper.instance().filterCounties).not.toHaveBeenCalled();
  });
});
