import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeContext } from '../../context/ThemeContext';
import Header from './Header';

describe('Header', () => {
  it('renders header without site title, todo title or theme switcher', () => {
    render(
      <ThemeContext.Provider value={{ dark: false, toggleDark: () => null }}>
        <Header />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('darkmode-switch')).toBeInTheDocument();
  });

  it('renders the header with a title', () => {
    render(
      <ThemeContext.Provider value={{ dark: false, toggleDark: () => null }}>
        <Header title="My Title" />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toHaveTextContent('My Title');
    expect(screen.getByTestId('darkmode-switch')).toBeInTheDocument();
  });

  it('switches to dark mode when the theme switch button is clicked', () => {
    const mockToggleDark = jest.fn();

    render(
      <ThemeContext.Provider
        value={{ dark: false, toggleDark: mockToggleDark }}
      >
        <Header />
      </ThemeContext.Provider>,
    );
    fireEvent.click(screen.getByTestId('darkmode-switch'));
    expect(mockToggleDark).toHaveBeenCalled();
  });
});
