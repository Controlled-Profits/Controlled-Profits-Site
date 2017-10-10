// Sales & Marketing Metrics

const conversionRate = (numberOfSales, prospects) => {
  return numberofSales / prospects;
}

const costPerLead = (marketingExpenses, prospects) => {
  return marketingExpenses / prospects;
}

const costPerConversion = (marketingExpenses, numberOfSales) => {
  return marketingExpenses / numberOfSales;
}

const AvgPricePerSale = (totalRevenues, grandTotalUnits) => {
  return totalRevenues / grandTotalUnits;
}

const VarCostPerSale = (totalVarCost, grandTotalUnits) => {
  return totalVarCost / grandTotalUnits;
}

const FixedCostPerSale = (totalFixedCost, grandTotalUnits) => {
  return totalFixedCost / grandTotalUnits;
}

//const volume = (grandTotalUnits, )

const cashRatio = (cash, currentLiabilities) => {
  return cash / currentLiabilities;
}