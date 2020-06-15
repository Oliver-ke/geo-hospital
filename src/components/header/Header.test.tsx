import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from './Header';

afterEach(cleanup);

test('Renders <Header /> component', () => {
  const { asFragment, getByText } = render(<Header />);
  const linkElement = getByText(/Find nearest hospitals around your location/i);
  expect(asFragment()).toMatchSnapshot();
  expect(linkElement).toBeInTheDocument();
});
