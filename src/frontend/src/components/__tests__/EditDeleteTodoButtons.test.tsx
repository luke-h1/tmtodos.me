import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditDeleteTodoButtons from '../EditDeleteTodoButtons';

describe('EditDeleteTodoButtons', () => {
  it('should delete a todo', () => {
    const mockDeleteTodo = jest.fn();
    render(
      <BrowserRouter>
        <EditDeleteTodoButtons id={1} userId={1} onDelete={mockDeleteTodo} />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId('delete-todo'));
    expect(mockDeleteTodo).toHaveBeenCalled();
  });

  it('should render correctly', () => {
    const mockDeleteTodo = jest.fn();
    render(
      <BrowserRouter>
        <EditDeleteTodoButtons id={1} userId={1} onDelete={mockDeleteTodo} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/todo/update/1');
    expect(screen.getByTestId('delete-todo')).toHaveAttribute(
      'aria-label',
      'Delete todo',
    );
  });
});
