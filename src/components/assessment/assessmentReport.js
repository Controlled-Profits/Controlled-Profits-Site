import React, {Component} from 'react';
import DataParser from '../api/dataParser.js';
import FinancialData from '../calc/financialData.js';
import {deserializeFinancialData} from '../api/dataDeserializer.js'
import ProfitAssessmentRating from '../graphs/profitAssessmentRating.js';
import FinancialPerformanceSnapshot from '../graphs/financialPerformanceSnapshot.js';
import ProfitMetrics from '../graphs/profitMetrics.js';
import LiquidityRatios from '../graphs/liquidityRatios';


export default class AssessmentReport extends Component {
  constructor(props) {
    super(props);

    this.getDataActual = this.getDataActual.bind(this);

    this.state = {
      financialData: null
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

  componentDidMount() {
    this.dp.getUser()
    .then(function(obj) {
      this.getDataActual(obj.activeBusinessId);
      this.getDataAdjusted(obj.activeBusinessId);
    }.bind(this))

    .catch(function(err) {
      this.setState({errorMessage: err});
    }.bind(this));
  }

  getDataActual(businessId) {
    this.dp.getBusinessDataEntries(businessId, 'actual')
      .then(function(objArray) {
        this.setState({dataActual: objArray[0]});
        this.setState({financialData: new FinancialData(deserializeFinancialData(objArray[0])) });
      }.bind(this))

      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (<div className="container container-fluid">
      <div className="row">
        <div className="col-xs-12 col-md-12">
          <ProfitAssessmentRating financialData={this.state.financialData} />
        </div>
      </div>  
      <div className="row">
        <h2 className="text-center">Profit Profile</h2>
        <div className="col-xs-6 col-md-6">
          <div className="fps-container">
            <FinancialPerformanceSnapshot financialData={this.state.financialData} />
          </div>
        </div>
        <div className="col-xs-6 col-md-6">
          <div className="pm-container">
            <ProfitMetrics financialData={this.state.financialData} />
          </div>  
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xs-6">
          <div className="revBreakContainer">

          </div>
        </div>
        <div className="col-md-6 col-xs-6">
          <div className="cosVarExpContainer">

          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 col-xs-6">
          <div className="ratioGraphContainer">
            <LiquidityRatios financialData={this.state.financialData} />
          </div>
        </div>
        <div className="col-md-6 col-xs-6">
          <div className="ratioTextContainer">
            <p>Some text describing the information shown in liquidity ratios chart.</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-xs-6">
          <div className="ratioGraphContainer">
            <LiquidityRatios financialData={this.state.financialData} />
          </div>
        </div>
        <div className="col-md-6 col-xs-6">
          <div className="ratioTextContainer">
            <p>Some text describing the information shown in liquidity ratios chart.</p>
          </div>
        </div>
      </div>
    </div>);
  }
}