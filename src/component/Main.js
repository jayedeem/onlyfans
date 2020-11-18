import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './Home';
import Navbar from './Navbar';
import Users from './Users';
import UserProfile from './UserProfile';
import CreateUser from './CreateUser';

const Main = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/createuser" component={CreateUser} />
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
