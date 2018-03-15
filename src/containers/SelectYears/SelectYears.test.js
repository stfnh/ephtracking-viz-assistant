import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import SelectYears from './';

describe('SelectYears Container', () => {
  const mock = new MockAdaptor(axios);
  it('renders correctly', async () => {
    mock.reset();
    mock.onAny().reply(200, ['2001', '2002', '2003']);
    const handleCheck = jest.fn();
    // render without contentAreaId
    const wrapper = shallow(<SelectYears handleCheck={handleCheck} />);
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
    const wrapper = shallow(<SelectYears handleCheck={handleCheck} />);
    await wrapper.instance().loadData('123');
    expect(console.error).toHaveBeenCalled();
  });

  it('handles check correctly', () => {
    const handleCheck = jest.fn();
    const wrapper = shallow(
      <SelectYears handleCheck={handleCheck} measureId="333" />
    );
    wrapper.instance().handleCheck(['2001', '2002']);
    expect(handleCheck).toHaveBeenCalledWith(['2001', '2002']);
    expect(wrapper.state()).toHaveProperty('checked', ['2001', '2002']);
  });

  it('handles expand correctly', () => {
    const handleCheck = jest.fn();
    const wrapper = shallow(
      <SelectYears handleCheck={handleCheck} measureId="333" />
    );
    wrapper.instance().handleExpand(['2001', '2002']);
    expect(wrapper.state()).toHaveProperty('expanded', ['2001', '2002']);
  });

  it('updates options only if new props.measureId', () => {
    const handleCheck = jest.fn();
    const wrapper = shallow(
      <SelectYears handleCheck={handleCheck} measureId="333" />
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
});
