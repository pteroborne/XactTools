import React, {Component} from 'react';

export default class Credentials extends Component {
  render() {
    return (
      <div className="body">
        <div className="section">
          <div className="title">Xactware ID</div>
          <label htmlFor="xid_user">Email</label>
          <input id="xid_user" type="email"/>
          <label htmlFor="xid_pass">Password</label>
          <input id="xid_pass" type="password"/>
          <div id="xid_save" className="btn">Save</div>
        </div>
        <div className="section">
          <div className="title">Blue Tool</div>
          <label htmlFor="bt_user">Username</label>
          <input id="bt_user" type="text"/>
          <label htmlFor="bt_pass">Password</label>
          <input id="bt_pass" type="password"/>
          <div id="bt_save" className="btn">Save</div>
        </div>
      </div>
    );
  }
}
