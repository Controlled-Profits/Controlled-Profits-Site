import React, {Component} from 'react';


export default class DeltaProductivity extends Component {
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
        currentProductivity: dataActual['sales_and_marketing']['prospects'],
        targetProductivity: this.props.calcHandler.getTargetIncrease('prospects', this.props.pctProductivity),
        currentRevenues: parseFloat(dataActual['income_statement']['total_revenues']).toFixed(2),
        targetRevenues: parseFloat(dataActual['income_statement']['total_revenues']).toFixed(2),
        currentIncome: this.props.calcHandler.getCurrentNetIncome()
      }

      let targetIncome = this.props.calcHandler.getTargetNetIncome('productivity', this.props.pctProductivity, periodData.targetRevenues, this.props.vcProductivity, this.props.fcProductivity);

      let annualizedData = {
        currentIncome: (periodData.currentIncome*12).toFixed(2),
        targetIncome: (targetIncome*12).toFixed(2)
      }

      let varianceData = {
        productivity: {
          impact: periodData.targetProductivity - periodData.currentProductivity,
          pct: ((periodData.targetProductivity/periodData.currentProductivity-1)*100).toFixed(2)
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
        <td><strong>Current Productivity</strong></td>
        <td>-{/* No idea what to fill this row with */}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
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
              <th>Current Productivity</th>
              <th>Target Productivity Impact</th>
              <th>Productivity Variance Impact</th>
              <th>Productivity Variance Pct</th>
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