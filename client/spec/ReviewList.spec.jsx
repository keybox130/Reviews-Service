import React from 'react';
import {mount, shallow} from 'enzyme';
import StyledReviewList from '../src/components/ReviewList.jsx';
import StyledReviewListModal from '../src/components/ReviewListModal.jsx';
import testData from './TestData.js';

describe('<StyledReviewList />', () => {

  it('should render a list of reviews', () => {
    const wrapper = mount(<StyledReviewList reviews={testData.reviews.sort().slice(0, 6)}/>); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });

  it('should render a list of reviews as a modal', () => {
    const wrapper = mount(<StyledReviewListModal reviews={testData.reviews.sort()}/>); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });

});