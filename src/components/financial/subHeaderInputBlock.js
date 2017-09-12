import React, {Component} from 'react';
import FinancialInput from './financial-input.js';
import PercentInput from './percent-input.js';
import {reduxForm, Field, SubmissionError} from 'redux-form';


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
    let subHeaderResCards = subHeaderRes.map((card)=> {
      console.log(card.type);
      console.log(card.title);
      if(card.type === 'percentage'){
        return(
          <div>
            <Field name={card.name} component={financeInput} placeholder={card.title}
              currentValue={card.value} id={card.id}/>
          </div>
        )
      }
      else{
        return(
          <div>
            <Field name={card.name} component={financeInput} title={card.title} currentValue={card.value} id={card.id} placeholder={card.title}/>
          </div>
        )
      }
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


const financeInput = field =>
  <div className="input-group financial-input">
    <label className="input-group-addon financial-title">{field.input.placeholder}</label>
    <span className="input-group-addon">$</span>
    <input {...field.input}/>
  </div>
