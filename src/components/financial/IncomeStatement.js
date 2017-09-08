import React, {Component} from 'react';

import finacialMarketingAndSalesDataInputArray from './financialData';
import FinancialInput from './inputFinance.js';

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
    let incomeStatement = results.finacialMarketingAndSalesDataInputArray.map((input) => {
      let subHeaderCard = input.sectionSubHeader.map((subSection) => {
        let fieldCard = subSection.fields.map((subFields) => {
          return(
            <FinancialInput title={subFields.title} currentValue={subFields.value}/>
          )
        })
        return(
          <div>
            <h4>{subSection.header}</h4>
              {fieldCard}
          </div>
        )
      })
      return(
        <div className='income-stat-input'>
          <h2>{input.sectionHeader}</h2>
            {subHeaderCard}
        </div>

      )
    })
    this.setState({inputBlock: incomeStatement});
  }

  render(){

    return(
      <div className="input-block-container">
        {this.state.inputBlock}
      </div>
    )
  }
}
