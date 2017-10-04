import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import TPICalc from '../calc/totalProfitImpact.js';
import TPIGraph from './tpiGraph.js';
import moment from 'moment';

import '../../styles/totalProfitImpact.css';

// The number of data points for the chart.
const numDataPoints = 50;

// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 10000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

export default class TotalProfitImpact extends Component {
  constructor(props) {
    super(props);

    this.randomizeData = this.randomizeData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getMonthlyBarData = this.getMonthlyBarData.bind(this);
    this.getTPIData = this.getTPIData.bind(this);

    this.tpiCalc = null;

    this.styles = {
      width   : 900,
      height  : 300,
      padding : 35,
    };

    this.state = { 
      data: []
    };
  }

  //Once financial data is loaded, instantiate tpicalc if it hasn't already been
  componentDidUpdate() {
    if(!this.tpiCalc && this.props.financialData) { 
      this.tpiCalc = new TPICalc(this.props.financialData);
    } 
    
    if(this.tpiCalc && this.props.financialData) {
      this.state.adjustedFinancialData = this.getTPIData();
      this.state.data = this.getMonthlyBarData();
    }
  }

  getMonthlyBarData() {
    //net op profit, fe, ve, revenues
    if(this.state.adjustedFinancialData) {
      let totalRevenues = this.state.adjustedFinancialData.incomeStatement.totalRevenues;
      let totalNOP = this.state.adjustedFinancialData.currentNetOpProfit();
      let totalFE = this.state.adjustedFinancialData.currentFixedExpenses();
      let totalVC = this.state.adjustedFinancialData.currentSubtotalCOS();
      let data = [
        {name: "Net Operating Profit", value: 330000},
        {name: "Fixed Expenses", value: totalFE},
        {name: "Variable Expenses", value: totalVC},
        {name: "Total Revenues", value: totalRevenues}
      ];

      return data;
    }

  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  //Get entire calculated adjusted financial data
  getTPIData() {
    if(this.props.financialData && this.tpiCalc) {
      let pctProspects = this.props.pctProspects,
          vcProspects = this.props.vcProspects,
          fcProspects = this.props.fcProspects;
      let pctConversions = this.props.pctConversions,
          vcConversions = this.props.vcConversions,
          fcConversions = this.props.fcConversions;
      let pctVolume = this.props.pctVolume,
          vcVolume = this.props.vcVolume,
          fcVolume = this.props.fcVolume;
      let pctPrice = this.props.pctPrice,
          vcPrice = this.props.vcPrice,
          fcPrice = this.props.fcPrice;
      let pctProductivity = this.props.pctProductivity,
          vcProductivity = this.props.vcProductivity,
          fcProductivity = this.props.fcProductivity;
      let pctEfficiency = this.props.pctEfficiency,
          vcEfficiency = this.props.vcEfficiency,
          fcEfficiency = this.props.fcEfficiency;
      let pctFrequency = this.props.pctFrequency,
          vcFrequency = this.props.vcFrequency,
          fcFrequency = this.props.fcFrequency;
      

      let driverInputs = {
        pctProspects, vcProspects, fcProspects,
        pctConversions, vcConversions, fcConversions,
        pctVolume, vcVolume, fcVolume,
        pctPrice, vcPrice, fcPrice, 
        pctProductivity, vcProductivity, fcProductivity,
        pctEfficiency, vcEfficiency, fcEfficiency,
        pctFrequency, vcFrequency, fcFrequency
      };


      //TODO: Calc til target date
      let singleMoProjCalc = this.tpiCalc.projectedPeriodData(this.props.financialData, driverInputs, moment().add('months', 2).date(0));

      return singleMoProjCalc;



      // console.log('Calculating projected data for target date: ', this.props.targetDate);
      // let othercont = tpiCalc.projectedPeriodData(this.props.financialData, driverInputs, this.props.targetDate);

      // console.log('TPI Adjusted Period data: ', content);
      // console.log(`TPI projected period data for target date ${this.props.targetDate}: `, othercont);

      // content = content.incomeStatement.totalRevenues;
    }

    // return (
    //   <p>
    //     <span>Total Revenues:</span>
    //     {content}
    //   </p>
    // );
  }

  // Handle nav pill click and change graph type
  handleSelect() {
    //
  }

  render() {
    console.log('dataSet: ', this.state.data);
    return(
      <div ref="tpicontainer" id="tpi-container">
        <div id="graph-nav-container">
          <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="#">Monthly</NavItem>
            <NavItem eventKey={2} title="Item">Annualized</NavItem>
          </Nav>
        </div>
        <TPIGraph {...this.state} {...this.styles}/>
      </div>
    )
  }
}