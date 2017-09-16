import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import superagent from 'superagent';
// import {selectUser} from '../actions/index.js';
import FinancialInput from './financial-input.js';
import SubHeaderInputBlock from './subHeaderInputBlock.js';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import submitInputForm from '../../actions/action.js';

//my failure to understand Redux/Redux Form led to this giant form component.
class TempForm extends Component {
  constructor() {
    super();

    this.state = {
      totalEarnedRevenue: '',

      //COGS
      costOfGoodsSold: '',
      marketing: '',
      directLabor: '',
      distribution: '',

      //fixedExpenses
      salaries: '',
      benefits: '',
      office: '',
      officeSupplies: '',
      utilities: '',
      transportation: '',
      onlineExp: '',
      insurance: '',
      training: '',
      accountAndLegal: '',
      ads: '',
      marketingDev: '',
      other: '',
      intPaid: '',
      donations: '',
      depreciationAndAmortization: '',
      taxRate: '',

      //Current Assets
      cash: '',
      accountsReceivable: '',
      inventory: '',
      prepaidExpenses: '',
      otherCurrentAssets: '',

      //Fixed and or long term Assets
      propertyPlantEquipment: '',
      furnitureFixtures: '',
      leaseholdImprovements: '',
      landBuilding: '',
      otherFixedAssets: '',
      accumulatedDepreciation: '',
      goodwill: '',

      //Current Liabilities
      accountsPayable: '',
      interestPayable: '',
      taxesPayable: '',
      deferredRevenue: '',
      shortTermNotes: '',
      currentPartLongTermDebt: '',
      currentLiabilities: '',

      //Long term Debt
      bankLoansPayable: '',
      notesPayableToStockholders: '',
      otherLongTermDebt: '',

      //Owners Equity
      commonStock: '',
      paidInSurplus: '',
      retainedEarnings: '',

      //sales and Marketing
      prospectsLeads: '',
      numOfSalesRec: '',
      marketingSpent: '',
      grandTotalUnits: '',

      //Financial Rates of Interest
      avgIntRate: '',
      avgEquityIntRate: '',
      avgFinancingIntRate: '',
      corporateTaxRate: '',
    }
  }

//Total Earned Income Handlers
  handleTOEChange(event){
    this.setState({totalEarnedRevenue: event.target.value});
  }

//Cost of Sales Handlers
  handleCOGSChange(event){
    this.setState({costOfGoodsSold: event.target.value});
  }

  handleMarketingChange(event){
    this.setState({marketing: event.target.value});
  }

  handleDirectLaborChange(event){
    this.setState({directLabor: event.target.value});
  }

  handleDistroChange(event){
    this.setState({distribution: event.target.value});
  }


//Fixed Expenses Handlers
  handleSalariesChange(event){
    this.setState({salaries: event.target.value});
  }

  handleBenefitsChange(event){
    this.setState({benefits: event.target.value});
  }

  handleOfficeChange(event){
    this.setState({office: event.target.value});
  }

  handleOfficeSuppliesChange(event){
    this.setState({officeSupplies: event.target.value});
  }

  handleUtilitiesChange(event){
    this.setState({utilities: event.target.value});
  }

  handleTransportationChange(event){
    this.setState({transportation: event.target.value});
  }

  handleOnlineExpChange(event){
    this.setState({onlineExp: event.target.value});
  }

  handleInsuranceChange(event){
    this.setState({insurance: event.target.value});
  }

  handleTrainingChange(event){
    this.setState({training: event.target.value});
  }

  handleAccountAndLegalChange(event){
    this.setState({accountAndLegal: event.target.value});
  }

  handleAdsChange(event){
    this.setState({ads: event.target.value});
  }

  handleMarketingDevChange(event){
    this.setState({marketingDev: event.target.value});
  }

  handleOtherChange(event){
    this.setState({other: event.target.value});
  }

  handleIntPaidChange(event){
    this.setState({intPaid: event.target.value});
  }

  handleDonationsChange(event){
    this.setState({donations: event.target.value});
  }

