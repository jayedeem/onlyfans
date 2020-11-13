import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './component/Main';
// import './App.css';
require('dotenv').config();

const App = () => {
  return (
    <Router>
      <div>
        <Main />
      </div>
    </Router>
  );
};
export default App;
