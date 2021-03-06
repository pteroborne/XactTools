import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import Sidebar from './Sidebar';
import Credentials from './Credentials';
import Toast from './Toast';

export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="root_body">
          <Sidebar/>
          <Switch>
            <Route path="/credentials" component={Credentials}/>
          </Switch>
          <Toast/>
        </div>
      </BrowserRouter>
    );
  }
}
