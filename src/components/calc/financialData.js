export default class FinancialData {
  constructor(financialData) {
    //if(!this.financialData) throw 'FinancialData must be initialized with a financial data entry object.';

    // Object.assign ensures we get a new copy instead of a reference
    this.incomeStatement = Object.assign({}, financialData.incomeStatement);
    this.balanceSheet = Object.assign({}, financialData.balanceSheet);
    this.salesAndMarketing = Object.assign({}, financialData.salesAndMarketing);
    this.financialROI = Object.assign({}, financialData.financialROI);

    this.varExpensesKeys = ['cogs', 'marketing', 'directLabor', 'distribution', 'vpie'];

    this.fixedExpensesKeys = ['salaries', 'benefitAdmin', 'officeLease', 'officeSupplies',
      'utilities', 'transportation', 'onlineExpenses', 'insurance', 'training',
      'accountingAndLegal', 'advertising', 'marketingDevelopment', 'other', 'fpie'];

    this.currentAssetsKeys = ['cash', 'accountsReceivable', 'inventory', 'prepaidExpenses',
      'otherCurrentAssets'];

    this.liabilitiesKeys = ['accountsPayable', 'interestPayable', 'taxesPayable', 
      'deferredRevenue', 'shortTermNotes', 'currentDebt', 'otherCurrentLiabilities'];

    this.ownersEquityKeys = ['commonStock', 'paidInSurplus', 'retainedEarnings'];

  }

  currentAssets() {
    let result = 0;
    for(var i = 0; i < this.currentAssetsKeys.length; i++) {
      result += this.balanceSheet[this.currentAssetsKeys[i]];
    }

    return result;
  }

  currentLiabilities() {
    let result = 0;
    for(var i = 0; i < this.liabilitiesKeys.length; i++) {
      result += this.balanceSheet[this.liabilitiesKeys[i]];
    }

    return result;
  }

  currentTotalOwnersEquity() {
    let result = 0;
    for(var i = 0; i < this.ownersEquityKeys.length; i++) {
      result += this.balanceSheet[this.ownersEquityKeys[i]];
    }

    return result;
  }


  // Var Expenses / Cost of Sales (COS)
  currentSubtotalCOS() {
    let result = 0;
    for(var i = 0; i < this.varExpensesKeys.length; i++) {
      result += this.incomeStatement[this.varExpensesKeys[i]];
    }

    return result;
  }

  // Fixed Expenses / SG&A
  currentFixedExpenses() {
    let result = 0;
    for(var i = 0; i < this.fixedExpensesKeys.length; i++)
      result += this.incomeStatement[this.fixedExpensesKeys[i]];
    return result;
  }

  currentRevenues() {
    return this.incomeStatement.totalRevenues;
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
    return this.currentEBITDA() - this.incomeStatement.interestPaid;
  }

  targetOpProfit(EBITDA, interestPaid) {
    return EBITDA - interestPaid;
  }

  currentTaxableIncome() {
    return this.currentOpProfit() - this.incomeStatement.depreciationAndAmortization
      - this.incomeStatement.donations;
  }

  currentTaxes() {
    return this.financialROI.corpTaxRate * this.currentTaxableIncome();
  }

  currentNetOpProfit() {
    return this.currentTaxableIncome() - this.currentTaxes();
  }

  targetNetOpProfit(EBITDA) {
    let opProfit = EBITDA - this.incomeStatement.interestPaid;
    let taxableIncome = opProfit - this.incomeStatement.depreciationAndAmortization
      - this.incomeStatement.donations;
    let taxes = this.financialROI.corpTaxRate * taxableIncome;

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
    return this.conversionRate(this.salesAndMarketing.numberOfSales, this.salesAndMarketing.prospects);
  }
  
  currentAvgPPU() {
    return this.avgPricePerUnit(this.currentRevenues(), this.salesAndMarketing.grandTotalUnits);
  }

  targetSubtotalCOS(driverName, percent, vpie, fpie) {
    let result = 0;

    switch(driverName) {
      case 'prospects':
        result = this.currentSubtotalCOS() + vpie;
        break;
      case 'conversions':
        result += this.incomeStatement.cogs * (1+percent);
        result += this.incomeStatement.marketing * (1+percent) + vpie;
        result += this.incomeStatement.directLabor * (1+percent) + fpie;
        result += this.incomeStatement.distribution * (1+percent);
        result += vpie;
        break;
      case 'volume':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.incomeStatement[this.varExpensesKeys[i]] * (1+percent);
        result += vpie;
        break;
      case 'price':
        result += this.currentSubtotalCOS() + vpie;
        break;
      case 'productivity':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.incomeStatement[this.varExpensesKeys[i]] * (1-percent);
        result += vpie;
        break;
      case 'efficiency':
        result += this.currentSubtotalCOS() + vpie;
        break;
      case 'frequency':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.incomeStatement[this.varExpensesKeys[i]] * (1+percent);
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
          result += this.incomeStatement[this.fixedExpensesKeys[i]] * (1-percent);
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
        result.impact = this.salesAndMarketing.prospects * percent;
        break;
      case 'conversions':
        let currentConversionRate = this.conversionRate(this.salesAndMarketing.numberOfSales, this.salesAndMarketing.prospects);
        let targetConversionRate = currentConversionRate * (1+percent);
        result.impact = targetConversionRate - currentConversionRate;
        break;             
      case 'volume':
        result.impact = this.salesAndMarketing.grandTotalUnits * percent
        break;
      case 'price':
        result.impact = this.avgPricePerUnit(this.incomeStatement.totalRevenues, 
          this.salesAndMarketing.grandTotalUnits) * percent;
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