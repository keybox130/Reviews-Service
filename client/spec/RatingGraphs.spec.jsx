import React from 'react';
import { mount, shallow } from 'enzyme';
import StyledRatingGraphs from '../src/components/RatingGraphs.jsx';

describe('<StyledRatingGraphs />', () => {

  it('should render the rating overview', () => {
    const ratings = {
      average: 3.0,
      cleanliness: 2.0,
      communication: 1.0,
      checkIn: 5.0,
      accuracy: 2.0,
      location: 3.0,
      value: 1.0
    };
    const wrapper = mount(<StyledRatingGraphs ratings={ratings} />); // mount/render/shallow when applicable
    // check if the RatingOverview displays
    expect(wrapper).toExist();
  });
});