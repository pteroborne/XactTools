import React, {Component} from 'react';
import {xaLogin} from './global/login';

export default class Credentials extends Component{
  constructor(){
    super();
    this.state = {
      xid_disabled: false
    }
  }

  saveXID = (e)=>{
    e.preventDefault();

    //Find values
    const user = e.target.elements.user.value.trim();
    const pass = e.target.elements.pass.value.trim();

    //Check if values are null
    if(!user || !pass){
      return;
    }

    //Check if email is valid
    if(!user.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
      e.target.elements.user.focus();
      window.toast('Invalid email address');
      return;
    }

    //Disable inputs
    this.setState({xid_disabled: true});

    //Store credentials in storage
    localStorage.setItem('xid_creds', JSON.stringify({
      user: user,
      pass: pass
    }));

    //Test credentials
    xaLogin((success, reason)=>{
      //Enable inputs
      this.setState({xid_disabled: false});

      if(success){
        window.toast('Credentials saved');
      }else{
        window.toast(reason || 'Login failed');

        //Remove credentials
        localStorage.removeItem('xid_creds');
      }

    });
  }

  render(){
    return (
      <div className="body">
        <div className="section">
        <div className="title">Xactware ID</div>
          <form onSubmit={this.saveXID}>
            <label>
              Email
              <input name="user" disabled={this.state.xid_disabled}/>
            </label>
            <label>
              Password
              <input name="pass" type="password" disabled={this.state.xid_disabled}/>
            </label>
            <div className="actions">
              <button id="xid" className={this.state.xid_disabled ? 'btn disabled' : 'btn'} type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
