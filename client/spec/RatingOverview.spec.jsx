import React from 'react';
import {mount, shallow} from 'enzyme';
import StyledRatingOverview from '../src/components/RatingOverview.jsx';

describe('<RatingOverview />', () => {

  it('should render the rating overview', () => {
    const wrapper = mount(<StyledRatingOverview average={5.0} numRatings={100}/>); // mount/render/shallow when applicable
    // check if the RatingOverview displays
    expect(wrapper).toExist();
  });
});