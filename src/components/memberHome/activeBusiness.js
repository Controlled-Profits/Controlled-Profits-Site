import React, {Component} from 'react';

export default class ActiveBusiness extends Component {
  constructor(props){
    super(props);
    this.state={
      active: '',
      activeBid: ''
    }
  }

  render(){

    return(
      <div className="userBusiness-name">
        <button className="btn btn-primary" onClick={this.handleActiveClick.bind(this)}>Change Active Business</button>
      </div>
    )
  }
}
