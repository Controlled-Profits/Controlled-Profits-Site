import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import IncomeStatement from './IncomeStatement.js';
import FinancialInput from './financial-input.js';
import SubHeaderInputBlock from './subHeaderInputBlock.js';


class FinancialMarketingSalesDataInput extends Component {

  render(){
    return(
      <div>
        <h1 className='section-header'>Income Statement Data Input</h1>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Total earned Revnue</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.totalEarnedRevenue}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Cost of Sales</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.costOfSales}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Fixed Expenses (SG&A)</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.fixedExpenses}/>
          </div>
          <hr/>
        </div>
        <h1 className='section-header'>Balance Sheet Data Input</h1>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Current Assests</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.currentAssets}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Fixed Assets = Long Term Assets</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.fixedAndLongTermAssets}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Current Liabilities</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.currentLiabilities}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Long Term Debt</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.longTermDebt}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Owners Equity</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.ownersEquity}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Sales and Marketing Data Input</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.salesAndMarketing}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Financial Rates of Interest</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.ownersEquity}/>
          </div>
          <hr/>
        </div>
        <div className='input-title-container'>
          <h3 className='sub-section-header'>Financial Rates of Interest</h3>
          <div className='field-input'>
            <SubHeaderInputBlock subHeaderInput={this.props.financialRatesOfInterest}/>
          </div>
          <hr/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    incomeStatement: state.incomeStatement,
    totalEarnedRevenue: state.totalEarnedRevenue,
    costOfSales: state.costOfSales,
    fixedExpenses: state.fixedExpenses,
    currentAssets: state.currentAssets,
    fixedAndLongTermAssets: state.fixedAndLongTermAssets,
    currentLiabilities: state.currentLiabilities,
    longTermDebt: state.longTermDebt,
    ownersEquity: state.ownersEquity,
    salesAndMarketing: state.salesAndMarketing,
    financialRatesOfInterest: state.financialRatesOfInterest
  };
}

export default connect(mapStateToProps)(FinancialMarketingSalesDataInput);
