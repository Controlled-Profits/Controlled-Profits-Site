import React, {Component} from 'react';
import IncomeStatementSummary from './sum-income-block.js';
import BalanceSheetSummary from './balance-sheet-block.js';
import SalesAndMarketingSummary from './sales-and-marketing-block.js';
import RatesOfInterestSummary from './rates-of-interest-block.js';
import './styles.css';

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
          <div className="summary-container">
              <IncomeStatementSummary isData={this.state.data.income_statement} data={this.state.data}/>
              <BalanceSheetSummary bData={this.state.data.balance_sheet} data={this.state.data}/>
              <SalesAndMarketingSummary sData={this.state.data.sales_and_marketing} data={this.state.data} />
              <RatesOfInterestSummary iData={this.state.data.financial_roi} data={this.state.data}/>
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
