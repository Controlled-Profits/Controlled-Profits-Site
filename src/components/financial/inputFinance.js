import React, {Component} from 'react';
import '../../styles/financials.css';

export default class FinancialInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentValue: '',
      title: '',
      postVal: ''
    }
  }

  handleCurrentValueChange(event){
    this.setState({currentValue: event.target.value});
  }

  componentDidMount(){
      this.setState({title: this.props.title});
  }

  render(){
    return(
      <div className="input-group financial-input">
        <label className="input-group-addon financial-title">{this.state.title}</label>
        <span className="input-group-addon">$</span>
        <input type="text" className="form-control" onChange={this.handleCurrentValueChange.bind(this)} value={this.state.currentValue} placeholder={this.props.currentValue}/>
      </div>
    )
  }
}
