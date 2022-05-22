import Card from '../Card';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Todo, TodoContextProvider } from '../../context/TodoContext';

describe('card', () => {
  const mockTodo: Todo = {
    id: 1,
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
        <TodoContextProvider>
          <Card todo={mockTodo} />
        </TodoContextProvider>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('todo-card')).toBeInTheDocument();
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.body)).toBeInTheDocument();
  });
});
