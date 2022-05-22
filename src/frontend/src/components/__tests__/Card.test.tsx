import { Todo } from '../../context/AuthContext';
import Card from '../Card';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('card', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'title',
    body: 'todo body',
    completed: false,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('renders a card with a full todo', () => {
    render(
      <BrowserRouter>
        <Card todo={mockTodo} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('todo-card')).toBeInTheDocument();
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.body)).toBeInTheDocument();
  });
});
