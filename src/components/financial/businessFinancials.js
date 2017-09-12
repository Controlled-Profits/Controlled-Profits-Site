import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import SubHeaderInputBlock from './subHeaderInputBlock.js';
import {reduxForm, Field, SubmissionError} from 'redux-form';

const data = [];

class BusinessFinancials extends Component {

getInputValues(mappingValues) {
  let results = mappingValues;
  let resultCards = results.map((field) =>{
    this.pullNames(field.name);
    return(
      <div>
        <Field name={field.name} component={this.renderInput} placeholder={field.title} />
      </div>
    )
  });
  return resultCards;
}


pullNames(name) {
  if(data.length < 55){
  data.push(name);
  console.log('data', data);
  }
  return data;
}

renderInput(field){
  return(
      <div className="input-group financial-input">
      <label className='input-group-addon financial-title'>{field.placeholder}</label>
      <span className="input-group-addon">$</span>
      <input className='form-control' {...field.input}/>
    </div>
  )
}

handleInputFormSubmit(event,dispatch) {
  event.preventDefault();
}


  render(){
    return(
      <div>
        <form onSubmit={this.handleInputFormSubmit}>
          <h1 className='section-header'>Income Statement Data Input</h1>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Total earned Revnue</h3>
              {this.getInputValues(this.props.totalEarnedRevenue)}
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Cost of Sales</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.costOfSales)}
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Fixed Expenses (SG&A)</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.fixedExpenses)}
            </div>
            <hr/>
          </div>
          <h1 className='section-header'>Balance Sheet Data Input</h1>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Current Assests</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.currentAssets)}
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Fixed Assets = Long Term Assets</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.fixedAndLongTermAssets)}
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Current Liabilities</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.currentLiabilities)}
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Long Term Debt</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.longTermDebt)}
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Owners Equity</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.ownersEquity)}
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Sales and Marketing Data Input</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.salesAndMarketing)}
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Financial Rates of Interest</h3>
            <div className='field-input'>
              {this.getInputValues(this.props.financialRatesOfInterest)}
            </div>
            <hr/>
          </div>
          <button type='submint' className="btn btn-primary btn-lrg">Submit</button>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return{
//     incomeStatement: state.incomeStatement,
//     totalEarnedRevenue: state.totalEarnedRevenue,
//     costOfSales: state.costOfSales,
//     fixedExpenses: state.fixedExpenses,
//     currentAssets: state.currentAssets,
//     fixedAndLongTermAssets: state.fixedAndLongTermAssets,
//     currentLiabilities: state.currentLiabilities,
//     longTermDebt: state.longTermDebt,
//     ownersEquity: state.ownersEquity,
//     salesAndMarketing: state.salesAndMarketing,
//     financialRatesOfInterest: state.financialRatesOfInterest
//   };
// }
//
//
//
// FinancialMarketingSalesDataInput = reduxForm({
//   form: 'inputFinancialData',
// })(FinancialMarketingSalesDataInput)
//
// FinancialMarketingSalesDataInput = connect(
//   state => ({
//     incomeStatement: state.incomeStatement.data,
//     totalEarnedRevenue: state.totalEarnedRevenue,
//     costOfSales: state.costOfSales,
//     fixedExpenses: state.fixedExpenses,
//     currentAssets: state.currentAssets,
//     fixedAndLongTermAssets: state.fixedAndLongTermAssets,
//     currentLiabilities: state.currentLiabilities,
//     longTermDebt: state.longTermDebt,
//     ownersEquity: state.ownersEquity,
//     salesAndMarketing: state.salesAndMarketing,
//     financialRatesOfInterest: state.financialRatesOfInterest
//   })
// )

export default reduxForm({
  form: 'finaForm',
  destroyOnUnmount: false
})(BusinessFinancials);
