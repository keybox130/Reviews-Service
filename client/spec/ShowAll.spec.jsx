import React from 'react';
import {mount, shallow} from 'enzyme';
import StyledShowAll from '../src/components/ShowAll.jsx';
import testData from './TestData.js';

describe('<StyledShowAll />', () => {

  it('should render a show all button', () => {
    const wrapper = mount(<StyledShowAll numReviews={testData.reviews.length} onClick={null}/>); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });

});

