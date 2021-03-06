import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import IncomeStatement from './income-statement.js';
import TotalEarnedRevenue from './total-earned-revenue.js';
import CostOfSales from './cost-of-sales.js';
import FixedExpenses from './fixed-expenses.js';
import CurrentAssets from './current-assets.js';
import FixedAndLongTermAssets from './fixed-assets-or-long-term-assets.js';
import CurrentLiabilities from './current-liabilities.js';
import LongTermDebt from './long-term-debt.js';
import OwnersEquity from './owners-equity.js';
import SalesAndMarketing from './sales-and-marketing.js';
import FinancialRatesOfInterest from './financial-rates-of-interest.js';

function mainReducer(state = {
  headers: [],
  loadingFormHeaders: false,
  addingFormInput: false,
}, action) {
  switch (action.type) {
    case 'REQUEST_FORM_HEADERS':
      return Object.assign({}, state, {
        loadingFormHeaders: true,
      });
    case 'SUBMIT_INPUT_FORM':
      console.log("your in the reducer",state.formData)
      return state.formData;

  default:
    return state;
  }
}

const allReducers = combineReducers({
  main: mainReducer,
  form: formReducer,
  incomeStatement: IncomeStatement,
  totalEarnedRevenue: TotalEarnedRevenue,
  costOfSales: CostOfSales,
  fixedExpenses: FixedExpenses,
  currentAssets: CurrentAssets,
  fixedAndLongTermAssets: FixedAndLongTermAssets,
  currentLiabilities: CurrentLiabilities,
  longTermDebt: LongTermDebt,
  ownersEquity: OwnersEquity,
  salesAndMarketing: SalesAndMarketing,
  financialRatesOfInterest: FinancialRatesOfInterest
})


export default allReducers;
