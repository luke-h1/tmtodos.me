import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';
import { Layout } from '../Layout';

describe('Layout', () => {
  it('renders correctly without variant', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Layout>Hello</Layout>
        </AuthContextProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders correctly with variant and children', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Layout variant="regular">Hello</Layout>
        </AuthContextProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
