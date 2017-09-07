import React, {Component} from 'react';

import finacialMarketingAndSalesDataInputArray from './financialData.js';

export default class IncomeStatement extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false,
      inputBlock: []
    }
  }

  handleIncomeStatementClick() {
    this.setState({active: !this.state.active});
  }

  componentDidMount(){
    let results = finacialMarketingAndSalesDataInputArray;
    console.log(results);
  }

  render(){

    return(
      <div className="input-block-container">


      </div>
    )
  }
}
