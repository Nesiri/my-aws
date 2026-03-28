import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is AWS-S3 deployed react app/i);
  expect(linkElement).toBeInTheDocument();
});
