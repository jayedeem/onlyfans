import Main from './component/Main';
import React from 'react';
import { Provider } from './context';
import './App.css';

const App = () => {
  return (
    <Provider>
      <div>
        <Main />
      </div>
    </Provider>
  );
};
export default App;
