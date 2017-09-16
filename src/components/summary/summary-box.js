import React, {Component} from 'react';
import IncomeStatementSummary from './sum-income-block.js';

export default class SummaryBox extends Component {
  constructor(props){
    super(props);

    this.getAllTheData = this.getAllTheData.bind(this);

    this.state = {
      data: [],
      dataCards: [],
    }
  }


  getAllTheData() {
    let bizId = localStorage.getItem('bId');
    this.props.dp.getBusinessDataEntries(bizId, 'actual').then(function(objArray) {
      console.log('objArray',objArray);
      let objArr = objArray[0];
      this.setState({data: objArray[0]})

    }.bind(this))
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.getAllTheData();
  }

  render(){

    return(
      <div>
        {this.state.data.length != 0 ?(
          <div>
            <IncomeStatementSummary isData={this.state.data.income_statement}/>
          </div>
      ) : (
        <div>
          <h1>Loading</h1>
        </div>
      )}
      </div>
    )
  }
}
