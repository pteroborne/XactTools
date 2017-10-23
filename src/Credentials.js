import React, {Component} from 'react';
import {xaLogin} from './global/login';

export default class Credentials extends Component{
  constructor(){
    super();
    this.state = {
      xid_disabled: false
    }
  }

  save = (e)=>{
    //Get input values
    const id = e.target.id;
    const user = e.target.closest('.section').querySelector('#'+id+'_user').value.trim();
    const pass = e.target.closest('.section').querySelector('#'+id+'_pass').value.trim();

    //Stop if either values null
    if(!user || !pass){
      return
    }

    //Store credentials in storage
    localStorage.setItem(id+'_creds', JSON.stringify({
      user: user,
      pass: pass
    }));

    //Test XA login
    if(id === 'xid'){
      //Disable inputs
      this.setState({xid_disabled: true});

      //Test XA login
      xaLogin((success, reason)=>{

        //Remove disabled
        this.setState({xid_disabled: false});

        if(success){
          window.toast('Login successful');
        }else{
          window.toast(reason || 'Login failed');

          //Remove credentials
          localStorage.removeItem('xid_creds');
        }
      });
    }
  }

  render(){
    return (
      <div className="body">
        <div className="section">
          <div className="title">Xactware ID</div>
          <label htmlFor="xid_user">Email</label>
          <input id="xid_user" type="email" disabled={this.state.xid_disabled}/>
          <label htmlFor="xid_pass">Password</label>
          <input id="xid_pass" type="password" disabled={this.state.xid_disabled}/>
          <div id="xid" className={this.state.xid_disabled ? 'btn disabled' : 'btn'} onClick={this.save}>Save</div>
        </div>
        <div className="section">
          <div className="title">Blue Tool</div>
          <label htmlFor="bt_user">Username</label>
          <input id="bt_user" type="text"/>
          <label htmlFor="bt_pass">Password</label>
          <input id="bt_pass" type="password"/>
          <div id="bt" className="btn" onClick={this.save}>Save</div>
        </div>
      </div>
    );
  }
}
