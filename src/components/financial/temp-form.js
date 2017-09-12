import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import FinancialInput from './financial-input.js';
import SubHeaderInputBlock from './subHeaderInputBlock.js';
import {reduxForm, Field, SubmissionError} from 'redux-form';


let TempForm = () =>
 <div>
