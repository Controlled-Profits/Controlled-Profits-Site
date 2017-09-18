import React, {Component} from 'react';
import CalcHandler from '../calc/calcHandler';
import './styles.css';

export default class BalanceSheetSummary extends Component {
  constructor(props){
    super(props);

    this.startCalcHandler();
  }

  startCalcHandler(){
    this.ch = new CalcHandler(this.props.data);
  }

  inputNormalizer(x){
    if(x === null || x === undefined){
      x = 0;
    }
    let xx = parseFloat(x);
    return xx.toFixed(2);
  }

  getTotalCurrentAssets(){
    let totalCurrentAssetItems = [
      this.props.bData.cash,
      this.props.bData.accounts_receivable,
      this.props.bData.inventory,
      this.props.bData.prepaid_expenses,
      this.props.bData.other_current_assets
    ];
    let totalCurrentAssets = 0;
    for(let i = 0; i < totalCurrentAssetItems.length; i++){
      if(totalCurrentAssetItems[i] === null || totalCurrentAssetItems[i] === undefined){
        totalCurrentAssetItems[i] = 0;
      }
      totalCurrentAssets += parseFloat(totalCurrentAssetItems[i]);
    }
    console.log('total current assets',totalCurrentAssets);
    return totalCurrentAssets;
  }

  getTotalFixedLTAssets(){
    let totalFixedLTItems = [
      this.props.bData.ppe,
      this.props.bData.furniture_and_fixtures,
      this.props.bData.leasehold_improvements,
      this.props.bData.land_and_buildings,
      this.props.bData.other_fixed_assets,
      this.props.bData.accumulated_depreciation,
      this.props.bData.goodwill,
    ];
    let totalFixedLTs= 0;
    for(let i = 0; i < totalFixedLTItems.length; i++){
      if(totalFixedLTItems[i] === null || totalFixedLTItems[i] === undefined){
        totalFixedLTItems[i] = 0;
      }

      totalFixedLTs += parseFloat(totalFixedLTItems[i]);
      console.log("current Lt Item price:", totalFixedLTItems[i]);
      console.log('Current Sum:', totalFixedLTs);
    }
    console.log('total fixed LT items',totalFixedLTs);
    return totalFixedLTs;
  }

  getTotalCurrentLiabilities(){
    let totalItems = [
      this.props.bData.accounts_payable,
      this.props.bData.interest_payable,
      this.props.bData.taxes_payable,
      this.props.bData.deferred_revenue,
      this.props.bData.short_term_notes,
      this.props.bData.current_debt,
      this.props.bData.other_current_liabilities,
    ];
    let totalCurrentLiabilities= 0;
    for(let i = 0; i < totalItems.length; i++){
      if(totalItems[i] === null || totalItems[i] === undefined){
        totalItems[i] = 0;
      }
      totalCurrentLiabilities+= parseFloat(totalItems[i]);
    }
    return totalCurrentLiabilities;
  }

  getTotalLongTermDebt(){
    let totalItems = [
      this.props.bData.bank_loans_payable,
      this.props.bData.notes_payable_to_stockholders,
      this.props.bData.other_long_term_debt,
    ];
    let totalCurrentLiabilities= 0;
    for(let i = 0; i < totalItems.length; i++){
      if(totalItems[i] === null || totalItems[i] === undefined){
        totalItems[i] = 0;
      }
      totalCurrentLiabilities+= parseFloat(totalItems[i]);
    }
    return totalCurrentLiabilities;
  }

  getTotalOwnersEquity(){
    let totalItems = [
      this.props.bData.common_stock,
      this.props.bData.paid_in_surplus,
      this.props.bData.retained_earnings,
    ];
    let total= 0;
    for(let i = 0; i < totalItems.length; i++){
      if(totalItems[i] === null || totalItems[i] === undefined){
        totalItems[i] = 0;
      }
      total+= parseFloat(totalItems[i]);
    }
    return total;
  }

  balanceCheck(x, y){
    if( x === y){
      return 'TRUE'
    };
    console.log(x, "===", y, ': ', x === y );
    return 'FALSE';
  }

  dateFormatter(date){
    let dateFor = date.split('T');
    let temp = dateFor[0].split('-');
    let currentDate = temp[1] + "-" + temp[2] + '-' + temp[0];
    return currentDate;
  }


  inputCalcHandler(x, currentFunction, targetFunction){
    let storage = 0;
    if(x != 0.00){
      storage = targetFunction;
    }
    else{
      storage = currentFunction;
    }
    return storage;
  }

