import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import SelectGeographicType from './';

describe('SelectGeographicType Container', () => {
  const mock = new MockAdaptor(axios);
  it('renders correctly', async () => {
    const handleSelect = jest.fn();
    mock.reset();
    mock.onAny().reply(200, [{ geographicTypeId: 1, geographicType: 'state' }]);
    const wrapper = shallow(
      <SelectGeographicType handleSelect={handleSelect} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ measureId: '333' });
    await wrapper.instance().getOptions('333');
    expect(wrapper).toMatchSnapshot();
  });

  it('logs error message on network error', async () => {
    console.error = jest.fn();
    const handleSelect = jest.fn();
    mock.reset();
    mock.onAny().networkError();
    const wrapper = shallow(
      <SelectGeographicType handleSelect={handleSelect} measureId="333" />
    );
    await wrapper.instance().getOptions('333');
    expect(console.error).toHaveBeenCalled();
  });

  it('handles change on select', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectGeographicType handleSelect={handleSelect} measureId="300" />
    );
    wrapper.find('select').simulate('change', { target: { value: '2' } });
    expect(handleSelect).toHaveBeenCalledWith('2');
    expect(wrapper.state()).toHaveProperty('value', '2');
  });

  it('updates the url only if new props.url', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectGeographicType handleSelect={handleSelect} measureId="300" />
    );
    wrapper.instance().getOptions = jest.fn();
    expect(wrapper.instance().getOptions).not.toHaveBeenCalled();
    const newMeasureId = '523';
    wrapper.setProps({ measureId: newMeasureId });
    expect(wrapper.instance().getOptions).toHaveBeenCalledTimes(1);
    // same id, should not be called again
    wrapper.setProps({ measureId: newMeasureId });
    expect(wrapper.instance().getOptions).toHaveBeenCalledTimes(1);
  });
});
