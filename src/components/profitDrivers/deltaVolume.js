import React, {Component} from 'react';


export default class DeltaVolume extends Component {
  constructor(props){
    super(props);

    this.getTableDisplay = this.getTableDisplay.bind(this);
  }

  //Build table from result, data will be displayed and manipulated by graphs later
  getTableDisplay() {
    let trows = [];

    if(this.props.financialData) {
      
      let calcData = this.props.financialData.calcDriverTargets('volume', this.props.pctVolume, this.props.vcVolume, this.props.fcVolume);
      
      let periodData = {
        currentGTU: this.props.financialData.salesAndMarketing.grandTotalUnits.toFixed(2),
        targetGTU: (calcData.impact + this.props.financialData.salesAndMarketing.grandTotalUnits).toFixed(2),
        currentRevenues: this.props.financialData.currentRevenues().toFixed(2),
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
          impact: periodData.targetGTU - periodData.currentGTU,
          pct: ((periodData.targetGTU/periodData.currentGTU-1)*100).toFixed(2)
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
        <td><strong>Grand Total Units</strong></td>
        <td>${periodData.currentGTU}</td>
        <td>${periodData.targetGTU}</td>
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
              <th>Current GTU</th>
              <th>Target GTU</th>
              <th>GTU Variance Impact</th>
              <th>GTU Variance Pct</th>
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