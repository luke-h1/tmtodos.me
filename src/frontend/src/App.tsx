import { H1 } from './components/Typography/TypeographyHeading';
import { ThemeProvider } from './context/ThemeContext';
import { globalStyles } from './styles/globalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<H1>Home</H1>} />
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
