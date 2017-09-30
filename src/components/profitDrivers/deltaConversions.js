import React, {Component} from 'react';


export default class DeltaConversions extends Component {
  constructor(props){
    super(props);

    this.getTableDisplay = this.getTableDisplay.bind(this);
  }

  //Build table from result, data will be displayed and manipulated by graphs later
  getTableDisplay() {
    let trows = [];


    if(this.props.financialData) {
      
      let calcData = this.props.financialData.calcDriverTargets('conversions', this.props.pctConversions, this.props.vcConversions, this.props.fcConversions);
      
      let periodData = {
        currentConvRate: this.props.financialData.currentConversionRate().toFixed(2),
        targetConvRate: (calcData.impact + this.props.financialData.currentConversionRate()).toFixed(2),
        currentRevenues: this.props.financialData.incomeStatement.totalRevenues.toFixed(2),
        targetRevenues: calcData.revenues.toFixed(2),
        currentProfit: this.props.financialData.currentNetOpProfit().toFixed(2),
        targetProfit: calcData.profit.toFixed(2)
      }

      let annualizedData = {
        currentProfit: (periodData.currentProfit*12).toFixed(2),
        targetProfit: (periodData.targetProfit*12).toFixed(2)
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
          impact: periodData.targetProfit - periodData.currentProfit,
          pct: ((periodData.targetProfit/periodData.currentProfit-1)*100).toFixed(2)
        },
        annualized: {
          impact: annualizedData.targetProfit - annualizedData.currentProfit,
          pct: ((annualizedData.targetProfit/annualizedData.currentProfit-1)*100).toFixed(2)
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
          <td>${periodData.currentProfit}</td>
          <td>${periodData.targetProfit}</td>
          <td>{varianceData.incomes.impact}</td>
          <td>{varianceData.incomes.pct}</td>
        </tr>);
  
      trows.push(
        <tr key="row_annualized">
          <td><strong>Annualized</strong></td>
          <td>${annualizedData.currentProfit}</td>
          <td>${annualizedData.targetProfit}</td>
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
              <th></th>
              <th>Current Conversions</th>
              <th>Target Conversions</th>
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