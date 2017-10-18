import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.scss';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="title">Preferences</div>
        <Link to="/credentials"><li>Credentials</li></Link>
      </div>
    );
  }
}
