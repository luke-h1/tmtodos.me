import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />

      <Route exact path="/about" component={AboutPage} />

    </Router>
  );
};

export default App;
