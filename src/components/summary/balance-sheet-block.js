import React, {Component} from 'react';
import CalcHandler from '../calc/calcHandler';

export default class BalanceSheetSummary extends Component {
  constructor(props){
    super(props);

    this.startCalcHandler();
  }

  startCalcHandler(){
    this.ch = new CalcHandler(this.props.data);
  }

  render(){
    return(
      <div>
        <h1>Balance Sheet</h1>
      </div>
    )
  }
}
