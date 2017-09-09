import React, {Component} from 'react';
import superagent from 'superagent';


export default class DeltaProspects extends Component {
  constructor(props){
    super(props);

    this.getDataEntries = this.getDataEntries.bind(this);
    this.getTableDisplay = this.getTableDisplay.bind(this);
    
    this.state = {
      dataEntries: []
    }
  }

  //Refactor into Business data api file ideally
  getDataEntries(business_id, section=null, start_date=null, end_date=null) {
    let url = `http://controlledprofits.herokuapp.com/v1/businesses/${business_id}/data/?`;
    
    let queryTokens = "";
    if(section && section.length) {
      queryTokens += `section=${section}&`;
    }

    if(start_date && end_date) {
      queryTokens += `start_date=${start_date}&end_date=${end_date}`
    } else queryTokens.replace("&", "");

    url += queryTokens;

    let accessToken = localStorage.getItem('Access-Token');
    let client = localStorage.getItem('Client');
    let tokenType = localStorage.getItem('Token-Type');
    let uid = localStorage.getItem('Uid');
    superagent
    .get(url)
    .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
    .end((err, res) => {
      if(err) { this.setState({errorMessage: "Authentication Failed"}); return "Something went wrong."; }
      else {
        console.log("response:", res.body)
        this.setState({dataEntries: res.body});
      }
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