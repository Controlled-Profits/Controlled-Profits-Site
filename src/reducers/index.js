import {combineReducers} from 'redux';
import IncomeStatement from './income-statement.js';
import TotalEarnedRevenue from './total-earned-revenue.js';
import CostOfSales from './cost-of-sales.js';

const allReducers = combineReducers({
  incomeStatement: IncomeStatement,
  totalEarnedRevenue: TotalEarnedRevenue,
  costOfSales: CostOfSales
})


export default allReducers;
