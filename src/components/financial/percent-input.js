import React, {Component} from 'react';

export default class PercentInput extends Component{
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
      <div className="input-group financial-input" key={this.props.id}>
        <label className="input-group-addon financial-title">{this.state.title}</label>
        <input type="text" className="form-control" onChange={this.handleCurrentValueChange.bind(this)} value={this.state.currentValue} placeholder={this.props.currentValue}/>
        <span className="input-group-addon">%</span>
      </div>
    )
  }

}
