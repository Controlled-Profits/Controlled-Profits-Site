import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import BusinessFinancials from './businessFinancials.js';

class FormInput extends Component {
  render(){
    return(
      <div>
        <BusinessFinancials
          totalEarnedRevenue={this.props.totalEarnedRevenue}
          costOfSales={this.props.costOfSales}
          fixedExpenses={this.props.fixedExpenses}
          currentAssets={this.props.currentAssets}
          fixedAndLongTermAssets={this.props.fixedAndLongTermAssets}
          currentLiabilities={this.props.currentLiabilities}
          longTermDebt={this.props.longTermDebt}
          ownersEquity={this.props.ownersEquity}
          salesAndMarketing={this.props.salesAndMarketing}
          financialRatesOfInterest={this.props.financialRatesOfInterest}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
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

export default connect(mapStateToProps)(FormInput);
