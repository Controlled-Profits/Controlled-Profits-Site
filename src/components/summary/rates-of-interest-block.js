import React, {Component} from 'react';
import CalcHandler from '../calc/calcHandler';
import './styles.css';

export default class RatesOfInterestSummary extends Component {
  constructor(props){
    super(props);

    this.startCalcHandler();
  }

  startCalcHandler(){
    this.ch = new CalcHandler(this.props.data);
  }

  inputNormalizer(x){
    if(x === null || x === undefined){
      x = 0;
    }
    let xx = parseFloat(x);
    return xx.toFixed(2);
  }

  dateFormatter(date){
    let dateFor = date.split('T');
    let temp = dateFor[0].split('-');
    let currentDate = temp[1] + "-" + temp[2] + '-' + temp[0];
    return currentDate;
  }

  percentNormalizer(input){
    let percent = input.split('.');
    // let per = percent[1].split('');
    // if(per.length > 2){
    //   for(let i = 0; i )
    //   percent = per[0] + per[1] + '.'
    // }
    return percent[1] + '%';
  }

  render(){
    let date = this.dateFormatter(this.props.data.entryDate);
    return(
      <div>
        <h1 className="section-title">Financial Rates of Interest</h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Financial Rates of Interest</th>
              <th>{date}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="field-title">Average Interest Rate Paid (Debt)</td>
              <td className="amount-output">{this.percentNormalizer(this.props.iData.airp_debt)}</td>
            </tr>
            <tr>
              <td className="field-title">Average Interest Rate Paid (Equity)</td>
              <td className="amount-output">{this.percentNormalizer(this.props.iData.airp_equity)}</td>
            </tr>
            <tr>
              <td className="field-title">Average Interest Rate Charged for Financing</td>
              <td className="amount-output">{this.percentNormalizer(this.props.iData.airc_for_financing)}</td>
            </tr>
            <tr>
              <td className="field-title">Corporate Tax Rate</td>
              <td className="amount-output">{this.percentNormalizer(this.props.iData.corp_tax_rate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
