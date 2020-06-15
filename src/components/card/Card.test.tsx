import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Card from './Card';

afterEach(cleanup);

type hospitalType = {
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
}

const mockedCardHospitalProp: hospitalType = {
  name: "Clean sprint hospital",
  address: "woji road, port harcourt",
  location: {
    lat: 23.45,
    lng: 23.4
  }
}

test('Renders <Card /> component', () => {
  const { asFragment } = render(<Card hospital={mockedCardHospitalProp} />);
  expect(asFragment()).toMatchSnapshot();
});