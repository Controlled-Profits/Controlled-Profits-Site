import React, {Component} from 'react'
import superagent from 'superagent';

export default class BusinessData extends Component { 
  constructor(props) {
    super(props)

    this.getDataEntries = this.getDataEntries.bind(this)

  }

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
      if(err) { this.setState({errorMessage: "Authentication Failed"}); return; }
      console.log(res.data);
      return JSON.parse(res.data)
    });
  }

}