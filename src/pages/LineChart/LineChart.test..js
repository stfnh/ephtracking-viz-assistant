import React from 'react';
import { shallow } from 'enzyme';

import GetData from './';

describe('Page GetData', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GetData />);
    expect(wrapper).toMatchSnapshot();
  });
});
