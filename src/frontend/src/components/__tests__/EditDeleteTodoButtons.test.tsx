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
});
