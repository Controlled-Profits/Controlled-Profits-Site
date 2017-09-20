import React, {Component} from 'react';


export default class DeltaVolume extends Component {
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
        currentVolume: this.props.calcHandler.getCurrentVolume(),
        targetVolume: this.props.calcHandler.getDirectIncrease(this.props.calcHandler.getCurrentVolume(), this.props.pctVolume),
        currentRevenues: parseFloat(dataActual['income_statement']['total_revenues']).toFixed(2),
        targetRevenues: this.props.calcHandler.getTargetRevenue('volume', this.props.pctVolume).toFixed(2),
        currentIncome: this.props.calcHandler.getCurrentNetIncome()
      }

      let targetIncome = this.props.calcHandler.getTargetNetIncome('volume', this.props.pctVolume, periodData.targetRevenues, this.props.vcVolume, this.props.fcVolume)

      let annualizedData = {
        currentIncome: (periodData.currentIncome*12).toFixed(2),
        targetIncome: (targetIncome*12).toFixed(2)
      }

      let varianceData = {
        volume: {
          impact: periodData.targetVolume - periodData.currentVolume,
          pct: ((periodData.targetVolume/periodData.currentVolume-1)*100).toFixed(2)
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
        <td><strong>Current Volume</strong></td>
        <td>{periodData.currentVolume}</td>
        <td>{periodData.targetVolume}</td>
        <td>{varianceData.volume.impact}</td>
        <td>{varianceData.volume.pct}</td>
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
              <th>Current Volume</th>
              <th>Target Volume Impact</th>
              <th>Volume Variance Impact</th>
              <th>Volume Variance Pct</th>
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