  handleDepreciationAndAmortizationChange(event){
    this.setState({depreciationAndAmortization: event.target.value});
  }

  handleTaxRateChange(event){
    this.setState({taxRate: event.target.value});
  }

  // Current Assets Handlers
  handleCashChange(event){
    this.setState({cash: event.target.value});
  }

  handleAccountsReceivableChange(event){
    this.setState({accountsReceivable: event.target.value});
  }

  handleInventoryChange(event){
    this.setState({inventory: event.target.value});
  }

  handlePrepaidExpensesChange(event){
    this.setState({prepaidExpenses: event.target.value});
  }

  handleOtherCurrentAssetsChange(event){
    this.setState({otherCurrentAssets: event.target.value});
  }

//Fixed or long term assets Handlers
  handlePropertyPlantEquipmentChange(event){
    this.setState({propertyPlantEquipment: event.target.value});
  }

  handleFurnitureFixturesChange(event){
    this.setState({furnitureFixtures: event.target.value});
  }

  handleLeaseholdImprovementsChange(event){
    this.setState({leaseholdImprovements: event.target.value});
  }

  handleLandBuildingChange(event){
    this.setState({landBuilding: event.target.value});
  }

  handleOtherFixedAssetsChange(event){
    this.setState({otherFixedAssets: event.target.value});
  }

  handleAccumulatedDepreciationChange(event){
    this.setState({accumulatedDepreciation: event.target.value});
  }

  handleGoodwillChange(event){
    this.setState({goodwill: event.target.value});
  }

  //Current Liabilities
  handleAccountsPayableChange(event){
    this.setState({accountsPayable: event.target.value});
  }

  handleInterestPayableChange(event){
    this.setState({interestPayable: event.target.value});
  }

  handleTaxesPayableChange(event){
    this.setState({taxesPayable: event.target.value});
  }

  handleDeferredRevenueChange(event){
    this.setState({deferredRevenue: event.target.value});
  }

  handleShortTermNotesChange(event){
    this.setState({shortTermNotes: event.target.value});
  }

  handleCurrentPartLongTermDebtChange(event){
    this.setState({currentPartLongTermDebt: event.target.value});
  }

  handleCurrentLiabilitiesChange(event){
    this.setState({currentLiabilities: event.target.value});
  }

  //Long Term debt Handlers
  handleBankLoansPayableChange(event){
    this.setState({bankLoansPayable: event.target.value});
  }

  handleNotesPayableToStockholdersChange(event){
    this.setState({notesPayableToStockholders: event.target.value});
  }

  handleOtherLongTermDebtChange(event){
    this.setState({otherLongTermDebt: event.target.value});
  }

  //Owners equity handlers
  handleCommonStockChange(event){
    this.setState({commonStock: event.target.value});
  }

  handlePaidInSurplusChange(event){
    this.setState({paidInSurplus: event.target.value});
  }

  handleRetainedEarningsChange(event){
    this.setState({retainedEarnings: event.target.value});
  }

  //Sales and Marketing handlers
  handleProspectsLeadsChange(event){
    this.setState({prospectsLeads: event.target.value});
  }

  handleNumOfSalesRecChange(event){
    this.setState({numOfSalesRec: event.target.value});
  }

  handleMarketingSpentChange(event){
    this.setState({marketingSpent: event.target.value});
  }

  handleGrandTotalUnitsChange(event){
    this.setState({grandTotalUnits: event.target.value});
  }

  //financial Rates of Interest
  handleAvgIntRateChange(event){
    this.setState({avgIntRate: event.target.value});
  }

  handleAvgEquityIntRateChange(event){
    this.setState({avgEquityIntRate: event.target.value});
  }

  handleAvgFinancingIntRateChange(event){
    this.setState({avgFinancingIntRate: event.target.value});
  }

  handleCorporateTaxRateChange(event){
    this.setState({corporateTaxRate: event.target.value});
  }


