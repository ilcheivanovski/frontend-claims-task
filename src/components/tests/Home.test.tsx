import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../Home';

test('Home renders successfully', () => {
  render(<Home />);
  expect(screen.getByText('Home')).toBeInTheDocument();
});
