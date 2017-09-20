export default class CalcHandler {
  constructor(financialData) {
    //This may break things fantastically, not sure of a gentler way to handle programmer error
    if(!financialData) return null;

    this.financialData = financialData;

    //Declare section variables to be parsed into float in init function
    this.COSItems = {
      cogs: this.financialData['income_statement']['cogs'],
      marketing: this.financialData['income_statement']['marketing'],
      directLabor: this.financialData['income_statement']['direct_labor'],
      distribution: this.financialData['income_statement']['distribution']
    }

    this.fixedExpensesItems = {
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
      other: this.financialData['income_statement']['other']
    }

    this.init();
  }

  init() {
    //Loop through objects and parse all member variables into floats
    for(var key in this.COSItems)
      if(this.COSItems.hasOwnProperty(key)) 
        this.COSItems[key] = parseFloat(this.COSItems[key]);

    for(var key in this.fixedExpensesItems)
        if(this.fixedExpensesItems.hasOwnProperty(key)) 
          this.fixedExpensesItems[key] = parseFloat(this.fixedExpensesItems[key]);

  }

  /* Low level basic financial calculations */

  // Cost of sales
  getCurrentCOS() {
    let subtotalCOS = 0;

    for(var key in this.COSItems)
      if(this.COSItems.hasOwnProperty(key))
        subtotalCOS += this.COSItems[key];

    console.log(`current subtotal cos = ${subtotalCOS}`);
    return subtotalCOS;
  }

  getTargetCOS(COS, VPIE) {
    let subtotalCOS = COS + VPIE;

    console.log(`target subtotal COS = ${subtotalCOS}`);
    return subtotalCOS;
  }

  getCurrentFixedExpenses() {
    let fixedExpenses = 0;

    for(var key in this.fixedExpensesItems)
      if(this.fixedExpensesItems.hasOwnProperty(key))
        fixedExpenses += this.fixedExpensesItems[key];

    console.log(`current fixed expenses = ${fixedExpenses}`);
    return fixedExpenses;
  }

  getTargetFixedExpenses(FPIE) {
    return this.getCurrentFixedExpenses() + FPIE;
  }

  getEfficiencyTargetFixedExpenses(percent, FPIE) {
    let fixedExpenses = 0;
    fixedExpenses += this.fixedExpensesItems.accountingAndLegal * (1-percent);
    fixedExpenses += this.fixedExpensesItems.advertising * (1-percent);
    fixedExpenses += this.fixedExpensesItems.benefitAdmin * (1-percent);
    fixedExpenses += this.fixedExpensesItems.insurance * (1-percent);
    fixedExpenses += this.fixedExpensesItems.marketingDevelopment * (1-percent);
    fixedExpenses += this.fixedExpensesItems.officeLease * (1-percent);
    fixedExpenses += this.fixedExpensesItems.officeSupplies * (1-percent);
    fixedExpenses += this.fixedExpensesItems.onlineExpenses * (1-percent);
    fixedExpenses += this.fixedExpensesItems.other * (1-percent);
    fixedExpenses += this.fixedExpensesItems.salaries * (1-percent);
    fixedExpenses += this.fixedExpensesItems.training * (1-percent);
    fixedExpenses += this.fixedExpensesItems.transportation * (1-percent);
    fixedExpenses += this.fixedExpensesItems.utilities * (1-percent);
    fixedExpenses += FPIE;

    return fixedExpenses;
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

  getCurrentPPU() {
    let GTU = parseFloat(this.financialData['sales_and_marketing']['number_of_sales']),
        totalRevenues = parseFloat(this.financialData['income_statement']['total_revenues']);
    return this.getAvgPricePerUnit(totalRevenues, GTU);
  }

  getTargetPPU(percent) {
    return this.getCurrentPPU() * (1+percent);
  }


  /* Higher level profit driver calculations */

  getCurrentNetIncome() {
    let dep_and_amort = parseFloat(this.financialData['income_statement']['depreciation_and_amortization']);
    let donations = parseFloat(this.financialData['income_statement']['donations']);
    let opProfit = this.getNetOperatingProfit(this.getCurrentEBITDA());
    let taxableProfit = opProfit - dep_and_amort - donations;
    let taxes = (parseFloat(this.financialData['income_statement']['tax_rate']) 
                  * taxableProfit);

    let netIncome = taxableProfit - taxes;

    console.log(`current net income = ${netIncome}`);
    return netIncome.toFixed(2);
  }

  getTargetNetIncome(driverName, percent, targetRevenues, VPIE, FPIE) {
    if(isNaN(percent)) return 0.00
    //Assumes donations included in dep and amort entry
    //TODO: Holy hell will I need to clean up this mess
    let currentCOS = this.getCurrentCOS();
    let currentCOGs = parseFloat(this.financialData['income_statement']['cogs']);
    let dep_and_amort = parseFloat(this.financialData['income_statement']['depreciation_and_amortization']);
    let donations = parseFloat(this.financialData['income_statement']['donations']);
    let currentGTU = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']);
    let targetGTU = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']) * (1+percent);
    let targetCOS = this.getTargetCOS(currentCOS, VPIE);
    let targetFixedExpenses = this.getTargetFixedExpenses(FPIE);
    let targetOpProfit = this.getNetOperatingProfit(this.getTargetEBITDA(targetRevenues, targetCOS, targetFixedExpenses));
    let taxableProfit = targetOpProfit - dep_and_amort - donations;
    let taxRate = parseFloat(this.financialData['income_statement']['tax_rate']);
    let taxes = taxRate * taxableProfit;

    let netIncome = taxableProfit - taxes;
    switch(driverName) {
      case 'prospects':
        return netIncome.toFixed(2);
      case 'conversions':
        //Recalc COS given GTU and VPIE
        let convCOS = 0;
        convCOS += this.COSItems.cogs * (1+percent);
        convCOS += this.COSItems.marketing * (1+percent) + VPIE;
        convCOS += this.COSItems.directLabor * (1+percent) + FPIE;
        convCOS += this.COSItems.distribution * (1+percent);
        convCOS += VPIE;

        let convProfit = this.getNetOperatingProfit(
          this.getTargetEBITDA(targetRevenues, convCOS, 
            this.getTargetFixedExpenses(FPIE)));
        let convTaxableProfit = convProfit - dep_and_amort - donations;
        let convTaxes = taxRate * convTaxableProfit;
        return (convTaxableProfit - convTaxes).toFixed(2);
      case 'volume':
        let volCOS = 0;
        volCOS += this.COSItems.cogs * (1+percent);
        volCOS += this.COSItems.marketing * (1+percent);
        volCOS += this.COSItems.directLabor * (1+percent);
        volCOS += this.COSItems.distribution * (1+percent);
        volCOS += VPIE;

        let volProfit = this.getNetOperatingProfit(
          this.getTargetEBITDA(targetRevenues, volCOS, 
            this.getTargetFixedExpenses(FPIE)));

        let volTaxableProfit = volProfit - dep_and_amort - donations;
        let volTaxes = taxRate * volTaxableProfit;

        return (volTaxableProfit - volTaxes).toFixed(2);
      case 'price':
        let priceProfit = this.getNetOperatingProfit(
          this.getTargetEBITDA(targetRevenues, 
            this.getTargetCOS(this.getCurrentCOS(), VPIE), 
            this.getTargetFixedExpenses(FPIE)));

        let priceTaxableProfit = priceProfit - dep_and_amort - donations;
        let priceTaxes = taxRate * priceTaxableProfit;

        return (priceTaxableProfit - priceTaxes).toFixed(2);
      case 'productivity':
        let prodCOS = 0;
        prodCOS += this.COSItems.cogs * (1-percent);
        prodCOS += this.COSItems.marketing * (1-percent);
        prodCOS += this.COSItems.directLabor * (1-percent);
        prodCOS += this.COSItems.distribution * (1-percent);
        prodCOS += VPIE;

        let prodProfit = this.getNetOperatingProfit(
          this.getTargetEBITDA(targetRevenues, prodCOS, 
            this.getTargetFixedExpenses(FPIE)));
        let prodTaxableProfit = prodProfit - dep_and_amort - donations;
        let prodTaxes = taxRate * prodTaxableProfit;

        return (prodTaxableProfit - prodTaxes).toFixed(2);
      case 'efficiency':
        let fixedExpenses = this.getEfficiencyTargetFixedExpenses(percent, FPIE);

        let effProfit = this.getNetOperatingProfit(
          this.getTargetEBITDA(targetRevenues, 
            this.getTargetCOS(this.getCurrentCOS(), VPIE), fixedExpenses));

        let effTaxableProfit = effProfit - dep_and_amort - donations;
        let effTaxes = taxRate * effTaxableProfit;

        return (effTaxableProfit - effTaxes).toFixed(2);
      case 'frequency':
        let freqCOS = 0;
        freqCOS += this.COSItems.cogs * (1+percent);
        freqCOS += this.COSItems.marketing * (1+percent);
        freqCOS += this.COSItems.directLabor * (1+percent);
        freqCOS += this.COSItems.distribution * (1+percent);
        freqCOS += VPIE;

        let freqProfit = this.getNetOperatingProfit(
          this.getTargetEBITDA(targetRevenues, freqCOS, 
            this.getTargetFixedExpenses(FPIE)));
        let freqTaxableProfit = freqProfit - dep_and_amort - donations;
        let freqTaxes = taxRate * freqTaxableProfit;

        return (freqTaxableProfit - freqTaxes).toFixed(2);
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

    let totalRevenues = parseFloat(this.financialData['income_statement']['total_revenues']);
    let currentGTU = parseFloat(this.financialData['sales_and_marketing']['grand_total_units']);

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
        let priceGTU = currentGTU * (1+percent);
        return priceGTU * totalRevenues/currentGTU;
      case 'productivity':
        return totalRevenues.toFixed(2);
      case 'efficiency':
        return totalRevenues.toFixed(2);
      case 'frequency':
        let freqGTU = currentGTU * (1+percent);
        return freqGTU * totalRevenues/currentGTU;
      default:
        return 0.00;
    }

  }




}