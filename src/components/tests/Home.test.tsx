import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from '../Home';

test('Home renders successfully', () => {
  render(<HomePage />);
  expect(screen.getByText('Home')).toBeInTheDocument();
});
