import React, {Component} from 'react';
import superagent from 'superagent';


export default class DeltaProspects extends Component {
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
      console.log(this.props.pctProspects)

      trows.push( 
      <tr key="row_prospects">
        <td><strong>Current Prospects/Leads</strong></td>
        <td>{dataActual['sales_and_marketing']['prospects']}</td>
        <td>{this.props.calcHandler.getTargetIncrease('prospects', this.props.pctProspects)}</td>
        <td></td>
        <td></td>
      </tr>);
  
      trows.push(
      <tr key="row_revenues">
        <td><strong>Sales Revenues</strong></td>
        <td>${parseFloat(dataActual['income_statement']['total_revenues']).toFixed(2)}</td>
        <td>${this.props.calcHandler.getTargetRevenue('prospects', this.props.pctProspects)}</td>
        <td></td>
        <td></td>
      </tr>);
  
      trows.push(
        <tr key="row_profit">
          <td><strong>Profit (Net Income)</strong></td>
          <td>${this.props.calcHandler.getCurrentNetIncome()}</td>
          <td>${this.props.calcHandler.getTargetNetIncome('prospects', this.props.pctProspects, this.props.vcProspects, this.props.fcProspects)}</td>
          <td></td>
          <td></td>
        </tr>);
  
      trows.push(
        <tr key="row_annualized">
          <td><strong>Annualized</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>);
    }


    trows = <tbody>{trows}</tbody>

    return(
      <div>
        <h4>Current</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Reporting Summary</th>
              <th>Current Prospects</th>
              <th>Target Prospects Impact</th>
              <th>Prospects Variance Impact</th>
              <th>Prospects Variance Pct</th>
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