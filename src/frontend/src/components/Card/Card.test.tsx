import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders a card', () => {
    render(
      <Card data-testid="test-card">
        <Card.Body>Basic</Card.Body>
      </Card>,
    );
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
  });

  it('renders a basic card with a title', () => {
    render(
      <Card data-testid="test-card" title="title card">
        <Card.Body>Basic Card</Card.Body>
      </Card>,
    );
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Basic Card')).toBeInTheDocument();
    expect(screen.getByText('title card')).toBeInTheDocument();
  });

  it('renders a card with a header', () => {
    render(
      <Card data-testid="test-card">
        <Card.Header>Title</Card.Header>
        <Card.Body>Basic Card body</Card.Body>
      </Card>,
    );
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Basic Card body')).toBeInTheDocument();
  });

  it('renders a card with a header even when a title is specified', () => {
    render(
      <Card data-testid="test-card" title="title">
        <Card.Header>Title in card header</Card.Header>
        <Card.Body>Basic Card body</Card.Body>
      </Card>,
    );
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Basic Card body')).toBeInTheDocument();
    expect(screen.getByText('Title in card header')).toBeInTheDocument();
    expect(screen.queryByText('title')).not.toBeInTheDocument();
  });

  it('renders a card without a body', () => {
    render(<Card data-testid="test-card">Card</Card>);

    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
  });
});
