import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('WHEN renders App component with Routes', () => {
  // Render the component
  render(<App />);
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
});
