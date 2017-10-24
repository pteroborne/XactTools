import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Toast.scss';

export default class ToastContainer extends Component{
  constructor(){
    super();
    this.state = {toasts: [
      {message: 'This is a toast!', display: true},
      {message: 'This is a very long toast. Look how long this toast is. Damn.', display: true}
    ]}
  }

  //Set global function for toasting
  componentDidMount(){
    window.toast = this.sendToast;
  }

  sendToast = (msg)=>{
    this.setState({toasts: this.state.toasts.concat({message: msg, display: true})});
  }

  removeToast = (i)=>{
    //Find transition time of fade out
    const time = getComputedStyle(ReactDOM.findDOMNode(i)).transition.match(/margin-top ([0-9]+)/)[1] * 1000;

    //Start timer until removal
    setTimeout(()=>{
      //Store current toasts
      const toasts = this.state.toasts;
      toasts[i.props.id].display = false;
      this.setState({toasts: toasts});
    }, time);
  }

  render(){
    let renderedToasts = [];

    //Render each toast in state
    for(let i = 0; i < this.state.toasts.length; i++){
      if(this.state.toasts[i].display){
        renderedToasts.push(<Toast message={this.state.toasts[i].message} key={i} id={i} removeToast={this.removeToast}/>);
      }
    }

    return(
      <div className="notifications">
        {renderedToasts}
      </div>
    );
  }

  //Remove global function
  componentWillUnmount(){
    delete window.toast;
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
    //Check if element has been removed
    try{
      if(!ReactDOM.findDOMNode(this)){
        return;
      }
    }catch(Error){
      return;
    }

    //Find top margin of element
    const margin = parseInt(getComputedStyle(ReactDOM.findDOMNode(this)).marginTop);

    //Find height of element
    const height = ReactDOM.findDOMNode(this).getBoundingClientRect().bottom - margin;

    //Toggle animation
    this.setState({style: {
      marginTop: '-'+height+'px',
      boxShadow: 'none'
    }}, ()=>{this.props.removeToast(this)});
  }

  render(){
    return(
      <div className="toast" style={this.state.style}>
        {this.props.message}
        <svg onClick={this.hideToast} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    );
  }
}
