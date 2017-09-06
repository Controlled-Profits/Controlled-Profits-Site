import React, {Component} from 'react';

export default class IncomeStatement extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="input-block-container">
        <button onClick={this.handleIncomeStatementClick.bind(this)}><h2 className="income-statement-header">Income Statement Data Input</h2></button>

        <div className="input-group">
          <span className="input-group-addon">$</span>
          <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
          <span className="input-group-addon">.00</span>
        </div>
      </div>
    )
  }
}
