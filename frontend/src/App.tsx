import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomeScreen from './screens/HomeScreen';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={HomeScreen} />

      <h1>Hello</h1>
    </Router>
  );
};

export default App;
