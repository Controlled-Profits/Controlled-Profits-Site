import React, {Component} from 'react';
import CalcHandler from '../calc/calcHandler';
import './styles.css';

export default class SalesAndMarketingSummary extends Component {
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

  render(){
    let date = this.dateFormatter(this.props.data.entryDate);
    console.log('date: ', date);
    return(
      <div>
        <h1>Sales & Marketing</h1>
        <table className="table-summary sales-table">
          <thead>
            <tr>
              <th>Sales & Marketing Data Input</th>
              <th className="amount-output">{date}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Prospects / Leads</td>
              <td className="amount-output">{this.inputNormalizer(this.props.sData.prospects)}</td>
            </tr>
            <tr>
              <td>Numer of Sales (Receipts)</td>
              <td className="amount-output">{this.inputNormalizer(this.props.sData.number_of_sales)}</td>
            </tr>
            <tr>
              <td>Marketing Spend (Direct-from P&L)</td>
              <td className="amount-output">{this.inputNormalizer(this.props.sData.marketing_spend)}</td>
            </tr>
            <tr>
              <td>Grand Total Units (Input)</td>
              <td className="amount-output">{this.inputNormalizer(this.props.sData.grand_total_units)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
