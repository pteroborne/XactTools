import React, {Component} from 'react';
import './Sidebar.css';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div class="title">Preferences</div>
        <li>Credentials</li>
      </div>
    );
  }
}