  handleInputFormSubmit(event){
    event.preventDefault();
    console.log(this.state);
    let accessToken = localStorage.getItem('Access-Token');
    let client = localStorage.getItem('Client');
    let tokenType = localStorage.getItem('Token-Type');
    let uid = localStorage.getItem('Uid');
    let bId = localStorage.getItem('bId');

    superagent
      .post('http://controlledprofits.herokuapp.com/v1/businesses/'+ bId + '/data/')
      .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
      ///period sales is where I store totalEarnedRevenue.
      .send({entry_type: 'actual',total_revenues: this.state.totalEarnedRevenue, cogs: this.state.costOfGoodsSold, marketing: this.state.marketing,    direct_labor: this.state.directLabor, distribution: this.state.distribution, salaries: this.state.salaries, benefit_admin:  this.state.benefits, office_lease: this.state.office, office_supplies: this.state.officeSupplies,
        utilities: this.state.utilities, transportation: this.state.transportation, online_expenses: this.state.onlineExp, insurance:this.state.insurance, training: this.state.training, accounting_and_legal: this.state.accountAndLegal, advertising: this.state.ads, marketing_development: this.state.marketingDev,
        other: this.state.other, interest_paid:this.state.intPaid, depreciation_and_amortization: this.state.depreciationAndAmortization, tax_rate:this.state.taxRate, cash: this.state.cash, accounts_receivable:this.state.accountsReceivable, inventory:this.state.inventory, prepaid_expenses:this.state.prepaidExpenses, other_current_assets:this.state.otherCurrentAssets, ppe: this.state.propertyPlantEquipment,
        furniture_and_fixtures:this.state.furnitureFixtures, leasehold_improvements:this.state.leaseholdImprovements, land_and_buildings: this.state.landBuilding, other_fixed_assets:this.state.otherFixedAssets, accumulated_depreciation: this.state.accumulatedDepreciation, goodwill: this.state.goodwill, accounts_payable:this.state.accountsPayable, interests_payable:this.state.interestPayable, taxes_payable: this.state.taxesPayable, deferred_revenue:this.state.deferredRevenue,
        short_term_notes:this.state.shortTermNotes, current_debt:this.state.currentPartLongTermDebt, other_current_liabilities:this.state.currentLiabilities, bank_loans_payable:this.state.bankLoansPayable, notes_payable_to_stockholders: this.state.notesPayableToStockholders, other_long_term_debt:this.state.otherLongTermDebt, common_stock: this.state.commonStock, paid_in_surplus: this.state.paidInSurplus, retained_earnings:this.state.retainedEarnings, prospects: this.state.prospectsLeads,
        number_of_sales: this.state.numberOfSalesRec, marketing_spend: this.state.marketingSpent, grand_total_units:this.state.grandTotalUnits, airp_debt:this.state.avgIntRate, airp_equity:this.state.avgEquityIntRate, airc_for_financing: this.state.avgFinancingIntRate, corp_tax_rate: this.state.corporateTaxRate})
      .end((err, res) => {
        if(err) { this.setState({errorMessage: "Authentication Failed"}); return; }
        console.log('successfully posted.')
      });

  }




