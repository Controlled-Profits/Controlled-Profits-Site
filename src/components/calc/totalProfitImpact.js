import FinancialData from './financialData.js';
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
  adjustedPeriodData(financialData, driverInputs) {
    let result = {
      incomeStatement: {},
      balanceSheet: {},
      salesAndMarketing: {},
      financialROI: {}
    }

    // Calc adjusted revenues
    result.incomeStatement.totalRevenues = ((financialData.avgPricePerUnit(financialData.currentRevenues(), financialData.salesAndMarketing.grandTotalUnits) * (1+driverInputs.pctPrice))
    * (financialData.salesAndMarketing.grandTotalUnits * (1+driverInputs.pctVolume))) * (1+driverInputs.pctFrequency);

    //Var exp.
    for(var i = 0; i < financialData.varExpensesKeys.length; i++) {
      result.incomeStatement[financialData.varExpensesKeys[i]] = financialData.incomeStatement[financialData.varExpensesKeys[i]] 
        * (1+driverInputs.pctVolume) * (1-driverInputs.pctProductivity)
        * (1+driverInputs.pctFrequency);
    }
    //TODO: Make sure vpie is not overwritten if previous exists when compounding, maybe just +=?
    result.incomeStatement.vpie = driverInputs.vcProspects + driverInputs.vcConversions + driverInputs.vcVolume
      + driverInputs.vcPrice + driverInputs.vcProductivity + driverInputs.vcEfficiency
      + driverInputs.vcFrequency;
    
    //Fixed exp.
    for(var i = 0; i < financialData.fixedExpensesKeys.length; i++) {
      result.incomeStatement[financialData.fixedExpensesKeys[i]] = financialData.incomeStatement[financialData.fixedExpensesKeys[i]] * (1-driverInputs.pctEfficiency);
    }
    //TODO: Same as var cost
    result.incomeStatement.fpie = driverInputs.fcProspects + driverInputs.fcConversions + driverInputs.fcVolume
    + driverInputs.fcPrice + driverInputs.fcProductivity + driverInputs.fcEfficiency
    + driverInputs.fcFrequency;

    result.balanceSheet = financialData.balanceSheet;
    result.salesAndMarketing = financialData.salesAndMarketing;
    result.financialROI = financialData.financialROI;

    return new FinancialData(result);
  }

  projectedPeriodData(financialData, driverInputs = {}, targetDate) {
    let startDate = moment().add('months', 1).date(0);
    let endDate = moment(targetDate);

    // Get number of periods (currently assumed end of one month to another)
    let periodCt = Math.ceil(endDate.diff(startDate, 'months', true));

    // Start result at current period target financial data as copy
    let resultData = this.adjustedPeriodData(financialData, driverInputs);

    //Calc initial revenue adjustment
    resultData.incomeStatement.totalRevenues = (financialData.avgPricePerUnit(financialData.currentRevenues(), financialData.salesAndMarketing.grandTotalUnits) 
    * financialData.salesAndMarketing.grandTotalUnits) * (1+driverInputs.pctVolume) * (1+driverInputs.pctFrequency);

    // Incrementally calculate financial data for each following period
    for(var i = 1; i < periodCt; i++) {

      console.log(resultData, 'period_count: ', i);

      console.log('Result data that is apparently coming back as Nan when operated on:', resultData)
      
      //Make sales and marketing adjustments
      let oldConvRate = resultData.currentConversionRate();
      resultData.salesAndMarketing.prospects = resultData.salesAndMarketing.prospects * (1+driverInputs.pctProspects);
      resultData.salesAndMarketing.numberOfSales = oldConvRate * (1+driverInputs.pctConversions) * resultData.salesAndMarketing.prospects;
      resultData.salesAndMarketing.marketingSpend = resultData.incomeStatement.marketing;
      resultData.salesAndMarketing.grandTotalUnits = resultData.salesAndMarketing.grandTotalUnits * (1+driverInputs.pctVolume);

      resultData = this.adjustedPeriodData(resultData, driverInputs);




      // let oldAvgPPU = resultData.incomeStatement.totalRevenues / resultData.salesAndMarketing.grandTotalUnits;
      // let oldConvRate = resultData.salesAndMarketing.numberOfSales / resultData.salesAndMarketing.prospects;
      
      // resultData = this.periodAdjustedFinancialData(resultData, driverInputs);

      // // Factor in adjustments of sales and marketing data by previous month's driver percent improvement
      // resultData.salesAndMarketing.prospects *= (1+driverInputs.pctProspects);
      // resultData.salesAndMarketing.numberOfSales = oldConvRate * (1+driverInputs.pctConversions) 
      //   * resultData.salesAndMarketing.prospects;
      // resultData.salesAndMarketing.grandTotalUnits *= (1+driverInputs.pctVolume);
      // resultData.salesAndMarketing.marketingSpend = resultData.incomeStatement.marketing;

      // //New revenues based on avg ppu * new GTU
      // resultData.incomeStatement.totalRevenues = oldAvgPPU * resultData.salesAndMarketing.grandTotalUnits 
      //   * (1+driverInputs.pctFrequency);
    }

    return resultData;
  }
}