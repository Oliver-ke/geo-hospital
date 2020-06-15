import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Loading from './Loading';

afterEach(cleanup);

test('Renders <Loading /> component', () => {
  const { asFragment, getByAltText } = render(<Loading />);
  const linkElement = getByAltText("Loading");
  expect(asFragment()).toMatchSnapshot();
  expect(linkElement).toBeInTheDocument();
});
