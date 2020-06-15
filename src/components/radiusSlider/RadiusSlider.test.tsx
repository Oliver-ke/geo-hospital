import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RadiusSlider from './RadiusSlider';

afterEach(cleanup);

const mockedUpdateSlider: Function = () => { }

test('Renders <RadiusSlider /> component', () => {
  const { asFragment } = render(<RadiusSlider updateSlider={mockedUpdateSlider} />);
  expect(asFragment()).toMatchSnapshot();
});