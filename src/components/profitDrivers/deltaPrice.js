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
        currentConvRate: this.props.calcHandler.getCurrentConversionRate().toFixed(2),
        targetConvRate: this.props.calcHandler.getTargetConversionRate(this.props.pctConversions).toFixed(2),
        currentRevenues: parseFloat(dataActual['income_statement']['total_revenues']).toFixed(2),
        targetRevenues: this.props.calcHandler.getTargetRevenue('conversions', this.props.pctConversions).toFixed(2),
        currentIncome: this.props.calcHandler.getCurrentNetIncome(),

      }

      let targetIncome = this.props.calcHandler.getTargetNetIncome('conversions', this.props.pctConversions, periodData.targetRevenues, this.props.vcConversions, this.props.fcConversions)

      let annualizedData = {
        currentIncome: (periodData.currentIncome*12).toFixed(2),
        targetIncome: (targetIncome*12).toFixed(2)
      }

      let varianceData = {
        prospects: {
          impact: periodData.targetConvRate - periodData.currentConvRate,
          pct: ((periodData.targetConvRate/periodData.currentConvRate-1)*100).toFixed(2)
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
        <td><strong>Conversion Rate</strong></td>
        <td>{periodData.currentConvRate}%</td>
        <td>{periodData.targetConvRate}%</td>
        <td>{varianceData.prospects.impact}</td>
        <td>{varianceData.prospects.pct}</td>
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
              <th>Current Conversions</th>
              <th>Target Conversions Impact</th>
              <th>Conversions Variance Impact</th>
              <th>Conversions Variance Pct</th>
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