  render(){
    let ta = this.inputNormalizer(this.getTotalFixedLTAssets() + this.getTotalCurrentAssets());

    let tlaoe = this.inputNormalizer(this.getTotalOwnersEquity() + this.getTotalLongTermDebt() + this.getTotalCurrentLiabilities());

    return(
      <div>
        <h1>Balance Sheet</h1>
        <table className="table-summary bal-table">
          <thead>
            <tr>
              <th scope="row">Assets</th>
              <th className="amount-output">{this.dateFormatter(this.props.data.entryDate)}</th>
            </tr>
            <tr>
              <th>Current Assets</th>
              <th className="amount-output"> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Cash</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.cash)}</td>
            </tr>
            <tr>
              <td scope="row">Accounts Receivable</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.accounts_receivable)}</td>
            </tr>
            <tr>
              <td scope="row">Inventory</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.inventory)}</td>
            </tr>
            <tr>
              <td scope="row">Prepaid Expenses</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.prepaid_expenses)}</td>
            </tr>
            <tr>
              <td scope="row">Other Current Assets</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.other_current_assets)}</td>
            </tr>
            <tr>
              <th scope="row">Total Current Assets</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalCurrentAssets())}</th>
            </tr>
            <tr>
              <td>  </td>
              <td className="amount-output">  </td>
            </tr>
            <tr>
              <td>  </td>
              <td className="amount-output">  </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th scope="row">Fixed Assets = Long Term Assets</th>
              <th className="amount-output">  </th>
            </tr>
          </thead>
          <tbody>
              <tr>
              <td scope="row">Property, Plant & Equipment</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.ppe)}</td>
            </tr>
            <tr>
              <td scope="row">Furniture & Fixtures</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.furniture_and_fixtures)}</td>
            </tr>
            <tr>
              <td scope="row">Leasehold Improvements</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.leasehold_improvements)}</td>
            </tr>
            <tr>
              <td scope="row">Land & Building</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.land_and_buildings)}</td>
            </tr>
            <tr>
              <td scope="row">Other Fixed Assets</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.other_fixed_assets)}</td>
            </tr>
            <tr>
              <td scope="row">Accumulated Depreciation</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.accumulated_depreciation)}</td>
            </tr>
            <tr>
              <td scope="row">Goodwill</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.goodwill)}</td>
            </tr>
            <tr>
            </tr>
            <tr>
              <th scope="row">Total Fixed (Long Term) Assets</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalFixedLTAssets())}</th>
            </tr>
            <tr>
              <td>    </td>
              <td>    </td>
            </tr>
            <tr>
              <th>Total Assets</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalFixedLTAssets() + this.getTotalCurrentAssets())}</th>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Liabilities & Owners Equity</th>
              <th>   </th>
            </tr>
            <tr>
              <th>Current Liabilities</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Accounts Payable</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.accounts_payable)}</td>
            </tr>
            <tr>
              <td>Interest Payable</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.interest_payable)}</td>
            </tr>
            <tr>
              <td>Taxes Payable</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.taxes_payable)}</td>
            </tr>
            <tr>
              <td>Deferred Revenue</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.deferred_revenue)}</td>
            </tr>
            <tr>
              <td>Short Term Notes (due within 12 months)</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.short_term_notes)}</td>
            </tr>
            <tr>
              <td>Current Part, Long Term Debt</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.current_debt)}</td>
            </tr>
            <tr>
              <td>Other Current Liabilities</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.other_current_liabilities)}</td>
            </tr>
            <tr>
              <th>Total Current Liabilities</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalCurrentLiabilities())}</th>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Long Term Debt</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bank Loans Payable</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.bank_loans_payable)}</td>
            </tr>
            <tr>
              <td>Notes Payable to Stockholders</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.notes_payable_to_stockholders)}</td>
            </tr>
            <tr>
              <td>Other Long Term Debt</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.other_long_term_debt)}</td>
            </tr>
            <tr>
              <th>Total Long Term Debt</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalLongTermDebt())}</th>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <th>Total Liabilities</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalLongTermDebt() + this.getTotalCurrentLiabilities())}</th>
            </tr>
            <tr>
              <td>
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <th>Owners Equity</th>
              <th> </th>
            </tr>
            <tr>
              <td>Common Stock</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.common_stock)}</td>
            </tr>
            <tr>
              <td>Paid-In Surplus</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.paid_in_surplus)}</td>
            </tr>
            <tr>
              <td>Retained Earnings</td>
              <td className="amount-output">{this.inputNormalizer(this.props.bData.retained_earnings)}</td>
            </tr>
            <tr>
              <th>Total Owners Equity</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalOwnersEquity())}</th>
            </tr>
            <tr>
              <td>       </td>
              <td>       </td>
            </tr>
            <tr>
              <th>Total Liabilities and Owner's Equity</th>
              <th className="amount-output">{this.inputNormalizer(this.getTotalOwnersEquity() + this.getTotalLongTermDebt() + this.getTotalCurrentLiabilities())}</th>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Balance Check</th>
              <th className="amount-output">{this.balanceCheck(tlaoe, ta)}</th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}
