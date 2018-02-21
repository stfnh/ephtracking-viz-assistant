import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import SelectIndicator from './';

describe('SelectIndicator Container', () => {
  const mock = new MockAdaptor(axios);
  it('renders correctly', async () => {
    mock.reset();
    mock
      .onAny()
      .reply(200, [{ id: 1, name: 'hello' }, { id: 2, name: 'world' }]);
    const handleSelect = jest.fn();
    // render without contentAreaId
    const wrapper = shallow(<SelectIndicator handleSelect={handleSelect} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ contentAreaId: '123' });
    await wrapper.instance().getOptions('123');
    expect(wrapper).toMatchSnapshot();
  });

  it('logs an error message on network error', async () => {
    mock.reset();
    mock.onAny().networkError();
    const handleSelect = jest.fn();
    console.error = jest.fn();
    const wrapper = shallow(<SelectIndicator handleSelect={handleSelect} />);
    await wrapper.instance().getOptions('123');
    expect(console.error).toHaveBeenCalled();
  });

  it('handles change on select', () => {
    const handleSelect = jest.fn();
    // render without contentAreaId
    const wrapper = shallow(
      <SelectIndicator handleSelect={handleSelect} contentAreaId="333" />
    );
    wrapper.find('select').simulate('change', { target: { value: '2' } });
    expect(handleSelect).toHaveBeenCalledWith('2');
    expect(wrapper.state()).toHaveProperty('value', '2');
  });

  it('updates options only if new props.contentAreaId', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectIndicator handleSelect={handleSelect} contentAreaId="333" />
    );
    wrapper.instance().getOptions = jest.fn();
    expect(wrapper.instance().getOptions).not.toHaveBeenCalled();
    const newContentAreaId = '523';
    wrapper.setProps({ contentAreaId: newContentAreaId });
    expect(wrapper.instance().getOptions).toHaveBeenCalledTimes(1);
    // same id, should not be called again
    wrapper.setProps({ contentAreaId: newContentAreaId });
    expect(wrapper.instance().getOptions).toHaveBeenCalledTimes(1);
  });
});
