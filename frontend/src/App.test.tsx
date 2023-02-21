import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  window.matchMedia = jest
    .fn()
    .mockReturnValue({ addListener: jest.fn(), removeListener: jest.fn() });

  render(<App />);

  const headerTitleElement = screen.getByText('Loans that won’t make you poor');
  expect(headerTitleElement).toBeInTheDocument();
});
