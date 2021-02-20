import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={HomeScreen} />
    </Router>
  );
};

export default App;
