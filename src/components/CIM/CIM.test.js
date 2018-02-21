import React from 'react';
import CIM from './';
import { shallow } from 'enzyme';

describe('CIM Component', () => {
  const handleSelect = () => {};
  it('renders correctly', () => {
    const tree = shallow(<CIM handleSelect={handleSelect} />);
    expect(tree).toMatchSnapshot();
  });

  it('sets contentAreaId correctly', () => {
    const tree = shallow(<CIM handleSelect={handleSelect} />);
    tree.instance().setContentAreaId('3');
    expect(tree.state().contentAreaId).toBe('3');
    expect(tree.state().indicatorId).toBe(null); // reset
  });

  it('sets indicatorId correctly', () => {
    const tree = shallow(<CIM handleSelect={handleSelect} />);
    tree.instance().setIndicatorId('35');
    expect(tree.state().indicatorId).toBe('35');
  });

  it('sets measureId correctly', () => {
    let measureId = null;
    const setMeasureId = id => {
      measureId = id;
    };
    const tree = shallow(<CIM handleSelect={setMeasureId} />);
    tree.instance().setMeasureId('35');
    expect(measureId).toBe('35');
  });
});
