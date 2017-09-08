import React, {Component} from 'react';

export default class ActiveBusiness extends Component {
  constructor(props){
    super(props);

    this.callBusinessButtons = this.callBusinessButtons.bind(this);
    this.handleRadioSelection = this.handleRadioSelection.bind(this);

    this.state={
      active: '',
      bizRadioButtons:[],
      clickState: false
    }
  }

  handleActiveClick(){
    this.setState({clickState: !this.state.clickState});
    this.callBusinessButtons();
  }

  handleRadioSelection(event){
    console.log(event.target.value);
    this.setState({active: event.target.value});
  }

  callBusinessButtons(){
    let business = "[Create a Business]";
    if(this.props.businessHolder === undefined || this.props.businsessHolder === null){
      this.setState({active: business});
    }
    else{
      let businessBtn = this.props.businessHolder.map((biz) => {
        console.log(biz.bizName);
        return(
          <div className="biz-checkbox-holder" key={biz.bizId}>
            <input type="radio" onClick={this.handleRadioSelection} value={biz.bizName}/><label>{biz.bizName}</label>
          </div>
        )
      });
      this.setState({bizRadioButtons: businessBtn});
    }
  }

  handleActiveBizSubmit(event){
    event.preventDefault();
    console.log(this.state.active);
    this.props.handleActiveBusinessChange(this.state.active);
    this.props.setActiveBusiness(this.state.active);
    this.handleActiveClick();
  }


  render(){

    return(
      <div className="userBusiness-name">
        <button className="btn btn-primary" onClick={this.handleActiveClick.bind(this)}>Change Active Business</button>
        {(this.state.clickState) ? (
          <form onSubmit={this.handleActiveBizSubmit.bind(this)}>
            <div className="active-container">
              <h4>Select a Business</h4>
                {this.state.bizRadioButtons}
            </div>
            <button className="btn btn-success" type="submit">Save</button>
          </form>
        ) : null}
      </div>
    )
  }
}
