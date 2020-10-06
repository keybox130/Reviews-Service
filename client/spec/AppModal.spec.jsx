import React from 'react';
import {mount, shallow} from 'enzyme';
import StyledAppModal from '../src/components/AppModal.jsx';
import testData from './TestData.js';

describe('<AppModal />', () => {
  it('should render the app modal to the DOM', () => {
    const ref = React.createRef();
    const wrapper = mount(<StyledAppModal ref={ref} reviews={testData.reviews} ratings={testData.ratings} close={null} />); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });
});