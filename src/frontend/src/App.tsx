import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import HomePage from './pages/Home';
import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import theme from './styles/theme';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
