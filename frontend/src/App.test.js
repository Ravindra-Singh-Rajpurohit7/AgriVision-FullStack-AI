import { render, screen } from '@testing-library/react';
import App from './App';

test('renders agrivision dashboard title', () => {
  render(<App />);
  // Naye UI ke hisab se title check karega
  const titleElement = screen.getByText(/AgriVision/i);
  expect(titleElement).toBeInTheDocument();
});