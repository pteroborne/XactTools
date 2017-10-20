import React, {Component} from 'react';
import './Toast.scss';

export default class Parent extends Component{
  render(){
    return(
      <div className="notifications">
        <Toast message="This is a toast!"/>
        <Toast message="This is a very long toast. Look how long this toast is. Damn."/>
      </div>
    );
  }
}

class Toast extends Component{
  constructor(){
    super();
    this.state = {
      style: {marginRight: '-100px'}
    }
  }

  componentDidMount(){
    //Start timer until removal
    setTimeout(this.hide, 5000);

    //Start show animation
    setTimeout(this.show, 0);
  }

  show = ()=>{
    this.setState({style: {marginRight: '0px'}});
  }


  hide = ()=>{
    this.setState({style: {marginTop: '-41px'}});
  }

  render(){
    return(
      <div className="toast" style={this.state.style}>
        {this.props.message}
      </div>
    );
  }
}
