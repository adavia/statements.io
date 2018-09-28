import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Public from './layouts/Public';
import Private from './layouts/Private';

import LoginView from './auth/LoginView';
import UserNewView from './users/UserNewView';
import StatementListView from './statements/StatementListView';
import StatementShowView from './statements/StatementShowView';
import CategoryShowView from './categories/CategoryShowView';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Private path="/" exact component={StatementListView} />
          <Private path="/statements/:id" exact component={StatementShowView} />
          <Private path="/chat/:id" exact component={CategoryShowView} />
          <Public path="/auth/login" exact component={LoginView} />
          <Public path="/users/new" exact component={UserNewView} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App; 
