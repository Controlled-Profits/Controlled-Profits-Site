import React, {Component} from 'react';

export default class IncomeStatementSummary extends Component {
  constructor(props){
    super(props);

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

  sumFiveVar(a, b, c, d, e){
    if(a === null){
      a = 0;
    }
    if(b === null){
      b = 0;
    }
    if(c === null){
      c = 0;
    }
    if(d === null){
      d = 0;
    }
    if(e === null){
      e = 0;
    }
    let aa = parseFloat(a);
    console.log(aa);
    let bb = parseFloat(b);
    console.log(bb);
    let cc = parseFloat(c);
    console.log(cc);
    let dd = parseFloat(d);
    console.log(dd);
    let ee = parseFloat(e);
    console.log(ee);

    let sum = aa + bb + cc + dd + ee;
    console.log(sum);
    return sum.toFixed(2);
  }

  render(){
    let vpie = this.inputNormalizer(this.props.isData.vpie);

    let fpie = this.inputNormalizer(this.props.isData.fpie);

    let subCostofSales = this.sumFiveVar(this.props.isData.cogs, this.props.isData.marketing, this.props.isData.direct_labor, this.props.isData.distribution, vpie);

    let grossContributionProfit = this.subtractTwoVar(this.props.isData.total_revenues, subCostofSales);

    return(
      <div>
        <h1>Income Statement</h1>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Total Earned Revenues</td>
              <td>{this.props.isData.total_revenues}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Cost of Sales (COS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>COGs (Materials, Storage, Packaging)</td>
              <td>{this.props.isData.cogs}</td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>{this.props.isData.marketing}</td>
            </tr>
            <tr>
              <td>Direct Labor</td>
              <td>{this.props.isData.direct_labor}</td>
            </tr>
            <tr>
              <td>Distribution</td>
              <td>{this.props.isData.distribution}</td>
            </tr>
            <tr>
              <td>Variable Profit Improvement Expenses</td>
              <td>{vpie}</td>
            </tr>
            <br></br>
            <tr>
              <th>Subtotal Cost of Sales</th>
              <td>{subCostofSales}</td>
            </tr>
            <br/>
            <tr>
              <th>Gross Contribution Profit</th>
              <td>{grossContributionProfit}</td>
            </tr>
            <br></br>
            <tr>
              <th>Fixed Expenses</th>
            </tr>
            <br/>
            <tr>
              <td>Salaries (Including Payroll Taxes)</td>
              <td>{this.props.isData.salaries}</td>
            </tr>
            <tr>
              <td>Benefit Admin (Payroll services, contributions, etc.)</td>
              <td>{this.props.isData.benefit_admin}</td>
            </tr>
            <tr>
              <td>Office Lease/Rent</td>
              <td>{this.props.isData.office_lease}</td>
            </tr>
            <tr>
              <td>Office Supplies</td>
              <td>{this.props.isData.office_supplies}</td>
            </tr>
            <tr>
              <td>Utilities</td>
              <td>{this.props.isData.utilities}</td>
            </tr>
            <tr>
              <td>Transportation</td>
              <td>{this.props.isData.transportation}</td>
            </tr>
            <tr>
              <td>Online Expenses</td>
              <td>{this.props.isData.online_expenses}</td>
            </tr>
            <tr>
              <td>Insurance</td>
              <td>{this.props.isData.insurance}</td>
            </tr>
            <tr>
              <td>Training</td>
              <td>{this.props.isData.training}</td>
            </tr>
            <tr>
              <td>Accounting & Legal</td>
              <td>{this.props.isData.accounting_and_legal}</td>
            </tr>
            <tr>
              <td>Advertising</td>
              <td>{this.props.isData.advertising}</td>
            </tr>
            <tr>
              <td>Marketing Development</td>
              <td>{this.props.isData.marketing_development}</td>
            </tr>
            <tr>
              <td>Other (Repairs, Maintenance, Furniture)</td>
              <td>{this.props.isData.other}</td>
            </tr>
            <tr>
              <td>Fixed Profit Improvement Expenses</td>
              <td>{fpie}</td>
            </tr>
          </tbody>
        </table>


      </div>
    )
  }
}
