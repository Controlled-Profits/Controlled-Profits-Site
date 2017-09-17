export default class CalcHandler {
  constructor(financialData) {
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
    console.log(oldCOGs);
    let subtotalCOS = this.getCurrentCOS() - oldCOGs,
        currentGTU = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']);
        console.log(targetGTU);

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

  getTargetEBITDA(targetCOS, targetFixedExpenses) {
    let totalRevenues = parseFloat(this.financialData['income_statement']['total_revenues']);
    
    let targetEBITDA = totalRevenues - targetCOS - targetFixedExpenses;
    
    console.log(`target EBITDA = ${targetEBITDA}`)
    return targetEBITDA;
  }

  getNetOperatingProfit(EBITDA) {
    let interestPaid = parseFloat(this.financialData['income_statement']['interest_paid']);

    let opProfit = EBITDA - interestPaid;

    console.log(`calculated op profit from EBITDA(${EBITDA}) = ${opProfit}`);
    return opProfit;
  }


  /* Higher level profit driver calculations */

  getCurrentNetIncome() {
    //Assumes donations included in dep and amort entry
    let dep_and_amort = parseFloat(this.financialData['income_statement']['depreciation_and_amortization']);
    let opProfit = this.getNetOperatingProfit(this.getCurrentEBITDA());

    console.log(`current op profit = ${opProfit}`);

    let taxes = (parseFloat(this.financialData['income_statement']['tax_rate']) 
                  * opProfit).toPrecision(7);

    let netIncome = opProfit - dep_and_amort - taxes;

    console.log(`current net income = ${netIncome}`);
    return netIncome.toFixed(2);
  }

  getTargetNetIncome(driverName, percent, VPIE, FPIE) {
      if(isNaN(percent)) return 0.00
      //Assumes donations included in dep and amort entry
      let dep_and_amort = parseFloat(this.financialData['income_statement']['depreciation_and_amortization']);
      
      switch(driverName) {
        case 'prospects':
          let targetGTU = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']) * (1+percent);
          let targetCOS = this.getTargetCOS(targetGTU, VPIE);
          let targetFixedExpenses = this.getTargetFixedExpenses(FPIE)
          let targetOpProfit = this.getNetOperatingProfit(this.getTargetEBITDA(targetCOS, targetFixedExpenses));
          let taxes = parseFloat(this.financialData['income_statement']['tax_rate']) * targetOpProfit;

          console.log(`targetGTU = ${targetGTU}`);
          console.log(`targetCOS = ${targetCOS}`);
          console.log(`targetFE = ${targetFixedExpenses}`);
          console.log(`targetOpProfit = ${targetOpProfit}`);
          console.log(`targetTaxes = ${taxes}`);

          let netIncome = targetOpProfit - dep_and_amort - taxes;
          console.log(`calculated target net income for prospects = ${netIncome}`);
          return netIncome.toFixed(2);
        case 'conversions':
        case 'volume':
        case 'price':
        case 'productivity':
        case 'efficiency':
        case 'frequency':
        default:
          return 0.00;
      }
  }


  getTargetIncrease(driverName, percent) {
    if(isNaN(percent)) return 0.00

    switch(driverName) {
      case 'prospects':
        let prospects = this.financialData['sales_and_marketing']['prospects'];
        return (parseInt(prospects) + (percent*prospects)).toFixed(1);
      case 'conversions':
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

    switch(driverName) {
      case 'prospects':
        let gtu = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']),
        totalRevenues = parseFloat(this.financialData['income_statement']['total_revenues']);
        return parseFloat((gtu*(1+percent)).toPrecision(7) * (totalRevenues/gtu).toPrecision(7)).toFixed(2);
      case 'conversions':
      case 'volume':
      case 'price':
      case 'productivity':
      case 'efficiency':
      case 'frequency':
      default:
        return 0.00;
    }

  }




}