import React, {Component} from 'react';
import superagent from 'superagent';
import DataParser from '../api/dataParser.js';


export default class DeltaProspects extends Component {
  constructor(props){
    super(props);

    this.getDataEntries = this.getDataEntries.bind(this);
    this.getTableDisplay = this.getTableDisplay.bind(this);
    this.dp = null;

    this.state = {
      dataEntries: []
    }

    this.init();
  }

  init() {
    let accessToken = localStorage.getItem('Access-Token');
    let client = localStorage.getItem('Client');
    let tokenType = localStorage.getItem('Token-Type');
    let uid = localStorage.getItem('Uid');

    this.dp = new DataParser('http://controlledprofits.herokuapp.com/v1/', accessToken, client, uid);
  }

  //Refactor into Business data api file ideally
  getDataEntries(businessId, entryType=null, section=null, startDate=null, endDate=null) {

    this.dp.getBusinessDataEntries(businessId, entryType, section, startDate, endDate)
      .then(function(objArray) {
        console.log("data entries:");
        console.dir(objArray);
        this.setState({dataEntries: objArray});
      }.bind(this))

      .catch(function(err) {
        console.log(err);
      });
  }

  //Build table from result, will be displayed by graphs later
  getTableDisplay() {
    let rows_actual = [];
    let data = this.state.dataEntries;
    for(var i = 0; i < data.length; i++) {
      let entry = data[i];
      rows_actual.push(
      <tr>
        <td>{entry['sales_and_marketing']['prospects']}</td>
        <td>test</td>
      </tr>);
    }

    rows_actual = <tbody>{rows_actual.join().toString()}</tbody>;

    //Add rows_predicted

    return(
      <div>
        <h4>Current</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Prospects/Leads</th>
              <th>Revenues</th>
              <th>Profit (Net Income)</th>
              <th>Annualized</th>
            </tr>
          </thead>
          {rows_actual}
        </table>
        <h4>Target</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Prospects/Leads</th>
              <th>Revenues</th>
              <th>Profit (Net Income)</th>
              <th>Annualized</th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }

  componentDidMount() {
    //Could probably call for just a section and certain date here, just add the arguments
    this.getDataEntries(this.props.businessHolder[0]['bizId']);
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