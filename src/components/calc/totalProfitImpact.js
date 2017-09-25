import moment from 'moment';

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
    result.incomeStatement.totalRevenues = (this.financialData.avgPricePerUnit(this.financialData.currentRevenues(), this.financialData.financialData.salesAndMarketing.grandTotalUnits) 
    * this.financialData.financialData.salesAndMarketing.grandTotalUnits) * (1+driverInputs.pctVolume) * (1+driverInputs.pctFrequency);

    //Var exp.
    for(var i = 0; i < this.financialData.varExpensesKeys.length; i++) {
      result.incomeStatement[this.financialData.varExpensesKeys[i]] = this.financialData.financialData.incomeStatement[this.financialData.varExpensesKeys[i]] 
        * (1+driverInputs.pctVolume) * (1-driverInputs.pctProductivity)
        * (1+driverInputs.pctFrequency);
    }
    //TODO: Make sure vpie is not overwritten if previous exists when compounding, maybe just +=?
    result.incomeStatement.vpie = driverInputs.vcProspects + driverInputs.vcConversions + driverInputs.vcVolume
      + driverInputs.vcPrice + driverInputs.vcProductivity + driverInputs.vcEfficiency
      + driverInputs.vcFrequency;
    
    //Fixed exp.
    for(var i = 0; i < this.financialData.fixedExpensesKeys.length; i++) {
      result.incomeStatement[this.financialData.fixedExpensesKeys[i]] = this.financialData.financialData.incomeStatement[this.financialData.fixedExpensesKeys[i]] * (1-driverInputs.pctEfficiency);
    }
    //TODO: Same as var cost
    result.incomeStatement.fpie = driverInputs.fcProspects + driverInputs.fcConversions + driverInputs.fcVolume
    + driverInputs.fcPrice + driverInputs.fcProductivity + driverInputs.fcEfficiency
    + driverInputs.fcFrequency;

    result.balanceSheet = this.financialData.financialData.balanceSheet;
    result.salesAndMarketing = this.financialData.financialData.salesAndMarketing;
    result.financialROI = this.financialData.financialData.financialROI;

    return result;
  }

  projectedPeriodData(financialData, driverInputs = {}, targetDate) {
    let startDate = moment().add('months', 1).date(0);
    let endDate = moment(targetDate);

    // Get number of periods (currently assumed end of one month to another)
    let periodCt = Math.ceil(endDate.diff(startDate, 'months', true));

    // Start result at current period target financial data as copy
    let resultData = this.targetFinancialData(financialData, driverInputs);

    // Incrementally calculate financial data for each following period
    for(var i = 1; i < periodCt; i++) {

      console.log(resultData, 'period_count: ', i);

      let oldAvgPPU = resultData.incomeStatement.totalRevenues / resultData.salesAndMarketing.grandTotalUnits;
      let oldConvRate = resultData.salesAndMarketing.numberOfSales / resultData.salesAndMarketing.prospects;
      
      resultData = this.periodAdjustedFinancialData(resultData, driverInputs);

      // Factor in adjustments of sales and marketing data by previous month's driver percent improvement
      resultData.salesAndMarketing.prospects *= (1+driverInputs.pctProspects);
      resultData.salesAndMarketing.numberOfSales = oldConvRate * (1+driverInputs.pctConversions) 
        * resultData.salesAndMarketing.prospects;
      resultData.salesAndMarketing.grandTotalUnits *= (1+driverInputs.pctVolume);
      resultData.salesAndMarketing.marketingSpend = resultData.incomeStatement.marketing;

      //New revenues based on avg ppu * new GTU
      resultData.incomeStatement.totalRevenues = oldAvgPPU * resultData.salesAndMarketing.grandTotalUnits 
        * (1+driverInputs.pctFrequency);
    }

    return resultData;
  }
}