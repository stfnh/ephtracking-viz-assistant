import React from 'react';
import GeographicFilter from './';
import { shallow } from 'enzyme';

describe('County FIPS Component', () => {
  const measureId = '585'; // Percent of adults ever diagnosed with asthma (2011 and onwards)
  const geographicTypeId = '1'; // state

  it('renders correctly', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <GeographicFilter
        measureId={measureId}
        geographicTypeId={geographicTypeId}
        handleSelect={handleSelect}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('sets state fips correctly', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <GeographicFilter
        measureId={measureId}
        geographicTypeId={geographicTypeId}
        handleSelect={handleSelect}
      />
    );
    expect(wrapper.state().stateFips).toBe(null);
    wrapper.instance().setStateFips('01'); // Alabama
    expect(wrapper.state().stateFips).toBe(1);
  });

  it('handles state change', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <GeographicFilter
        measureId="585"
        geographicTypeId={geographicTypeId}
        handleSelect={handleSelect}
      />
    );
    wrapper.instance().handleStateChange(['01', '02', '03']);
    wrapper.instance().handleStateChange(['ALL']);
    // mock functions from jest; get first call, first parmeter
    expect(handleSelect.mock.calls[0][0]).toEqual({
      geographicTypeIdFilter: '1',
      geographicItemsFilter: ['01', '02', '03'] // state fips
    });
    expect(handleSelect.mock.calls[1][0]).toEqual({
      geographicTypeIdFilter: 'ALL',
      geographicItemsFilter: 'ALL'
    });
  });

  it('handles county change', () => {
    const handleSelect = jest.fn();
    const wrapper = shallow(
      <GeographicFilter
        measureId="585"
        geographicTypeId="2"
        handleSelect={handleSelect}
      />
    );
    wrapper.instance().handleCountyChange(['13001', '13089']); // select two counties
    wrapper.instance().handleCountyChange(['ALL']); // select all
    expect(handleSelect.mock.calls[0][0]).toEqual({
      geographicTypeIdFilter: '2', // county
      geographicItemsFilter: ['13001', '13089'] // county fips
    });
    expect(handleSelect.mock.calls[1][0]).toEqual({
      geographicTypeIdFilter: 'ALL',
      geographicItemsFilter: 'ALL'
    });
  });
});
