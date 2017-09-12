import React, {Component} from 'react';
import '../../styles/financials.css';

export default class FinancialInput extends Component{
  render(){
    return(
      <div className="input-group financial-input" key={this.props.id}>
        <label className="input-group-addon financial-title">{this.state.title}</label>
        <span className="input-group-addon">$</span>
        <input type="text" className="form-control" onChange={this.handleCurrentValueChange.bind(this)} value={this.state.currentValue} placeholder={this.props.currentValue}/>
      </div>
    )
  }
}
