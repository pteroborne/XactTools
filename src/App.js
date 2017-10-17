import React, { Component } from 'react';

//Components
import Sidebar from './Sidebar';

export default class App extends Component {
  render(){
    return (
      <div className="root_body">
        <Sidebar/>
      </div>
    );
  }
}