  render(){
    return(
      <div>
        <form onSubmit={this.handleInputFormSubmit.bind(this)}>
          <h1 className='section-header'>Income Statement Data Input</h1>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Total earned Revnue</h3>

            <div className="input-group financial-input">
              <label className="input-group-addon financial-title">Total Earned Revenue (Cash & Credit)</label>
              <span className="input-group-addon">$</span>
              <input type="number" className="form-control" onChange={this.handleTOEChange.bind(this)} value={this.state.totalEarnedRevenue} placeholder='0.00'/>
            </div>

            <hr/>
          </div>
          {/* Cost of Sales Below */}
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Cost of Sales</h3>
            <div className='field-input'>
              {/* Cost of Goods Sold */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Cost of Goods Sold (materials, storae, packaging)</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleCOGSChange.bind(this)} value={this.state.costOfGoodsSold} placeholder='0.00'/>
              </div>
              {/* Marketing */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Marketing</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleMarketingChange.bind(this)} value={this.state.marketing} placeholder='0.00'/>
              </div>
              {/* Direct Labor */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Direct Labor</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleDirectLaborChange.bind(this)} value={this.state.directLabor} placeholder='0.00'/>
              </div>
              {/* Distribution */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Distribution</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleDistroChange.bind(this)} value={this.state.distribution} placeholder='0.00'/>
              </div>

            </div>
            <hr/>
          </div>
          {/* fixed Expenses below */}
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Fixed Expenses (SG&A)</h3>
            <div className='field-input'>
              {/* Salaries */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Salaries (including payroll taxes)</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleSalariesChange.bind(this)} value={this.state.salaries} placeholder='0.00'/>
              </div>
              {/* Benefits */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Benefit Admin (payroll services, contributions, etc)</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleBenefitsChange.bind(this)} value={this.state.benefits} placeholder='0.00'/>
              </div>
              {/* Office */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Office Lease/Rent</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleOfficeChange.bind(this)} value={this.state.office} placeholder='0.00'/>
              </div>
              {/* Office Supplies */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Office Supplies</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleOfficeSuppliesChange.bind(this)} value={this.state.officeSupplies} placeholder='0.00'/>
              </div>
              {/* Utilities */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Utilities</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleUtilitiesChange.bind(this)} value={this.state.utilities} placeholder='0.00'/>
              </div>
              {/* Transportation */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Transportation</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleTransportationChange.bind(this)} value={this.state.transportation} placeholder='0.00'/>
              </div>
              {/* OnlineExp */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Online Expenses</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleOnlineExpChange.bind(this)} value={this.state.onlineExp} placeholder='0.00'/>
              </div>
              {/* insurance */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Insurance</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleInsuranceChange.bind(this)} value={this.state.insurance} placeholder='0.00'/>
              </div>
              {/* Training */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Training</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleTrainingChange.bind(this)} value={this.state.training} placeholder='0.00'/>
              </div>
              {/* Accounting And Legal */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Accounting & Legal</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleAccountAndLegalChange.bind(this)} value={this.state.accountAndLegal} placeholder='0.00'/>
              </div>
              {/* Ads */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Advertising</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleAdsChange.bind(this)} value={this.state.ads} placeholder='0.00'/>
              </div>
              {/* Marketing Development */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Marketing Development</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleMarketingDevChange.bind(this)} value={this.state.marketingDev} placeholder='0.00'/>
              </div>
              {/* Other */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Other (Repairs, Maintenance, Furniture)</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleOtherChange.bind(this)} value={this.state.other} placeholder='0.00'/>
              </div>
              {/* Interest Paid */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Interest Paid</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleIntPaidChange.bind(this)} value={this.state.intPaid} placeholder='0.00'/>
              </div>
              {/* Donations */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Donations</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleDonationsChange.bind(this)} value={this.state.donations} placeholder='0.00'/>
              </div>
              {/* Depreciation & Amortization */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Depreciation & Amortization</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleDepreciationAndAmortizationChange.bind(this)} value={this.state.depreciationAndAmortization} placeholder='0.00'/>
              </div>
              {/* TaxRate */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Tax Rate</label>
                <input type="number" className="form-control" onChange={this.handleTaxRateChange.bind(this)} value={this.state.taxRate} placeholder='0.00'/>
                <span className="input-group-addon">%</span>
              </div>
            </div>
            <hr/>
          </div>
          {/* Current Assets */}
          <h1 className='section-header'>Balance Sheet Data Input</h1>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Current Assests</h3>
            <div className='field-input'>
              {/* Cash */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Cash</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleCashChange.bind(this)} value={this.state.cash} placeholder='0.00'/>
              </div>
              {/* Accounts Receivable */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Accounts Receivable</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleAccountsReceivableChange.bind(this)} value={this.state.accountsReceivable} placeholder='0.00'/>
              </div>
              {/* Inventory */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Inventory</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleInventoryChange.bind(this)} value={this.state.inventory} placeholder='0.00'/>
              </div>
              {/* prepaid Expenses */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Prepaid Expenses</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handlePrepaidExpensesChange.bind(this)} value={this.state.prepaidExpenses} placeholder='0.00'/>
              </div>
              {/* other Current Assets */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Other Current Assets</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleOtherCurrentAssetsChange.bind(this)} value={this.state.otherCurrentAssets} placeholder='0.00'/>
              </div>
            </div>
            <hr/>
          </div>
          {/* Fixed Assets and Long Term Assets */}
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Fixed Assets = Long Term Assets</h3>
            <div className='field-input'>
              {/* Property, Plant & Equipment */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Property, Plant & Equipment</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handlePropertyPlantEquipmentChange.bind(this)} value={this.state.propertyPlantEquipment} placeholder='0.00'/>
              </div>
              {/* Furniture & Fixtures */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Furniture & Fixtures</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleFurnitureFixturesChange.bind(this)} value={this.state.furnitureFixtures} placeholder='0.00'/>
              </div>
              {/* Leasehold Improvements */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Leasehold Improvements</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleLeaseholdImprovementsChange.bind(this)} value={this.state.leaseholdImprovements} placeholder='0.00'/>
              </div>
              {/* Land & Building */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Land & Building</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleLandBuildingChange.bind(this)} value={this.state.landBuilding} placeholder='0.00'/>
              </div>
              {/* Other Fixed Assets */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Other Fixed Assets</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleOtherFixedAssetsChange.bind(this)} value={this.state.otherFixedAssets} placeholder='0.00'/>
              </div>

              {/* Accumulated Depreciation */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Accumulated Depreciation</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleAccumulatedDepreciationChange.bind(this)} value={this.state.accumulatedDepreciation} placeholder='0.00'/>
              </div>
              {/* GoodWill */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Goodwill</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleGoodwillChange.bind(this)} value={this.state.goodwill} placeholder='0.00'/>
              </div>
            </div>
            <hr/>
          </div>
          {/* Current Liabilities */}
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Current Liabilities</h3>
            <div className='field-input'>
              {/* Accounts Payable */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Accounts Payable</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleAccountsPayableChange.bind(this)} value={this.state.accountsPayable} placeholder='0.00'/>
              </div>
              {/* Interest Payable */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Interest Payable</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleInterestPayableChange.bind(this)} value={this.state.interestPayable} placeholder='0.00'/>
              </div>
              {/* Taxes Payable */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Taxes Payable</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleTaxesPayableChange.bind(this)} value={this.state.taxesPayable} placeholder='0.00'/>
              </div>
              {/* Deferred Revenue */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Deferred Revenue</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleDeferredRevenueChange.bind(this)} value={this.state.deferredRevenue} placeholder='0.00'/>
              </div>
              {/* Short Term Notes (Due within 12 months) */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Short Term Notes (Due within 12 months)</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleShortTermNotesChange.bind(this)} value={this.state.shortTermNotes} placeholder='0.00'/>
              </div>
              {/* Current Part, Long Term Debt */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Current Part, Long Term Debt</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleCurrentPartLongTermDebtChange.bind(this)} value={this.state.currentPartLongTermDebt} placeholder='0.00'/>
              </div>
              {/* Current Liabilities  */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Current Liabilities </label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleCurrentLiabilitiesChange.bind(this)} value={this.state.currentLiabilities} placeholder='0.00'/>
              </div>
            </div>
            <hr/>
          </div>
          {/* Long Term Debt */}
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Long Term Debt</h3>
            <div className='field-input'>
              {/*Bank Loans Payable */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Bank Loans Payable</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleBankLoansPayableChange.bind(this)} value={this.state.bankLoansPayable} placeholder='0.00'/>
              </div>
              {/* Notes payable to Stockholders */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Notes payable to Stockholders</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleNotesPayableToStockholdersChange.bind(this)} value={this.state.notesPayableToStockholders} placeholder='0.00'/>
              </div>
              {/* Other Long Term Debt */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Other Long Term Debt</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleOtherLongTermDebtChange.bind(this)} value={this.state.otherLongTermDebt} placeholder='0.00'/>
              </div>
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Owners Equity</h3>
            <div className='field-input'>
              {/* Common Stock */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Common Stock</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleCommonStockChange.bind(this)} value={this.state.commonStock} placeholder='0.00'/>
              </div>
              {/* Paid-In Surplus */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Paid-In Surplus</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handlePaidInSurplusChange.bind(this)} value={this.state.paidInSurplus} placeholder='0.00'/>
              </div>
              {/* Retained Earnings */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Retained Earnings</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleRetainedEarningsChange.bind(this)} value={this.state.retainedEarnings} placeholder='0.00'/>
              </div>
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Sales and Marketing Data Input</h3>
            <div className='field-input'>
              {/* Prospects / Leads */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Prospects / Leads</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleProspectsLeadsChange.bind(this)} value={this.state.prospectsLeads} placeholder='0.00'/>
              </div>
              {/* Number of Sales (Receipts) */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Number of Sales (Receipts)</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleNumOfSalesRecChange.bind(this)} value={this.state.numOfSalesRec} placeholder='0.00'/>
              </div>
              {/* Marketing Spend (Direct -from P&L) */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Marketing Spend (Direct -from P&L)</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleMarketingSpentChange.bind(this)} value={this.state.marketingSpent} placeholder='0.00'/>
              </div>
              {/* Grand Total Units */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Grand Total Units</label>
                <span className="input-group-addon">$</span>
                <input type="number" className="form-control" onChange={this.handleGrandTotalUnitsChange.bind(this)} value={this.state.grandTotalUnits} placeholder='0.00'/>
              </div>
            </div>
            <hr/>
          </div>
          <div className='input-title-container'>
            <h3 className='sub-section-header'>Financial Rates of Interest</h3>
            <div className='field-input'>
              {/* Average Interest Rate Paid (Debt) */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Average Interest Rate Paid (Debt)</label>
                <input type="text" className="form-control" onChange={this.handleAvgIntRateChange.bind(this)} value={this.state.avgIntRate} placeholder='0'/>
                <span className="input-group-addon">%</span>
              </div>
              {/* Average Interest Rate Paid (Equity) */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Average Interest Rate Paid (Equity)</label>
                <input type="number" className="form-control" onChange={this.handleAvgEquityIntRateChange.bind(this)} value={this.state.avgEquityIntRate} placeholder='0'/>
                <span className="input-group-addon">%</span>
              </div>
              {/* Average Interest Rate Charged for Financing */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Average Interest Rate Charged for Financing</label>
                <input type="number" className="form-control" onChange={this.handleAvgFinancingIntRateChange.bind(this)} value={this.state.avgFinancingIntRate} placeholder='0'/>
                <span className="input-group-addon">%</span>
              </div>
              {/* Corporate Tax Rate */}
              <div className="input-group financial-input">
                <label className="input-group-addon financial-title">Corporate Tax Rate</label>
                <input type="number" className="form-control" onChange={this.handleCorporateTaxRateChange.bind(this)} value={this.state.corporateTaxRate} placeholder='0'/>
                <span className="input-group-addon">%</span>
              </div>
            </div>
            <hr/>
          </div>
          <button type='submit' className="btn btn-primary btn-lrg">Submit</button>
        </form>
      </div>
    )
  }
}

export default TempForm;

// const getInputField = (mappingField) => {
//   let resultCards = mappingField.map((card) => {
//     return(
//       <div className="input-field-container">
//         <label>{card.title}</label>
//         <input name={card.name} value={card.value}/>
//       </div>
//     )
//   })
// }
//
// let renderInput = (field) => {
//   return(
//       <div className="input-group financial-input">
//       <label className='input-group-addon financial-title'>{field.placeholder}</label>
//       <span className="input-group-addon">$</span>
//       <input className='form-control' {...field.input}/>
//     </div>
//   )
// }
//
//
//
// const TempForm = ({ handleSubmit }) =>
//   <div>
//     <h1>Income Statement</h1>
//     <form onSubmit={handleSubmit(submitInputForm)}>
//       <h2>Total Earned Income</h2>
//       <Field name="totalEarnedRevenue" component={renderInput} placeholder='Total Earned Revenue (Cash & Credit)'/>
//       <button className="btn btn-primary" type="submit">Submit</button>
//     </form>
//   </div>
