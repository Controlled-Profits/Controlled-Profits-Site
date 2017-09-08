import React, {Component} from 'react';

import IncomeStatement from './IncomeStatement.js';


export default class FinancialMarketingSalesDataInput extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div>
        <IncomeStatement/>
      </div>
    )
  }
}
