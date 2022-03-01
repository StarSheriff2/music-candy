import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search results', () => {
  render(<App />);
  const linkElement = screen.getByText(/Find music/i);
  expect(linkElement).toBeInTheDocument();
});
