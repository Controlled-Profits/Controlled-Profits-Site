import React, {Component} from 'react';
import {finacialMarketingAndSalesDataInputArray} from 'financialData.js';

export default class FinancialInput extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="input-group col-md-6">
        <label>{this.props.title}</label>
        <span className="input-group-addon">$</span>
        <input type="text" className="form-control" onChange={this.props.handleInputChange} value={this.props.currentValue}/>
      </div>
    )
  }
}
