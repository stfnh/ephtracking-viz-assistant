import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import StateFIPS from './';

describe('StateFIPS Container', () => {
  const mock = new MockAdaptor(axios);
  it('renders correctly', async () => {
    mock.reset();
    mock.onAny().reply(200, ['01', '02', '04']); // fips
    const handleCheck = jest.fn();
    // render without contentAreaId
    const wrapper = shallow(<StateFIPS handleCheck={handleCheck} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ measureId: '123' });
    await wrapper.instance().loadData('123');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('logs an error message on network error', async () => {
    mock.reset();
    mock.onAny().networkError();
    const handleCheck = jest.fn();
    console.error = jest.fn();
    const wrapper = shallow(<StateFIPS handleCheck={handleCheck} />);
    await wrapper.instance().loadData('123');
    expect(console.error).toHaveBeenCalled();
  });

  it('handles check correctly', () => {
    const handleCheckMock = jest.fn();
    const wrapper = shallow(
      <StateFIPS handleCheck={handleCheckMock} measureId="333" />
    );
    wrapper.instance().handleCheck(['01', '04']);
    expect(handleCheckMock).toHaveBeenCalledWith(['01', '04']);
    expect(wrapper.state()).toHaveProperty('checked', ['01', '04']);
    // check all:
    wrapper.setState({ statesForMeasure: ['01', '02', '04'] });
    wrapper.update();
    wrapper.instance().handleCheck(['01', '02', '04']);
    expect(handleCheckMock).toHaveBeenLastCalledWith(['ALL']);
    expect(wrapper.state()).toHaveProperty('checked', ['01', '02', '04']);
  });

  it('updates options only if new props.measureId', () => {
    const handleCheck = jest.fn();
    const wrapper = shallow(
      <StateFIPS handleCheck={handleCheck} measureId="333" />
    );
    wrapper.instance().loadData = jest.fn();
    expect(wrapper.instance().loadData).not.toHaveBeenCalled();
    const newMeasureId = '523';
    wrapper.setProps({ measureId: newMeasureId });
    expect(wrapper.instance().loadData).toHaveBeenCalledTimes(1);
    // same id, should not be called again
    wrapper.setProps({ contentAreaId: newMeasureId });
    expect(wrapper.instance().loadData).toHaveBeenCalledTimes(1);
  });

  it('handles expand correctly', () => {
    const handleCheck = jest.fn();
    const wrapper = shallow(
      <StateFIPS handleCheck={handleCheck} measureId="333" />
    );
    wrapper.instance().handleExpand(['01', '02']);
    expect(wrapper.state()).toHaveProperty('expanded', ['01', '02']);
  });

});
