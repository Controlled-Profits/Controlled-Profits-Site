import React, {Component} from 'react';
import superagent from 'superagent';


export default class DeltaPrice extends Component {
  constructor(props){
    super(props);

    this.getTableDisplay = this.getTableDisplay.bind(this);
  }

  //Build table from result, data will be displayed and manipulated by graphs later
  getTableDisplay() {
    let trows = [];

    let dataActual = this.props.dataActual,
        dataAdjusted = this.props.dataAdjusted;


    if(dataActual && dataAdjusted && this.props.calcHandler && Object.keys(dataActual).length) {
      console.log(dataActual);
      console.log(dataAdjusted);

      let periodData = {
        currentPrice: this.props.calcHandler.getCurrentPPU().toFixed(2),
        targetPrice: this.props.calcHandler.getTargetPPU(this.props.pctPrice).toFixed(2),
        currentRevenues: parseFloat(dataActual['income_statement']['total_revenues']).toFixed(2),
        targetRevenues: this.props.calcHandler.getTargetRevenue('price', this.props.pctPrice).toFixed(2),
        currentIncome: this.props.calcHandler.getCurrentNetIncome()
      }

      let targetIncome = this.props.calcHandler.getTargetNetIncome('price', this.props.pctPrice, periodData.targetRevenues, this.props.vcPrice, this.props.fcPrice);

      let annualizedData = {
        currentIncome: (periodData.currentIncome*12).toFixed(2),
        targetIncome: (targetIncome*12).toFixed(2)
      }

      let varianceData = {
        price: {
          impact: periodData.targetPrice - periodData.currentPrice,
          pct: ((periodData.targetPrice/periodData.currentPrice-1)*100).toFixed(2)
        },
        revenues: {
          impact: periodData.targetRevenues - periodData.currentRevenues,
          pct: ((periodData.targetRevenues/periodData.currentRevenues-1)*100).toFixed(2)
        },
        incomes: {
          impact: targetIncome - periodData.currentIncome,
          pct: ((targetIncome/periodData.currentIncome-1)*100).toFixed(2)
        },
        annualized: {
          impact: annualizedData.targetIncome - annualizedData.currentIncome,
          pct: ((annualizedData.targetIncome/annualizedData.currentIncome-1)*100).toFixed(2)
        }
      }

      trows.push(
      <tr key="row_prospects">
        <td><strong>Price Per Unit</strong></td>
        <td>${periodData.currentPrice}</td>
        <td>${periodData.targetPrice}</td>
        <td>{varianceData.price.impact}</td>
        <td>{varianceData.price.pct}</td>
      </tr>);

      trows.push(
      <tr key="row_revenues">
        <td><strong>Sales Revenues</strong></td>
        <td>${periodData.currentRevenues}</td>
        <td>${periodData.targetRevenues}</td>
        <td>{varianceData.revenues.impact}</td>
        <td>{varianceData.revenues.pct}</td>
      </tr>);

      trows.push(
        <tr key="row_profit">
          <td><strong>Profit (Net Income)</strong></td>
          <td>${periodData.currentIncome}</td>
          <td>${targetIncome}</td>
          <td>{varianceData.incomes.impact}</td>
          <td>{varianceData.incomes.pct}</td>
        </tr>);

      trows.push(
        <tr key="row_annualized">
          <td><strong>Annualized</strong></td>
          <td>${annualizedData.currentIncome}</td>
          <td>${annualizedData.targetIncome}</td>
          <td>{varianceData.annualized.impact}</td>
          <td>{varianceData.annualized.pct}</td>
        </tr>);
    }


    trows = <tbody>{trows}</tbody>

    return(
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Reporting Summary</th>
              <th>Current Price Per Unit</th>
              <th>Target Price Per Unit</th>
              <th>PPU Variance Impact</th>
              <th>PPU Variance Pct</th>
            </tr>
          </thead>
          {trows}
        </table>
      </div>
    )
  }

  render(){
    return(
      <div className="delta-prospects-container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Driver Impact Summary</h3>
          </div>
          <div className="panel-body">
            {this.getTableDisplay()}
          </div>
        </div>
      </div>
    )
  }
}
