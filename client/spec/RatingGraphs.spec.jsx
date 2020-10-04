import React from 'react';
import { mount, shallow } from 'enzyme';
import StyledRatingGraphs from '../src/components/RatingGraphs.jsx';
import testData from './TestData.js';

describe('<StyledRatingGraphs />', () => {

  it('should render the rating overview', () => {
    const wrapper = mount(<StyledRatingGraphs ratings={testData.ratings} />); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });

});