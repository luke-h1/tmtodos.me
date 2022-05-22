import { Todo } from '../../context/AuthContext';
import Card from '../Card';
import { render, screen } from '@testing-library/react';

describe('card', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'title',
    body: 'todo body',
    completed: false,
    userId: 1,
    createdAt: '1',
    updatedAt: '1',
  };

  it('renders a card with a full todo', () => {
    render(<Card todo={mockTodo} />);

    expect(screen.getByTestId('todo-card')).toBeInTheDocument();
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.body)).toBeInTheDocument();
    expect(screen.getByTestId('todo-completed')).toEqual(false);
  });
});
