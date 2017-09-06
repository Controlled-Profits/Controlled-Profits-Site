import React, {Component} from 'react';

export default class BalanceSheet extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="balance-sheet-container">

        <div className="input-group">
          <span className="input-group-addon">$</span>
          <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
          <span className="input-group-addon">.00</span>
        </div>
      </div>
    )
  }
}
