import React, {Component} from 'react';


export default class DeltaEfficiency extends Component {
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
        currentFC: this.props.calcHandler.getCurrentFixedExpenses().toFixed(2),
        targetFC: this.props.calcHandler.getEfficiencyTargetFixedExpenses(this.props.pctEfficiency, this.props.fcEfficiency).toFixed(2),
        currentRevenues: parseFloat(dataActual['income_statement']['total_revenues']).toFixed(2),
        targetRevenues: this.props.calcHandler.getTargetRevenue('efficiency', this.props.pctEfficiency),
        currentIncome: this.props.calcHandler.getCurrentNetIncome()
      }

      let targetIncome = this.props.calcHandler.getTargetNetIncome('efficiency', this.props.pctEfficiency, periodData.targetRevenues, this.props.vcEfficiency, this.props.fcEfficiency);

      let annualizedData = {
        currentIncome: (periodData.currentIncome*12).toFixed(2),
        targetIncome: (targetIncome*12).toFixed(2)
      }

      let varianceData = {
        fixedCost: {
          impact: periodData.targetFC - periodData.currentFC,
          pct: ((periodData.targetFC/periodData.currentFC-1)*100).toFixed(2)
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
        <td><strong>Fixed Cost</strong></td>
        <td>{periodData.currentFC}</td>
        <td>{periodData.targetFC}</td>
        <td>{varianceData.fixedCost.impact}</td>
        <td>{varianceData.fixedCost.pct}</td>
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
              <th>Current Fixed Cost</th>
              <th>Target Fixed Cost Impact</th>
              <th>Fixed Cost Variance Impact</th>
              <th>Fixed Cost Variance Pct</th>
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