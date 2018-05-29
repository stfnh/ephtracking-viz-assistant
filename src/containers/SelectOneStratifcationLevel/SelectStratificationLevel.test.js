import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import SelectStratificationLevel from './';
import {
  stratificationlevelMock,
  optionsMock,
  measurestratificationMock,
  stratificationsMock,
  expectedParameterOptions
} from './mockdata';

describe('SelectIndicator Container', () => {
  const mock = new MockAdaptor(axios);

  it('renders correctly', async () => {
    mock.reset();
    mock
      .onGet(/\/stratificationlevel\//)
      .reply(200, stratificationlevelMock)
      .onGet(/\/measurestratification\//)
      .reply(200, measurestratificationMock);
    const handleSelect = jest.fn();
    // render without contentAreaId
    const wrapper = shallow(
      <SelectStratificationLevel handleSelect={handleSelect} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ measureId: '333', geographicTypeId: '1' });
    await wrapper.instance().getOptions('333', '1');
    expect(wrapper).toMatchSnapshot();
  });

  it('logs an error message on network error', async () => {
    mock.reset();
    mock.onAny().networkError();
    const handleSelect = jest.fn();
    console.error = jest.fn();
    const wrapper = shallow(
      <SelectStratificationLevel handleSelect={handleSelect} />
    );
    await wrapper.instance().getOptions('333', '3');
    expect(console.error).toHaveBeenCalled();
  });

  it('handles stratification level change', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectStratificationLevel handleSelect={handleSelect} />
    );
    wrapper.instance().setParameterOptions = jest.fn();
    wrapper.instance().handleChange({ target: { value: '32' } });
    expect(handleSelect).toHaveBeenCalledWith('32', '');
    expect(wrapper.state()).toMatchObject({
      value: '32',
      checked: [],
      expanded: []
    });
  });

  it('sets the parameters correctly', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectStratificationLevel handleSelect={handleSelect} />
    );
    wrapper.setState({
      options: optionsMock,
      value: '43',
      stratifications: stratificationsMock
    });
    wrapper.instance().setParameterOptions();
    expect(wrapper.state()).toMatchObject({
      parameterOptions: expectedParameterOptions
    });
  });

  it('calls handleSelect with correct parameters', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectStratificationLevel handleSelect={handleSelect} />
    );
    const checked = ['GenderId=1', 'RaceEthnicityId=2', 'RaceEthnicityId=3'];
    wrapper.setState({ value: '43' });
    wrapper.instance().handleCheck(checked);
    expect(handleSelect).toHaveBeenCalledWith(
      '43',
      'GenderId=1&RaceEthnicityId=2,3'
    );
  });

  it('expands', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectStratificationLevel handleSelect={handleSelect} />
    );
    const expanded = ['GenderId'];
    wrapper.instance().handleExpand(expanded);
    expect(wrapper.state()).toMatchObject({ expanded });
  });

  it('should only update on new props', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <SelectStratificationLevel
        handleSelect={handleSelect}
        geographicTypeId="1"
        measureId="333"
      />
    );
    wrapper.instance().getOptions = jest.fn();
    wrapper.setProps({
      geographicTypeId: '1',
      measureId: '333'
    });
    expect(wrapper.instance().getOptions).not.toHaveBeenCalled();
  });
});
