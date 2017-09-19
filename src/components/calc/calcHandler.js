export default class CalcHandler {
  constructor(financialData) {
    //This may break things fantastically, not sure of a gentler way to handle programmer error
    if(!financialData) return null;

    this.financialData = financialData;
  }

  /* Low level basic financial calculations */

  // Cost of sales
  getCurrentCOS() {
    let subtotalCOSItems = [
      this.financialData['income_statement']['cogs'],
      this.financialData['income_statement']['marketing'],
      this.financialData['income_statement']['direct_labor'],
      this.financialData['income_statement']['distribution']
    ]

    let subtotalCOS = 0;

    for(var i = 0; i < subtotalCOSItems.length; i++) {
      subtotalCOS += parseFloat(subtotalCOSItems[i]);
    }

    console.log(`current subtotal cos = ${subtotalCOS}`);
    return subtotalCOS;
  }

  getTargetCOS(targetGTU, VPIE) {
    let oldCOGs = parseFloat(this.financialData['income_statement']['cogs']);
    let subtotalCOS = this.getCurrentCOS() - oldCOGs,
        currentGTU = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']);

    //This may be wrong but appears to have the same value as original calc, double check w/ actual data
    let targetCOGs = parseFloat(currentGTU / targetGTU) * oldCOGs;

    subtotalCOS += targetCOGs + VPIE;

    console.log(`target subtotal COS = ${subtotalCOS}`);
    return subtotalCOS;
  }

  getCurrentFixedExpenses() {
    let fixedExpensesItems = [
      this.financialData['income_statement']['salaries'],
      this.financialData['income_statement']['benefit_admin'],
      this.financialData['income_statement']['office_lease'],
      this.financialData['income_statement']['office_supplies'],
      this.financialData['income_statement']['utilities'],
      this.financialData['income_statement']['transportation'],
      this.financialData['income_statement']['online_expenses'],
      this.financialData['income_statement']['insurance'],
      this.financialData['income_statement']['training'],
      this.financialData['income_statement']['accounting_and_legal'],
      this.financialData['income_statement']['advertising'],
      this.financialData['income_statement']['marketing_development'],
      this.financialData['income_statement']['other']
    ]

    let fixedExpenses = 0;
    for(var i = 0; i < fixedExpensesItems.length; i++) {
      fixedExpenses += parseFloat(fixedExpensesItems[i]);
    }

    console.log(`current fixed expenses = ${fixedExpenses}`);
    return fixedExpenses;
  }

  getTargetFixedExpenses(FPIE) {
    return this.getCurrentFixedExpenses() + FPIE;
  }

  // Earnings before interest, taxes, depreciation and amortization
  getCurrentEBITDA() {
    let totalRevenues = parseFloat(this.financialData['income_statement']['total_revenues']);
    
    let currentEBITDA = totalRevenues - this.getCurrentCOS() - this.getCurrentFixedExpenses();

    console.log(`current EBITDA = ${currentEBITDA}`);
    return currentEBITDA;
  }

  getTargetEBITDA(targetRevenues, targetCOS, targetFixedExpenses) {
    
    let targetEBITDA = targetRevenues - targetCOS - targetFixedExpenses;
    
    console.log(`target EBITDA = ${targetEBITDA}`)
    return targetEBITDA;
  }

  getNetOperatingProfit(EBITDA) {
    let interestPaid = parseFloat(this.financialData['income_statement']['interest_paid']);

    let opProfit = EBITDA - interestPaid;

    console.log(`calculated op profit from EBITDA(${EBITDA}) = ${opProfit}`);
    return opProfit;
  }

  /* Mid-level sales & marketing metrics and financial ratios calculations */

  getConversionRate(numSales, prospects) {
    return numSales / prospects;
  }

  getCostPerLead(marketing, prospects) {
    return marketing / prospects;
  }

  getCostPerConversion(numSales, marketing) {
    return numSales / marketing;
  }

  getAvgPricePerUnit(totalRevenues, GTU) {
    return totalRevenues / GTU;
  }

  getVariableCostPerUnit(COS, GTU) {
    return COS / GTU;
  }

  getFixedCostPerUnit(fixedExpenses, GTU) {
    return fixedExpenses / GTU;
  }

  getVolume(GTU, numSales) {
    return GTU / numSales;
  }

  getAvgDollarPerReceipt(totalRevenues, numSales) {
    return totalRevenues / numSales;
  }

  // Avg price per unit, var cost per unit
  getUnitsBreakEvenPt(fixedExpenses, avgPPU, vcPU) {
    return fixedExpenses / (avgPPU - vcPU)
  }

  getSalesBreakEvenPt(fixedExpenses, contributionMargin) {
    return fixedExpenses / contributionMargin;
  }

  /* Functions for laziness */

  getCurrentConversionRate() {
    let numSales = parseFloat(this.financialData['sales_and_marketing']['number_of_sales']);
    let prospects = parseFloat(this.financialData['sales_and_marketing']['prospects']);
    let currentConvRate = this.getConversionRate(numSales, prospects);
    return currentConvRate;
  }

  getTargetConversionRate(percent) {
    return this.getCurrentConversionRate() * (1+percent);
  }

  getCurrentVolume() {
    let GTU = parseFloat(this.financialData['sales_and_marketing']['number_of_sales']),
        numSales = parseFloat(this.financialData['sales_and_marketing']['number_of_sales']);

    return this.getVolume(GTU, numSales);
  }


  /* Higher level profit driver calculations */

  getCurrentNetIncome() {
    let dep_and_amort = parseFloat(this.financialData['income_statement']['depreciation_and_amortization']);
    let donations = parseFloat(this.financialData['income_statement']['donations']);
    let opProfit = this.getNetOperatingProfit(this.getCurrentEBITDA());
    let taxableProfit = opProfit - dep_and_amort - donations;
    let taxes = (parseFloat(this.financialData['income_statement']['tax_rate']) 
                  * taxableProfit)

    let netIncome = taxableProfit - taxes;

    console.log(`current net income = ${netIncome}`);
    return netIncome.toFixed(2);
  }

  getTargetNetIncome(driverName, percent, targetRevenues, VPIE, FPIE) {
    if(isNaN(percent)) return 0.00
    //Assumes donations included in dep and amort entry
    let dep_and_amort = parseFloat(this.financialData['income_statement']['depreciation_and_amortization']);
    let donations = parseFloat(this.financialData['income_statement']['donations']);
    let targetGTU = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']) * (1+percent);
    let targetCOS = this.getTargetCOS(targetGTU, VPIE);
    let targetFixedExpenses = this.getTargetFixedExpenses(FPIE);
    let targetOpProfit = this.getNetOperatingProfit(this.getTargetEBITDA(targetRevenues, targetCOS, targetFixedExpenses));
    let taxableProfit = targetOpProfit - dep_and_amort - donations;
    let taxes = parseFloat(this.financialData['income_statement']['tax_rate']) * taxableProfit;

    let netIncome = taxableProfit - taxes;
    switch(driverName) {
      case 'prospects':
      case 'conversions':
      case 'volume':

        console.log(`calculated target net income for ${driverName} = ${netIncome}`);
        return netIncome.toFixed(2);
      case 'price':
        break;
      case 'productivity':
        console.log(`calculated target net income for ${driverName} = ${netIncome}`);
        return netIncome.toFixed(2);
      case 'efficiency':
      case 'frequency':
      default:
        return 0.00;
    }
  }

  // Just returns a number increased by a given percent
  getDirectIncrease(oldValue, percent) {
    if(isNaN(percent) || isNaN(oldValue)) return 0.0;
    return oldValue + (oldValue*percent);
  }

  //This function's about useless, probably gonna phase it out
  getTargetIncrease(driverName, percent) {
    if(isNaN(percent)) return 0.00

    switch(driverName) {
      case 'prospects':
      case 'conversions':
        let prospects = this.financialData['sales_and_marketing']['prospects'];
        return (parseInt(prospects) + (percent*prospects)).toFixed(1);
      case 'volume':
      case 'price':
      case 'productivity':
      case 'efficiency':
      case 'frequency':
      default:
        return 0.00;
    }
  }

  getTargetRevenue(driverName, percent) {
    if(isNaN(percent)) return 0.00

    let totalRevenues = parseFloat(this.financialData['income_statement']['total_revenues'])

    switch(driverName) {
      case 'prospects':
        let gtu = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']);
        return parseFloat((gtu*(1+percent)).toPrecision(7) * (totalRevenues/gtu).toPrecision(7)).toFixed(2);
      case 'conversions':
        let targetConvRate = this.getTargetConversionRate(percent);
        let numSales = parseFloat(this.financialData['sales_and_marketing']['number_of_sales']);
        let prospects = parseFloat(this.financialData['sales_and_marketing']['prospects']);
        return targetConvRate * prospects 
                * this.getAvgDollarPerReceipt(totalRevenues, numSales);
      case 'volume':
        let oldNumSales = parseFloat(this.financialData['sales_and_marketing']['number_of_sales']);
        let oldAvgDR = this.getAvgDollarPerReceipt(totalRevenues, oldNumSales);
        return (oldNumSales * oldAvgDR) * (1+percent);
      case 'price':
      case 'productivity':
      case 'efficiency':
      case 'frequency':
      default:
        return 0.00;
    }

  }




}