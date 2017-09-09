import React, {Component} from 'react';
import FinancialInput from './inputFinance.js';

export default class SubHeaderInputBlock extends Component{
  constructor(props){
    super(props);
    this.state = {
      subSectionInput:[]
    }
  }

  componentDidMount(){
    let subHeaderRes = this.props.subHeaderInput;
    console.log('subHeaderRes:', subHeaderRes);
    let subHeaderResCards = subHeaderRes.map((field)=> {
      return(
        <div>
        <FinancialInput title={field.title} currentValue={field.value}/>
        </div>
      )
    });
    this.setState({subSectionInput: subHeaderResCards});
  }

  render(){
    return(
      <div>
        {this.state.subSectionInput}
      </div>
    )
  }
}
