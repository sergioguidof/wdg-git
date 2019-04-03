import React, { Component } from 'react';
import Routes from './routes';
import Main from './pages/main';

import './styles.css';
import Header from './components/header';

const App = () => (
  <div className="App">
    <Header />
    <div className="container-fluid">
      <Routes />
    </div>
  </div>
);

export default App;
