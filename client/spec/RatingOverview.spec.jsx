import React from 'react';
import {mount, shallow} from 'enzyme';
import StyledRatingOverview from '../src/components/RatingOverview.jsx';
import testData from './TestData.js';

describe('<RatingOverview />', () => {

  it('should render the rating overview', () => {
    const wrapper = mount(<StyledRatingOverview average={testData.ratings.average} numReviews={testData.reviews.length} isModal={false}/>); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });
});