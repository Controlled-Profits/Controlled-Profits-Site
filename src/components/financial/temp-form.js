import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import FinancialInput from './financial-input.js';
import SubHeaderInputBlock from './subHeaderInputBlock.js';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import Fields from '../../constants.js';

const formFields = Fields;
console.log(formFields);

const getInputField = (mappingField) => {
  let resultCards = mappingField.map((card) => {
    return(
      <div className="input-field-container">
        <label>{card.title}</label>
        <input name={card.name} value={card.value}/>
      </div>
    )
  })
}


const TempForm = () => {
  <div>

  </div>
}

export default reduxForm({
  form: 'tempForm',
})
