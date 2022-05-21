import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const KEY = 'mode';

const ThemeContextState = {
  dark: false,
  toggleDark: () => {},
};

export const ThemeContext = createContext(ThemeContextState);

export const useTheme = () => {
  return useContext(ThemeContext);
};

const storage = {
  get: (init?: Theme) => window.localStorage.getItem(KEY) || init,
  set: (value: Theme) => window.localStorage.setItem(KEY, value),
};

const supportsDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches === true;
};

const useDarkMode = (): [Theme, (theme?: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const setThemeEnchanched = (themeValue?: Theme) => {
    setTheme(prevState => {
      const nextState = themeValue
        ? themeValue
        : prevState === Theme.LIGHT
        ? Theme.DARK
        : Theme.LIGHT;

      document.body.classList.remove('tmtodos-' + prevState);
      document.body.classList.add('tmtodos-' + nextState);
      storage.set(nextState);
      return nextState;
    });
  };

  useEffect(() => {
    const storedTheme = storage.get();

    if (
      !storedTheme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches === true
    ) {
      return setThemeEnchanched(Theme.DARK);
    }

    if (!storedTheme || storedTheme === theme) {
      return;
    }
    setThemeEnchanched();
  }, [theme]);
  return [theme, setThemeEnchanched];
};

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setThemeEnchanced] = useDarkMode();

  const toggleDark = useCallback(() => {
    setThemeEnchanced();
  }, [setThemeEnchanced]);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        setThemeEnchanced(e.matches ? Theme.DARK : Theme.LIGHT);
      });
  }, [setThemeEnchanced, toggleDark]);

  return (
    <ThemeContext.Provider value={{ dark: theme === Theme.DARK, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
