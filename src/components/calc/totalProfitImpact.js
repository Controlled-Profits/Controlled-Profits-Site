export default class TPICalc {
  constructor(parsedFinancialData) {
    //Must be initialized FinancialData object
    this.financialData = parsedFinancialData;
  }

  // Returns complete calculated adjusted financialData object for a month given an
  // object with all 7 profit drivers' percentages, var costs, and fixed costs
  // Ex. input obj: 
  // { prospects: {pct: 1, vc: 100.0, fc: 100.0}, ...}
  // Ex. output obj:
  // { incomeStatement: {...}, balanceSheet: {...}, ...}
  adjustedPeriodData(driverInputs) {
    let result = {
      incomeStatement: {},
      balanceSheet: {},
      salesAndMarketing: {},
      financialROI: {}
    }

    // Calc adjusted revenues
    result.incomeStatement.totalRevenues = (this.financialData.avgPricePerUnit(this.financialData.currentRevenues(), this.financialData.salesAndMarketingActual.grandTotalUnits) 
    * this.financialData.salesAndMarketingActual.grandTotalUnits) * ((1+driverInputs.pctVolume) * (1+driverInputs.pctFrequency));

    //Var exp.
    for(var i = 0; i < this.financialData.varExpensesKeys.length; i++) {
      result.incomeStatement[this.financialData.varExpensesKeys[i]] = this.financialData.incomeStatementActual[this.financialData.varExpensesKeys[i]] 
        * ((1+driverInputs.pctVolume) * (1-driverInputs.pctProductivity)
        * (1+driverInputs.pctFrequency));
    }
    //TODO: Make sure vpie is not overwritten if previous exists when compounding, maybe just +=?
    result.incomeStatement.vpie = driverInputs.vcProspects + driverInputs.vcConversions + driverInputs.vcVolume
      + driverInputs.vcPrice + driverInputs.vcProductivity + driverInputs.vcEfficiency
      + driverInputs.vcFrequency;
    
    //Fixed exp.
    for(var i = 0; i < this.financialData.fixedExpensesKeys.length; i++) {
      result.incomeStatement[this.financialData.fixedExpensesKeys[i]] = this.financialData.incomeStatementActual[this.financialData.fixedExpensesKeys[i]] * (1-driverInputs.pctEfficiency);
    }
    //TODO: Same as var cost
    result.fpie = driverInputs.fcProspects + driverInputs.fcConversions + driverInputs.fcVolume
    + driverInputs.fcPrice + driverInputs.fcProductivity + driverInputs.fcEfficiency
    + driverInputs.fcFrequency;

    result.balanceSheet = this.financialData.balanceSheetActual;
    result.salesAndMarketing = this.financialData.salesAndMarketingActual;
    result.financialROI = this.financialData.financialROI;

    return result;
  }
}