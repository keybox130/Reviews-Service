import React from 'react';
import {mount, shallow} from 'enzyme';
import StyledReview from '../src/components/Review.jsx';

describe('<StyledReview />', () => {

  const review = {"date":"September 2020","name":"Jenny","reviewText":"pear reactor kite a orange stay room rent reactor little apartment normal abstract abstract rent will rent free abstract of a stay home apple tree lorem ipsum a is reactor apple apartment rent your room free apple orange normal pear free job hack job rent of stay job big great of work abstract pear work little is is your your a lorem ipsum orange big of great great tree a of normal roof great of great apartment the bathroom your great tree bathroom","userIcon":"https://keybox-review-images.s3-us-west-1.amazonaws.com/69998.png"};

  it('should render a single review', () => {
    const wrapper = mount(<StyledReview review={review}/>); // mount/render/shallow when applicable
    // check if the StyledReview displays
    expect(wrapper).toExist();
  });
});