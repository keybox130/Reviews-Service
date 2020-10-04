import React from 'react';
import { mount, shallow } from 'enzyme';
import StyledBarGraph from '../src/components/BarGraph.jsx';
import testData from './TestData.js';

describe('<StyledBarGraph />', () => {

  const ratings = testData.ratings;

  it('should render individual bar graphs', () => {
    const barGraphs = (
      <>
        <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness} isModal={false}></StyledBarGraph>
        <StyledBarGraph text='Accuracy' rating={ratings.accuracy} isModal={false}></StyledBarGraph>
        <StyledBarGraph text='Communication' rating={ratings.communication} isModal={false}></StyledBarGraph>
        <StyledBarGraph text='Location' rating={ratings.location} isModal={false}></StyledBarGraph>
        <StyledBarGraph text='Check-in' rating={ratings.checkIn} isModal={false}></StyledBarGraph>
        <StyledBarGraph text='Value' rating={ratings.value} isModal={false}></StyledBarGraph>
      </>
    );
    const wrapper = mount(barGraphs); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });

  it('should render individual bar graphs as a modal', () => {
    const ratings = testData.ratings;
    const barGraphs = (
      <>
        <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness} isModal={true}></StyledBarGraph>
        <StyledBarGraph text='Accuracy' rating={ratings.accuracy} isModal={true}></StyledBarGraph>
        <StyledBarGraph text='Communication' rating={ratings.communication} isModal={true}></StyledBarGraph>
        <StyledBarGraph text='Location' rating={ratings.location} isModal={true}></StyledBarGraph>
        <StyledBarGraph text='Check-in' rating={ratings.checkIn} isModal={true}></StyledBarGraph>
        <StyledBarGraph text='Value' rating={ratings.value} isModal={true}></StyledBarGraph>
      </>
    );
    const wrapper = mount(barGraphs); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });

});
