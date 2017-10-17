import React, {Component} from 'react';
import './Sidebar.scss';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="title">Preferences</div>
        <li>Credentials</li>
      </div>
    );
  }
}
