import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
    this.state = {style: {
      //Hide toast until animation
      visibility: 'hidden'
    }}
  }

  componentDidMount(){
    //Find rendered width of element
    const width = ReactDOM.findDOMNode(this).offsetWidth;

    this.setState({style: {
      marginRight: '-'+width+'px',

      //Remove transition before toast is hidden
      transition: 'margin-right 0s'
    }}, ()=>{
      setTimeout(this.showToast, 0);
    });
  }

  showToast = ()=>{
    this.setState({style: {}}, ()=>{
      //Start timer until fade out
      setTimeout(this.hideToast, 5000);
    });
  }

  hideToast = ()=>{
    //Find height of element
    const height = ReactDOM.findDOMNode(this).offsetHeight;

    //Toggle animation
    this.setState({style: {
      marginTop: '-'+height+'px',
      boxShadow: 'none'
    }});
  }

  render(){
    return(
      <div className="toast" style={this.state.style}>
        {this.props.message}
      </div>
    );
  }
}
