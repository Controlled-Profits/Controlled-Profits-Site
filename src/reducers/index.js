import {combineReducers} from 'redux';
import IncomeStatement from './income-statement.js';

const allReducers = combineReducers({
  incomeStatement: IncomeStatement
})


export default allReducers;
