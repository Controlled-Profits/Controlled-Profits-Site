export default class FinancialData {
  constructor(financialData) {
    //if(!this.financialData) throw 'FinancialData must be initialized with a financial data entry object.';

    this.financialData = financialData;

    // Stores data for total profit impact calculations
    // TODO: Refactor this and float parsing into original api grab
    this.incomeStatementActual = {
      totalRevenues: this.financialData['income_statement']['total_revenues'],
      cogs: this.financialData['income_statement']['cogs'],
      marketing: this.financialData['income_statement']['marketing'],
      directLabor: this.financialData['income_statement']['direct_labor'],
      distribution: this.financialData['income_statement']['distribution'],
      vpie: this.financialData['income_statement']['vpie'],
      salaries: this.financialData['income_statement']['salaries'],
      benefitAdmin: this.financialData['income_statement']['benefit_admin'],
      officeLease: this.financialData['income_statement']['office_lease'],
      officeSupplies: this.financialData['income_statement']['office_supplies'],
      utilities: this.financialData['income_statement']['utilities'],
      transportation: this.financialData['income_statement']['transportation'],
      onlineExpenses: this.financialData['income_statement']['online_expenses'],
      insurance: this.financialData['income_statement']['insurance'],
      training: this.financialData['income_statement']['training'],
      accountingAndLegal: this.financialData['income_statement']['accounting_and_legal'],
      advertising: this.financialData['income_statement']['advertising'],
      marketingDevelopment: this.financialData['income_statement']['marketing_development'],
      other: this.financialData['income_statement']['other'],
      fpie: this.financialData['income_statement']['fpie'],
      interestPaid: this.financialData['income_statement']['interest_paid'],
      depreciationAndAmortization: this.financialData['income_statement']['depreciation_and_amortization'],
      donations: this.financialData['income_statement']['donations'],
      taxRate: this.financialData['income_statement']['tax_rate'],
      dividends: this.financialData['income_statement']['dividends']
    }

    this.balanceSheetActual = {
      cash: this.financialData['balance_sheet']['cash'],
      accountsReceivable: this.financialData['balance_sheet']['accounts_receivable'],
      inventory: this.financialData['balance_sheet']['inventory'],
      prepaidExpenses: this.financialData['balance_sheet']['prepaid_expenses'],
      otherCurrentAssets: this.financialData['balance_sheet']['other_current_assets'],
      ppe: this.financialData['balance_sheet']['ppe'],
      furnitureAndFixtures: this.financialData['balance_sheet']['furniture_and_fixtures'],
      leaseholdImprovements: this.financialData['balance_sheet']['leasehold_improvements'],
      landAndBuildings: this.financialData['balance_sheet']['land_and_buildings'],
      otherFixedAssets: this.financialData['balance_sheet']['other_fixed_assets'],
      accumulatedDepreciation: this.financialData['balance_sheet']['accumulated_depreciation'],
      goodwill: this.financialData['balance_sheet']['goodwill'],
      accountsPayable: this.financialData['balance_sheet']['accounts_payable'],
      interestPayable: this.financialData['balance_sheet']['interests_payable'],
      taxesPayable: this.financialData['balance_sheet']['taxes_payable'],
      deferredRevenue: this.financialData['balance_sheet']['deferred_revenue'],
      shortTermNotes: this.financialData['balance_sheet']['short_term_notes'],
      currentDebt: this.financialData['balance_sheet']['current_debt'],
      otherCurrentLiabilities: this.financialData['balance_sheet']['other_current_liabilities'],
      bankLoansPayable: this.financialData['balance_sheet']['bank_loans_payable'],
      notesPayableToStockholders: this.financialData['balance_sheet']['notes_payable_to_stockholders'],
      otherLongTermDebt: this.financialData['balance_sheet']['other_long_term_debt'],
      commonStock: this.financialData['balance_sheet']['common_stock'],
      paidInSurplus: this.financialData['balance_sheet']['paid_in_surplus'],
      retainedEarnings: this.financialData['balance_sheet']['retained_earnings']
    }

    this.salesAndMarketingActual = {
      prospects: this.financialData['sales_and_marketing']['prospects'],
      numberOfSales: this.financialData['sales_and_marketing']['number_of_sales'],
      marketingSpend: this.financialData['sales_and_marketing']['marketing_spend'],
      grandTotalUnits: this.financialData['sales_and_marketing']['grand_total_units']
    }

    this.financialROIActual = {
      airpDebt: this.financialData['financial_roi']['airp_debt'],
      airpEquity: this.financialData['financial_roi']['airp_equity'],
      airpForFinancing: this.financialData['financial_roi']['airp_for_financing'],
      corpTaxRate: this.financialData['financial_roi']['corp_tax_rate']
    }

    this.varExpensesKeys = ['cogs', 'marketing', 'directLabor', 'distribution', 'vpie'];

    this.fixedExpensesKeys = ['salaries', 'benefitAdmin', 'officeLease', 'officeSupplies',
      'utilities', 'transportation', 'onlineExpenses', 'insurance', 'training',
      'accountingAndLegal', 'advertising', 'marketingDevelopment', 'other', 'fpie'];

    this.init();
  }

  init() {
    //Loop through sections and parse to float, copy to adjusted sections
    for(var key in this.incomeStatementActual) {
      if(this.incomeStatementActual.hasOwnProperty(key)) {
        let val = parseFloat(this.incomeStatementActual[key]);
        if(isNaN(val)) val = 0;
        this.incomeStatementActual[key] = val;
      }
    }

    for(var key in this.balanceSheetActual) {
      if(this.balanceSheetActual.hasOwnProperty(key)) {
        let val = parseFloat(this.balanceSheetActual[key]);
        if(isNaN(val)) val = 0;
        this.balanceSheetActual[key] = val;
      }
    }

    for(var key in this.salesAndMarketingActual) {
      if(this.salesAndMarketingActual.hasOwnProperty(key)) {
        let val = parseFloat(this.salesAndMarketingActual[key]);
        if(isNaN(val)) val = 0;
        this.salesAndMarketingActual[key] = val;
      }
    }

    for(var key in this.financialROIActual) {
      if(this.financialROIActual.hasOwnProperty(key)) {
        let val = parseFloat(this.financialROIActual[key]);
        if(isNaN(val)) val = 0;
        this.financialROIActual[key] = val;
      }
    }
  }

  // Var Expenses / Cost of Sales (COS)
  currentSubtotalCOS() {
    let result = 0;
    for(var i = 0; i < this.varExpensesKeys.length; i++) {
      result += this.incomeStatementActual[this.varExpensesKeys[i]];
    }

    return result;
  }

  // Fixed Expenses / SG&A
  currentFixedExpenses() {
    let result = 0;
    for(var i = 0; i < this.fixedExpensesKeys.length; i++)
      result += this.incomeStatementActual[this.fixedExpensesKeys[i]];
    return result;
  }

  currentRevenues() {
    return this.incomeStatementActual.totalRevenues;
  }

  targetRevenues(grandTotalUnits, avgPPU) {
    return grandTotalUnits * avgPPU;
  }

  currentEBITDA() {
    return this.currentRevenues() - this.currentSubtotalCOS() - this.currentFixedExpenses();
  }

  targetEBITDA(revenues, cos, fixedExpenses) {
    return revenues - cos - fixedExpenses;
  }

  currentOpProfit() {
    return this.currentEBITDA() - this.incomeStatementActual.interestPaid;
  }

  targetOpProfit(EBITDA, interestPaid) {
    return EBITDA - interestPaid;
  }

  currentTaxableIncome() {
    return this.currentOpProfit() - this.incomeStatementActual.depreciationAndAmortization
      - this.incomeStatementActual.donations;
  }

  currentTaxes() {
    return this.financialROIActual.corpTaxRate * this.currentTaxableIncome();
  }

  currentNetOpProfit() {
    return this.currentTaxableIncome() - this.currentTaxes();
  }

  targetNetOpProfit(EBITDA) {
    let opProfit = EBITDA - this.incomeStatementActual.interestPaid;
    let taxableIncome = opProfit - this.incomeStatementActual.depreciationAndAmortization
      - this.incomeStatementActual.donations;
    let taxes = this.financialROIActual.corpTaxRate * taxableIncome;
    return taxableIncome - taxes;
  }

  /* Mid-level sales & marketing metrics and financial ratios calculations */

  conversionRate(numSales, prospects) {
    return numSales / prospects;
  }

  costPerLead(marketing, prospects) {
    return marketing / prospects;
  }

  costPerConversion(numSales, marketing) {
    return numSales / marketing;
  }

  avgPricePerUnit(totalRevenues, GTU) {
    return totalRevenues / GTU;
  }

  variableCostPerUnit(COS, GTU) {
    return COS / GTU;
  }

  fixedCostPerUnit(fixedExpenses, GTU) {
    return fixedExpenses / GTU;
  }

  volume(GTU, numSales) {
    return GTU / numSales;
  }

  avgDollarPerReceipt(totalRevenues, numSales) {
    return totalRevenues / numSales;
  }

  // Avg price per unit, var cost per unit
  unitsBreakEvenPt(fixedExpenses, avgPPU, vcPU) {
    return fixedExpenses / (avgPPU - vcPU)
  }

  salesBreakEvenPt(fixedExpenses, contributionMargin) {
    return fixedExpenses / contributionMargin;
  }

  currentConversionRate() {
    return this.conversionRate(this.salesAndMarketingActual.numberOfSales, this.salesAndMarketingActual.prospects);
  }
  
  currentAvgPPU() {
    return this.avgPricePerUnit(this.currentRevenues(), this.salesAndMarketingActual.grandTotalUnits);
  }

  targetSubtotalCOS(driverName, percent, vpie, fpie) {
    let result = 0;

    switch(driverName) {
      case 'prospects':
        result = this.currentSubtotalCOS() + vpie;
        break;
      case 'conversions':
        result += this.incomeStatementActual.cogs * (1+percent);
        result += this.incomeStatementActual.marketing * (1+percent) + vpie;
        result += this.incomeStatementActual.directLabor * (1+percent) + fpie;
        result += this.incomeStatementActual.distribution * (1+percent);
        result += vpie;
        break;
      case 'volume':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.incomeStatementActual[this.varExpensesKeys[i]] * (1+percent);
        result += vpie;
        break;
      case 'price':
        result += this.currentSubtotalCOS() + vpie;
        break;
      case 'productivity':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.incomeStatementActual[this.varExpensesKeys[i]] * (1-percent);
        result += vpie;
        break;
      case 'efficiency':
        result += this.currentSubtotalCOS() + vpie;
        break;
      case 'frequency':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.incomeStatementActual[this.varExpensesKeys[i]] * (1+percent);
        result += vpie;
        break;
    }

    return result;
  }

  targetFixedExpenses(driverName, percent, fpie) {
    let result = this.currentFixedExpenses() + fpie;
    switch(driverName) {
      case 'prospects':
      case 'conversions':
      case 'volume':
      case 'price':
      case 'productivity':
      case 'frequency':
        break;
      case 'efficiency':
        result = 0;
        for(var i = 0; i < this.fixedExpensesKeys.length; i++) {
          result += this.incomeStatementActual[this.fixedExpensesKeys[i]] * (1-percent);
        }
        result += fpie;
        break;
      default:
        break;
    }

    return result;
  }

  // Runs individual driver calculations and returns an object with the following fields:
  // impact: percent variance of effected field (depends on driver)
  // revenues: target total sales revenues
  // profit: target net profit from revenue and target COS and FE
  // annualized: annualize net profit calculation

  calcDriverTargets(driverName, percent, vpie, fpie) {
    let result = {
      impact: 0.0,
      revenues: 0.0,
      profit: 0.0,
      annualized: 0.0
    }

    //This generally seems to be the rule except for efficiency & prod
    //will go back to deeper calculations if wrong
    result.revenues = this.currentRevenues() * (1+percent);

    switch(driverName) {
      case 'prospects':
        result.impact = this.salesAndMarketingActual.prospects * percent;
        break;
      case 'conversions':
        let currentConversionRate = this.conversionRate(this.salesAndMarketingActual.numberOfSales, this.salesAndMarketingActual.prospects);
        let targetConversionRate = currentConversionRate * (1+percent);
        result.impact = targetConversionRate - currentConversionRate;
        break;             
      case 'volume':
        result.impact = this.salesAndMarketingActual.grandTotalUnits * percent
        break;
      case 'price':
        result.impact = this.avgPricePerUnit(this.incomeStatementActual.totalRevenues, 
          this.salesAndMarketingActual.grandTotalUnits) * percent;
        break;  
      case 'productivity':
        // Return COS amount drop
        result.impact = this.targetSubtotalCOS(driverName, percent, vpie, fpie)
          - this.currentSubtotalCOS();
        //Revenues unchanged by this driver
        result.revenues = this.currentRevenues();
        break;
      case 'efficiency':
        result.impact = this.targetFixedExpenses(driverName, percent, fpie, vpie) - 
          this.currentFixedExpenses();
        //Revenues unchanged
        result.revenues = this.currentRevenues();
        break;
      case 'frequency':
        result.impact = this.targetSubtotalCOS(driverName, percent, vpie, fpie) 
          - this.currentSubtotalCOS();
        break;
      default:
        break;
    }

    let EBITDA = this.targetEBITDA(result.revenues, 
      this.targetSubtotalCOS(driverName, percent, vpie, fpie), 
      this.targetFixedExpenses(driverName, percent, fpie));

    result.profit = this.targetNetOpProfit(EBITDA);

    result.annualized = result.profit * 12;

    return result;
  }
  

}