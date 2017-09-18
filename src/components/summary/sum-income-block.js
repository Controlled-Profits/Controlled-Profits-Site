import React, {Component} from 'react';
import CalcHandler from '../calc/calcHandler';
import './styles.css';

export default class IncomeStatementSummary extends Component {
  constructor(props){
    super(props);

    this.startCalcHandler();
  }

  startCalcHandler(){
    this.ch = new CalcHandler(this.props.data);
  }

  subtractTwoVar(a, b){
    if(a === null){
      a = 0;
    }
    if(b === null){
      b = 0;
    }
    let aa = parseFloat(a);
    let bb = parseFloat(b);
    let sum = aa - bb;
    return sum.toFixed(2);
  }

  inputNormalizer(x){
    if(x === null || x === undefined){
      x = 0;
    }
    let xx = parseFloat(x);
    return xx.toFixed(2);
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

  getTaxableIncome(opProfit, dona, dAndA){
    return opProfit - dona - dAndA;
  }

  percentNormalizer(input){
    let percent = input.split('.');
    return percent[1] + '%';
  }

  getTaxes(tR, taxableInc){
    return tR * taxableInc;
  }

  render(){
    let vpie = this.inputNormalizer(this.props.isData.vpie);
    let totalCogs = this.inputCalcHandler(vpie, this.ch.getCurrentCOS(), this.ch.getTargetCOS())

    let fpie = this.inputNormalizer(this.props.isData.fpie);
    let fixedExpenses = this.inputCalcHandler(fpie, this.ch.getCurrentFixedExpenses(), this.ch.getTargetFixedExpenses());

    let grossContributionProfit = this.subtractTwoVar(this.props.isData.total_revenues, totalCogs);

    let ebitda = this.inputCalcHandler(fpie, this.ch.getCurrentEBITDA(), this.ch.getTargetEBITDA());

    let operatingProfit = this.ch.getNetOperatingProfit(ebitda);
    let donations = this.inputNormalizer(this.props.isData.donations);
    console.log("data: ", this.props.data);

    let taxableIncome = this.getTaxableIncome(operatingProfit, donations, this.props.isData.depreciation_and_amortization )

    let taxRate = this.percentNormalizer(this.props.isData.tax_rate);
    let taxesInc = this.getTaxes(this.props.isData.tax_rate, taxableIncome);
    let netOperatingProfit = this.subtractTwoVar(taxableIncome, taxesInc);
    let additionToRetainedEarnings = this.subtractTwoVar(netOperatingProfit, this.props.isData.dividends);

    return(
      <div>
        <h1>Income Statement</h1>
        <table className="table-summary income-table">
          <thead>
            <tr>
              <th>Total Earned Revenues</th>
              <th className="amount-output">{this.props.isData.total_revenues}</th>
            </tr>
          </thead>
            <tbody>
            <tr>
              <th>Cost of Sales (COS)</th>
            </tr>
            <tr>
              <td>COGs (Materials, Storage, Packaging)</td>
              <td className="amount-output">{this.props.isData.cogs}</td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td className="amount-output">{this.props.isData.marketing}</td>
            </tr>
            <tr>
              <td>Direct Labor</td>
              <td className="amount-output">{this.props.isData.direct_labor}</td>
            </tr>
            <tr>
              <td>Distribution</td>
              <td className="amount-output">{this.props.isData.distribution}</td>
            </tr>
            <tr>
              <td>Variable Profit Improvement Expenses</td>
              <td className="amount-output">{vpie}</td>
            </tr>
            <tr>
              <th>Subtotal Cost of Sales</th>
              <td className="amount-output">{totalCogs}</td>
            </tr>
            <tr>
              <th>Gross Contribution Profit</th>
              <th className="amount-output">{grossContributionProfit}</th>
            </tr>
            <tr>
              <th>Fixed Expenses</th>
            </tr>
            <tr>
              <td>Salaries (Including Payroll Taxes)</td>
              <td className="amount-output">{this.props.isData.salaries}</td>
            </tr>
            <tr>
              <td>Benefit Admin (Payroll services, contributions, etc.)</td>
              <td className="amount-output">{this.props.isData.benefit_admin}</td>
            </tr>
            <tr>
              <td>Office Lease/Rent</td>
              <td className="amount-output">{this.props.isData.office_lease}</td>
            </tr>
            <tr>
              <td>Office Supplies</td>
              <td className="amount-output">{this.props.isData.office_supplies}</td>
            </tr>
            <tr>
              <td>Utilities</td>
              <td className="amount-output">{this.props.isData.utilities}</td>
            </tr>
            <tr>
              <td>Transportation</td>
              <td className="amount-output">{this.props.isData.transportation}</td>
            </tr>
            <tr>
              <td>Online Expenses</td>
              <td className="amount-output">{this.props.isData.online_expenses}</td>
            </tr>
            <tr>
              <td>Insurance</td>
              <td className="amount-output">{this.props.isData.insurance}</td>
            </tr>
            <tr>
              <td>Training</td>
              <td className="amount-output">{this.props.isData.training}</td>
            </tr>
            <tr>
              <td>Accounting & Legal</td>
              <td className="amount-output">{this.props.isData.accounting_and_legal}</td>
            </tr>
            <tr>
              <td>Advertising</td>
              <td className="amount-output">{this.props.isData.advertising}</td>
            </tr>
            <tr>
              <td>Marketing Development</td>
              <td className="amount-output">{this.props.isData.marketing_development}</td>
            </tr>
            <tr>
              <td>Other (Repairs, Maintenance, Furniture)</td>
              <td className="amount-output">{this.props.isData.other}</td>
            </tr>
            <tr>
              <td>Fixed Profit Improvement Expenses</td>
              <td className="amount-output">{fpie}</td>
            </tr>
            <tr>
              <th>Fixed Expenses</th>
              <td className="amount-output">{fixedExpenses.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Earnings Before Interest, Taxes, Depreciation & Amortization</th>
              <td className="amount-output">{ebitda.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Interest Paid</td>
              <td className="amount-output">{this.props.isData.interest_paid}</td>
            </tr>
            <tr>
              <th>Operating Profit</th>
              <td className="amount-output">{operatingProfit.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Earnings Before Taxes, Depreciation & Amortization</td>
              <td className="amount-output">{operatingProfit.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Donations</td>
              <td className="amount-output">{donations}</td>
            </tr>
            <tr>
              <td>Depreciation & Amortization</td>
              <td className="amount-output">{this.inputNormalizer(this.props.isData.depreciation_and_amortization)}</td>
            </tr>
            <tr>
              <th>Taxable Income</th>
              <td className="amount-output">{this.inputNormalizer(taxableIncome)}</td>
            </tr>
            <tr>
              <td>Tax Rate</td>
              <td className="amount-output">{this.percentNormalizer(this.props.isData.tax_rate)}</td>
            </tr>
            <tr>
              <td>Taxes</td>
              <td className="amount-output">{this.inputNormalizer(taxesInc)}</td>
            </tr>
            <tr>
              <th>Net Operating Income</th>
              <th className="amount-output">{this.inputNormalizer(netOperatingProfit)}</th>
            </tr>
            <tr>
              <th>Dividends / Profits</th>
              <th className="amount-output">{this.inputNormalizer(this.props.isData.dividends)}</th>
            </tr>
            <tr>
              <td>Addition to Retained Earnings</td>
              <td className="amount-output">{this.inputNormalizer(additionToRetainedEarnings)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
