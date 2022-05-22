import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import HomePage from './pages/Home';
import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import TodoCreatePage from './pages/todos/create';
import ProtectedRoute from './components/ProtectedRoute';
import TodoUpdatePage from './pages/todos/update';
import TodoSlugPage from './pages/todos/slug';
import { TodoContextProvider } from './context/TodoContext';
import ForbiddenPage from './pages/forbidden';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <AuthContextProvider>
          <TodoContextProvider>
            <Routes>
              {/* <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
              </Route> */}

              <Route path="/" element={<HomePage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />

              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/todo/create" element={<ProtectedRoute />}>
                <Route path="/todo/create" element={<TodoCreatePage />} />
              </Route>

              <Route path="/todo/:id" element={<ProtectedRoute />}>
                <Route path="/todo/:id" element={<TodoSlugPage />} />
              </Route>

              <Route path="/todo/update/:id" element={<ProtectedRoute />}>
                <Route path="/todo/update/:id" element={<TodoUpdatePage />} />
              </Route>
            </Routes>
          </TodoContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
