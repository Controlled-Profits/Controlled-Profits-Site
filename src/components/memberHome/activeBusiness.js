import React, {Component} from 'react';

export default class ActiveBusiness extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="userBusiness-name">
        <h1 className="active-business">{this.props.activBusiness}</h1>
      </div>
    )
  }
}
