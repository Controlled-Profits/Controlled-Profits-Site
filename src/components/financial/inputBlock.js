import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {selectUser} from '../actions/index.js';
import SubHeaderInputBlock from './subHeaderInputBlock.js';

export default class InputBlock extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputBlock: []
    }
  }


  componentDidMount(){
    let results = this.props.inputBlock;
    let resultCards = results.map((input) => {
      console.log('subSection headers:', input.sectionSubHeader);
      return(
        <div>
          <h1>{input.header}</h1>
          <SubHeaderInputBlock subHeaderInput={input.fields}/>
        </div>
      )
    });
    this.setState({inputBlock: resultCards});
  }

  render(){
    return(
      <div>
        {this.state.inputBlock}
      </div>
    )
  }
}
