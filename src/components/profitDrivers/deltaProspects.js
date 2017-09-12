import React, {Component} from 'react';
import superagent from 'superagent';
import DataParser from '../api/dataParser.js';


export default class DeltaProspects extends Component {
  constructor(props){
    super(props);

    this.getDataActual = this.getDataActual.bind(this);
    this.getDataAdjusted = this.getDataAdjusted.bind(this);
    this.getTableDisplay = this.getTableDisplay.bind(this);
    this.dp = null;

    this.state = {
      dataActual: {},
      dataAdjusted: {}
    }

    this.init();
  }

  // Ideally this would run in the AppHomeBox, and then every app that inherits it
  // could just run dp's functions without having to put in four different credentials every time.
  init() {
    let accessToken = localStorage.getItem('Access-Token');
    let client = localStorage.getItem('Client');
    let tokenType = localStorage.getItem('Token-Type');
    let uid = localStorage.getItem('Uid');

    this.dp = new DataParser('http://controlledprofits.herokuapp.com/', accessToken, client, uid);
  }

  getDataActual(businessId) {
    this.dp.getBusinessDataEntries(businessId, 'actual')
      .then(function(objArray) {
        this.setState({dataActual: objArray[0]});
      }.bind(this))

      .catch((err) => {
        console.log(err);
      })
  }

  getDataAdjusted(businessId) {
    this.dp.getBusinessDataEntries(businessId, 'adjusted') 
      .then(function(objArray) {
        if(objArray.length)
          this.setState({dataAdjusted: objArray[0]});
        else 
          //If there is no stored adjusted data, initially set adjusted data to equal current
          this.setState({dataAdjusted: this.state.dataActual})
      }.bind(this))

      .catch(function(err) {
        console.log(err);
      })
  }

  //Build table from result, data will be displayed and manipulated by graphs later
  getTableDisplay() {

    let trows = [];
    
    
    let dataActual = this.state.dataActual,
        dataAdjusted = this.state.dataAdjusted;

    if(dataActual && dataAdjusted && Object.keys(dataActual).length) {

    }

    trows.push( 
    <tr key="row_prospects">
      <td><strong>Current Prospects/Leads</strong></td>
      <td>{dataActual['sales_and_marketing']['prospects']}</td>
      <td>{dataAdjusted['sales_and_marketing']['prospects']}</td>
      <td></td>
      <td></td>
    </tr>);

    trows.push(
    <tr key="row_revenues">
      <td><strong>Revenues</strong></td>
      <td></td>
      <td>{dataAdjusted['sales_and_marketing']['prospects']}</td>
      <td></td>
      <td></td>
    </tr>);

    trows.push(
      <tr key="row_profit">
        <td><strong>Profit (Net Income)</strong></td>
        <td></td>
        <td>{dataAdjusted['sales_and_marketing']['prospects']}</td>
        <td></td>
        <td></td>
      </tr>);

    trows.push(
      <tr key="row_annualized">
        <td><strong>Annualized</strong></td>
        <td></td>
        <td>{dataAdjusted['sales_and_marketing']['prospects']}</td>
        <td></td>
        <td></td>
      </tr>);

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

  componentDidMount() {

    //Could probably call for just a section and certain date here, just add the arguments
    this.dp.getUser()
      .then(function(obj) {
        this.getDataActual(obj.activeBusinessId);
        this.getDataAdjusted(obj.activeBusinessId);
      }.bind(this))

      .catch(function(err) {
        this.setState({dataEntries: [], errorMessage: err});
      }.bind(this));
  }

  render(){
    return(
      <div className="delta-prospects-container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Delta Prospects</h3>
          </div>
          <div className="panel-body">
            {this.getTableDisplay()}
          </div>
        </div>
      </div>
    )
  }
}