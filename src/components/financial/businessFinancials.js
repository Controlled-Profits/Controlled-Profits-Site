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
        <h1 className='section-header'>Income Statement</h1>
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    incomeStatement: state.incomeStatement,
    totalEarnedRevenue: state.totalEarnedRevenue,
    costOfSales: state.costOfSales
  };
}

export default connect(mapStateToProps)(FinancialMarketingSalesDataInput);
