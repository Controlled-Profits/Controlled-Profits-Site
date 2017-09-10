import React, {Component} from 'react';
import InputBlock from './inputBlock.js';

import finacialMarketingAndSalesDataInputArray from './financialData';

export default class IncomeStatement extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false,
      incomeBlock: []
    }
  }

  handleIncomeStatementClick() {
    this.setState({active: !this.state.active});
  }

  componentDidMount(){
    let results = finacialMarketingAndSalesDataInputArray;
    console.log(results);
    let incomeStatement = results.finacialMarketingAndSalesDataInputArray.map((input) => {
      console.log("input block component: ",input.sectionSubHeader);
      return(
        <div className='income-stat-input'>
          <h1>{input.sectionHeader}</h1>
          <InputBlock inputBlock={input.sectionSubHeader}/>
        </div>

      )
    })
    this.setState({incomeBlock: incomeStatement});
  }

  render(){

    return(
      <div className="input-block-container">
        {this.state.incomeBlock}
      </div>
    )
  }
}
