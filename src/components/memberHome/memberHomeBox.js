import React, {Component} from 'react';
import superagent from 'superagent';

import FinancialMarketingSalesDataInput from './businessFinancials.js';
import MemberHome from './members.js';

export default class MemberHomeBox extends Component {
  constructor(props){
    super(props);

    this.getUserBusinesses = this.getUserBusinesses.bind(this);
    this.getCurrentComponent = this.getCurrentComponent.bind(this);

    this.state={
      activeSearch: 'MemberHome',
      memberHome: false,
      financialMarketingSalesDataInput: false,
      benchmarking: false,
      profitDriversAndPlanning: false,
      currentBusinesses: [];
    }
  }

  getUserBusinesses(){
    let accessToken = localStorage.getItem('Access-Token');
    let client = localStorage.getItem('Client');
    let tokenType = localStorage.getItem('Token-Type');
    let uid = localStorage.getItem('Uid');
    superagent
      .get('http://controlledprofits.herokuapp.com/v1/businesses')
      .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
      .end((err, res) => {
        if(err) { this.setState({errorMessage: "Authentication Failed"}); return; }
        console.log(res.body);
        this.setState({currentBusinesses: res.body.data});
      });
  }


  handleMemberHomeChange(event){
    this.setState({memberHome: true,financialMarketingSalesDataInput: false, benchmarking: false, profitDriversAndPlanning: false, activeSearch: "MemberHome"});
  }

  handleFMSDIChange(event){
    this.setState({memberHome: false,financialMarketingSalesDataInput: true, benchmarking: false, profitDriversAndPlanning: false, activeSearch: "FinancialMarketingSalesDataInput"});
  }

  handleBenchmarkingChange(event){
    this.setState({memberHome: false,financialMarketingSalesDataInput: false, benchmarking: true, profitDriversAndPlanning: false, activeSearch: "Benchmarking"});
  }

  handlePDPChange(event){
    this.setState({memberHome: false,financialMarketingSalesDataInput: false, benchmarking: false, profitDriversAndPlanning: true, activeSearch: "ProfitDriversAndPlanning"});
  }

  componentDidMount(){
    this.getUserBusinesses();
  }

  getCurrentComponent(){

    if(this.state.activeSearch === "MemberHome"){
      return(<MemberHome props={this.state}/>);
    }
    else if(this.state.activeSearch === 'FinancialMarketingSalesDataInput'){
      return(<FinancialMarketingSalesDataInput props={this.state}/>);
    }

  }


  render(){

    return(
      <div>
        <button className="btn btn-primary" onClick={this.handleMemberHomeChange.bind(this)}>Member Home</button>
        <button className="btn btn-primary" onClick={this.handleFMSDIChange.bind(this)}>Financial/Marketing & Sales Data Input</button>
        <button className="btn btn-primary" onClick={this.handleBenchmarkingChange.bind(this)}>Benchmarking</button>
        <button className="btn btn-primary" onClick={this.handlePDPChange.bind(this)}>Profit Drivers and Planning</button>

        <div className="content-box">
          {this.getCurrentComponent()}
        </div>
      </div>
    )
  }
}
