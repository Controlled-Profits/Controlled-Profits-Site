import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import InputBlock from './inputBlock.js';

class IncomeStatement extends Component{

  render(){

    return(
      <div className="header-container">
        <h1 className="section-header">{this.props.sectionHeader}</h1>
      </div>
    )
  }
}

export default IncomeStatement;
