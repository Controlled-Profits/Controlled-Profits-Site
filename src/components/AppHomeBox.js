import React, {Component} from 'react';
import superagent from 'superagent';
import {Redirect} from 'react-router-dom';

import FinancialMarketingSalesDataInput from './financial/businessFinancials.js';
import MemberHomeBox from './memberHome/memberHomeBox.js';
import ProfitDrivers from './profitDrivers/profitDriversContainer.js';
import FormInput from './financial/form-input.js';

import '../styles/memberDesktop.css';

export default class AppHomeBox extends Component {
  constructor(props){
    super(props);

    this.getUserBusinesses = this.getUserBusinesses.bind(this);
    this.getCurrentComponent = this.getCurrentComponent.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getCurrentActiveBusiness = this.getCurrentActiveBusiness.bind(this);
    this.setActiveBusiness = this.setActiveBusiness.bind(this);


    this.state={
      activeSearch: 'MemberHome',
      memberHome: false,
      financialMarketingSalesDataInput: false,
      benchmarking: false,
      profitDriversAndPlanning: false,
      currentBusinesses: [],
      businessHolder: [],
      activeBusiness: '',
      activeBizId:''
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
        this.setState({currentBusinesses: res.body});
        console.log('currentBusiness:', this.state.currentBusinesses);
        this.getCurrentActiveBusiness();
      });

  }

  getCurrentActiveBusiness(){
    let bizHolder = [];
    if(this.state.currentBusinesses.data !== undefined){
      let currentBusinesses = this.state.currentBusinesses.data.map((biz) =>{
      let obj = {
        bizName: biz.attributes.name,
        bizId: biz.id,
        active: false
      }
        bizHolder.push(obj);
      })
      this.setState({businessHolder: bizHolder});
      console.log('biz holder:', this.state.businessHolder);
    }
  }

  setActiveBusiness(string){
    let currentBizObject = this.state.businessHolder.find((item) =>{
      if(item.bizName === string){
        item.active = true;
        return item;
      }
      else{
        item.active = false;
      }
    });
    localStorage.setItem("bId",currentBizObject.bizId);
    localStorage.setItem("bName",currentBizObject.bizName);
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
      return(
      <MemberHomeBox
        businessHolder={this.state.businessHolder} currentBusinesses={this.state.currentBusinesses} getUserBusinesses={this.getUserBusinesses}
        setActiveBusiness={this.setActiveBusiness}
      />);
    }
    else if(this.state.activeSearch === 'FinancialMarketingSalesDataInput'){
      return(<FormInput props={this.state}/>);
    }
    else if (this.state.activeSearch === 'ProfitDriversAndPlanning') {
      return(<ProfitDrivers businessHolder={this.state.businessHolder}/>);
    }
  }

  isAuthenticated(){
    if(localStorage.getItem('Access-Token') === null){
      return false;
    }
    else{
      return localStorage.getItem('Access-Token').length > 7;
    }
  }

  render(){
    return(
      <div>
        {!this.isAuthenticated() ? ( <Redirect to={{pathname: '/'}} /> ) : (
        <div className="memberHomeBox-container">
          <div className='header-business-logo'>
            <div className="header-container"></div>
            <div className="business-user-container">
            </div>
          </div>
          <nav className="button-nav">
            <button className="nav-button btn btn-primary" onClick={this.handleMemberHomeChange.bind(this)}>Member Home</button>
            <button className="nav-button btn btn-primary" onClick={this.handleFMSDIChange.bind(this)}>Financials and Data</button>
            <button className="nav-button btn btn-primary" onClick={this.handleBenchmarkingChange.bind(this)}>Benchmarking</button>
            <button className="nav-button btn btn-primary" onClick={this.handlePDPChange.bind(this)}>Profit Drivers and Planning</button>

          </nav>
          <div className="content-box">
            {this.getCurrentComponent()}
          </div>
        </div>
        )}
      </div>
    )
  }
}
