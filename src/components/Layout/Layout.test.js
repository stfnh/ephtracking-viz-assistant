import React from 'react';
import Layout from './';
import { shallow } from 'enzyme';

describe('County FIPS Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Layout>
        <p>test</p>
      </Layout>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
