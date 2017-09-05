import React, {Component} from 'react';
import superagent from 'superagent';


export default class MemberHomeBox extends Component {
  constructor(props){
    super(props);
    this.state={
      activeSearch: 'MemberHome',
      memberHome: false,
      financialMarketingSalesDataInput: false,
      benchmarking: false,
      profitDriversAndPlanning: false,
    }
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

  handleMemberHomeChange(event){
    this.setState({memberHome: false,financialMarketingSalesDataInput: false, benchmarking: false, profitDriversAndPlanning: true, activeSearch: "ProfitDriversAndPlanning"});
  }

  render(){
    return(
      <div>
        <button className="btn btn-primary" onClick={this.handleMemberHomeChange.bind(this)}>Member Home</button>
        <button className="btn btn-primary" onClick={this.handleFMSDIChange.bind(this)}>Financial/Marketing & Sales Data Input</button>
        <button className="btn btn-primary" onClick={this.handleBenchmarkingChange.bind(this)}>Benchmarking</button>
        <button className="btn btn-primary" onClick={this.handlePDPChange.bind(this)}>Profit Drivers and Planning</button>

        <div className="content-box">
          {this.state.activeSearch}
        </div>
      </div>
    )
  }
}
