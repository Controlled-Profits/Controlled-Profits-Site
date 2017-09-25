export default class FinancialData {
  constructor(financialData) {
    //if(!this.financialData) throw 'FinancialData must be initialized with a financial data entry object.';

    this.financialData = financialData;
    this.incomeStatement = this.financialData.incomeStatement;
    this.balanceSheet = this.financialData.balanceSheet;
    this.salesAndMarketing = this.financialData.salesAndMarketing;
    this.financialROI = this.financialData.financialROI;

    this.varExpensesKeys = ['cogs', 'marketing', 'directLabor', 'distribution', 'vpie'];

    this.fixedExpensesKeys = ['salaries', 'benefitAdmin', 'officeLease', 'officeSupplies',
      'utilities', 'transportation', 'onlineExpenses', 'insurance', 'training',
      'accountingAndLegal', 'advertising', 'marketingDevelopment', 'other', 'fpie'];

  }


  // Var Expenses / Cost of Sales (COS)
  currentSubtotalCOS() {
    let result = 0;
    for(var i = 0; i < this.varExpensesKeys.length; i++) {
      result += this.financialData.incomeStatement[this.varExpensesKeys[i]];
    }

    return result;
  }

  // Fixed Expenses / SG&A
  currentFixedExpenses() {
    let result = 0;
    for(var i = 0; i < this.fixedExpensesKeys.length; i++)
      result += this.financialData.incomeStatement[this.fixedExpensesKeys[i]];
    return result;
  }

  currentRevenues() {
    return this.financialData.incomeStatement.totalRevenues;
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
    return this.currentEBITDA() - this.financialData.incomeStatement.interestPaid;
  }

  targetOpProfit(EBITDA, interestPaid) {
    return EBITDA - interestPaid;
  }

  currentTaxableIncome() {
    return this.currentOpProfit() - this.financialData.incomeStatement.depreciationAndAmortization
      - this.financialData.incomeStatement.donations;
  }

  currentTaxes() {
    return this.financialData.financialROI.corpTaxRate * this.currentTaxableIncome();
  }

  currentNetOpProfit() {
    return this.currentTaxableIncome() - this.currentTaxes();
  }

  targetNetOpProfit(EBITDA) {
    let opProfit = EBITDA - this.financialData.incomeStatement.interestPaid;
    let taxableIncome = opProfit - this.financialData.incomeStatement.depreciationAndAmortization
      - this.financialData.incomeStatement.donations;
    let taxes = this.financialData.financialROI.corpTaxRate * taxableIncome;

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
    return this.conversionRate(this.financialData.salesAndMarketing.numberOfSales, this.financialData.salesAndMarketing.prospects);
  }
  
  currentAvgPPU() {
    return this.avgPricePerUnit(this.currentRevenues(), this.financialData.salesAndMarketing.grandTotalUnits);
  }

  targetSubtotalCOS(driverName, percent, vpie, fpie) {
    let result = 0;

    switch(driverName) {
      case 'prospects':
        result = this.currentSubtotalCOS() + vpie;
        break;
      case 'conversions':
        result += this.financialData.incomeStatement.cogs * (1+percent);
        result += this.financialData.incomeStatement.marketing * (1+percent) + vpie;
        result += this.financialData.incomeStatement.directLabor * (1+percent) + fpie;
        result += this.financialData.incomeStatement.distribution * (1+percent);
        result += vpie;
        break;
      case 'volume':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.financialData.incomeStatement[this.varExpensesKeys[i]] * (1+percent);
        result += vpie;
        break;
      case 'price':
        result += this.currentSubtotalCOS() + vpie;
        break;
      case 'productivity':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.financialData.incomeStatement[this.varExpensesKeys[i]] * (1-percent);
        result += vpie;
        break;
      case 'efficiency':
        result += this.currentSubtotalCOS() + vpie;
        break;
      case 'frequency':
        for(var i = 0; i < this.varExpensesKeys.length; i++)
          result += this.financialData.incomeStatement[this.varExpensesKeys[i]] * (1+percent);
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
          result += this.financialData.incomeStatement[this.fixedExpensesKeys[i]] * (1-percent);
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
        result.impact = this.financialData.salesAndMarketing.prospects * percent;
        break;
      case 'conversions':
        let currentConversionRate = this.conversionRate(this.financialData.salesAndMarketing.numberOfSales, this.financialData.salesAndMarketing.prospects);
        let targetConversionRate = currentConversionRate * (1+percent);
        result.impact = targetConversionRate - currentConversionRate;
        break;             
      case 'volume':
        result.impact = this.financialData.salesAndMarketing.grandTotalUnits * percent
        break;
      case 'price':
        result.impact = this.avgPricePerUnit(this.financialData.incomeStatement.totalRevenues, 
          this.financialData.salesAndMarketing.grandTotalUnits) * percent;
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