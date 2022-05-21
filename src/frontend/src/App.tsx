import { H1 } from './components/Typography/TypeographyHeading';
import { ThemeProvider } from './context/ThemeContext';
import { globalStyles } from './styles/globalStyles';

const App = () => {
  globalStyles();
  return (
    <ThemeProvider>
      <H1>Hello</H1>
    </ThemeProvider>
  );
};

export default App;
