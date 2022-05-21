import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders basic button', () => {
    render(<Button variant="primary">Yo</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Yo')).toBeInTheDocument();
  });

  it('renders a button with startIcon', () => {
    render(
      <Button variant="primary" startIcon={<svg data-testid="icon"></svg>}>
        Test
      </Button>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders a button with endIcon', () => {
    render(
      <Button variant="primary" endIcon={<svg data-testid="icon"></svg>}>
        Test
      </Button>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders an icon button', () => {
    render(<Button variant="icon" icon={<svg data-testid="icon"></svg>} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
