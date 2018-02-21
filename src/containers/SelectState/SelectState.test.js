import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import SelectState from './';

describe('SelectIndicator Container', () => {
  const mock = new MockAdaptor(axios);
  it('renders correctly', async () => {
    mock.reset();
    mock.onAny().reply(200, ['01', '02', '04']); // fips
    const handleSelect = jest.fn();
    // render without contentAreaId
    const wrapper = shallow(<SelectState handleSelect={handleSelect} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ measureId: '123' });
    await wrapper.instance().getOptions('123');
    expect(wrapper).toMatchSnapshot();
  });

  it('logs an error message on network error', async () => {
    mock.reset();
    mock.onAny().networkError();
    const handleSelect = jest.fn();
    console.error = jest.fn();
    const wrapper = shallow(<SelectState handleSelect={handleSelect} />);
    await wrapper.instance().getOptions('123');
    expect(console.error).toHaveBeenCalled();
  });

  it('handles change on select', () => {
    const handleSelect = jest.fn();
    // render without measureId
    const wrapper = shallow(
      <SelectState handleSelect={handleSelect} measureId="333" />
    );
    wrapper.find('select').simulate('change', { target: { value: '02' } });
    expect(handleSelect).toHaveBeenCalledWith('02');
    expect(wrapper.state()).toHaveProperty('value', '02');
  });

  it('updates options only if new props.measureId', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectState handleSelect={handleSelect} measureId="333" />
    );
    wrapper.instance().getOptions = jest.fn();
    expect(wrapper.instance().getOptions).not.toHaveBeenCalled();
    const newMeasureId = '523';
    wrapper.setProps({ measureId: newMeasureId });
    expect(wrapper.instance().getOptions).toHaveBeenCalledTimes(1);
    // same id, should not be called again
    wrapper.setProps({ contentAreaId: newMeasureId });
    expect(wrapper.instance().getOptions).toHaveBeenCalledTimes(1);
  });
});
