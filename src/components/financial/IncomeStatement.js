import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import InputBlock from './inputBlock.js';

class IncomeStatement extends Component{

  buildIncomeStatement(){
    return this.props.incomeStatement.map((sectionHeader) =>{
      console.log(sectionHeader.sectionHeader);
      return(
        <div className='income-statement-block'>
          <h1 key={sectionHeader.id}>{sectionHeader.sectionHeader}</h1>
          <InputBlock inputBlock={sectionHeader.sectionSubHeader}/>
        </div>
      );
    });
  }

  render(){

    return(
      <div className="input-block-container">
        {this.buildIncomeStatement()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    incomeStatement: state.incomeStatement
  };
}


export default connect(mapStateToProps)(IncomeStatement);
