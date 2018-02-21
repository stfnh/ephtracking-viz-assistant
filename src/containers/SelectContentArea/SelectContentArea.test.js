import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import SelectContentArea from './';

describe('SelectContentArea Container', () => {
  const contentAreas = [
    { id: '11', name: 'Air Quality', shortName: 'AQ' },
    { id: '3', name: 'Asthma', shortName: 'AS' },
    {
      id: '18',
      name: 'Biomonitoring: Population Exposures ',
      shortName: 'BIO'
    }
  ];

  it('renders correctly', async () => {
    const mock = new MockAdaptor(axios);
    mock.onAny().reply(200, contentAreas);
    const handleSelect = jest.fn();
    const wrapper = shallow(<SelectContentArea handleSelect={handleSelect} />);
    await wrapper.instance().componentDidMount();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles Content Area select', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(<SelectContentArea handleSelect={handleSelect} />);
    expect(wrapper.state()).toHaveProperty('value', '');
    const event = { target: { value: '1' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.state()).toHaveProperty('value', '1');
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it('handles network errors', async () => {
    const mock = new MockAdaptor(axios);
    mock.onAny().networkError();
    console.error = jest.fn();
    const handleSelect = jest.fn();
    const wrapper = shallow(<SelectContentArea handleSelect={handleSelect} />);
    await wrapper.instance().componentDidMount();
    expect(console.error).toHaveBeenCalled();
  });
});
