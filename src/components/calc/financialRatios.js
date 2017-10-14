//TODO: Add all equations, insights

// Sales & Marketing Metrics

export const ConversionRate = {
  description: 'The Conversion Rate indicates how well you convert the number of Leads / Prospects you have into a sale',
  fn: (numberOfSales, prospects) => { 
    return numberOfSales / prospects 
  }
}

export const CostPerLead = {
  description: 'The Cost per Lead is how much it cost you to acquire each lead.',
  fn: (marketingExpenses, prospects) => {
    return marketingExpenses / prospects;
  }
}

export const CostPerConversion = {
  description: 'The Cost per Conversion includes the costs for each sale.',
  fn: (marketingExpenses, numberOfSales) => {
    return marketingExpenses / numberOfSales;
  }
}

export const AvgPricePerSale = { 
  description: 'The Average Price per unit is the overall average of ALL sold units.',
  fn: (totalRevenues, grandTotalUnits) => {
    return totalRevenues / grandTotalUnits;
  }
}

export const VarCostPerSale = {
  description: 'The Variable Cost per unit is the overall average of ALL Variable costs for each unit sold.',
  fn: (totalVarCost, grandTotalUnits) => {
    return totalVarCost / grandTotalUnits;
  }
}

export const FixedCostPerSale = {
  description: 'The Fixed Cost per unit is the overall average of ALL Fixed costs for each unit sold',
  fn: (totalFixedCost, grandTotalUnits) => {
    return totalFixedCost / grandTotalUnits;
  }
}

export const Volume = {
  description: 'The Average Number of items sold at each sales transaction.',
  fn: (grandTotalUnits, numberOfSales) => {
    return grandTotalUnits / numberOfSales;
  }
}

export const AvgDollarPerReceipt = {
  description: 'The Average Dollar amount of each sales transaction.',
  fn: (totalRevenues, numberOfSales) => {
    return totalRevenues / numberOfSales;
  }
}

export const BreakEvenPointUnits = {
  description: 'The Number of Units which need to be sold to breakeven with costs.',
  fn: (totalFixedCost, avgPPU, varCostPerUnit) => {
    return totalFixedCost / (avgPPU - varCostPerUnit);
  }
}

export const BreakEvenPointSales = {
  description: 'The Amount of Money required to break even.',
  fn: (totalFixedCost, avgPPU, varCostPerUnit) => {
    return totalFixedCost / ((avgPPU - varCostPerUnit) / avgPPU);
  }
}

// Short term solvency or liquidity ratios

export const CurrentRatio = {
  equation: 'Current Assets / Current Liabilities',
  insight: 'While a current Ratio of 1 (one) means you have enough to pay your bills (on paper), this is not a comfortable situation. A common rule of thumb is that this ratio should be 2 (two) or more for most businesses.',
  description: 'The Current Ratio is the most commonly used measure to understand the liquidity of your company. The Current Ratio represents the balance of your assets to your liabilities. Current Assets are the assets of your business that can be converted into cash in a reasonably short time, and they are compared to the amount of cash you must spend to pay your current bills.',
  fn: (currentAssets, currentLiabilities) => {
    return currentAssets / currentLiabilities;
  } 
}

//AKA Acid Test
export const QuickRatio = {
  equation: '(Current Assets - Inventory) / Current Liabilities',
  insight: 'A Quick ratio of 1 (one) says that you have enough cash to pay off your current obligations.',
  description: 'The Quick Ratio is also called the ‘acid test’ and is designed to measure the relationship between assets that can be QUICKLY converted into cash to meet current liabilities. It is the common sense form of the Current Ratio, because businesses are run on cash, not on paper. The difference in the ratios is that the quick ratio does not include inventories in the numerator for measuring liquidity. This is because inventory cannot be converted into cash immediately. However, short term securities can be sold for cash and accounts receivable can be called in, borrowed against, or sold in the marketplace.',
  fn: (currentAssets, inventory, currentLiabilities) => {
    return (currentAssets - inventory) / currentLiabilities;
  }
}

export const CashRatio = {
  equation: 'Cash / Current Liabilities',
  insight: 'A Cash Ratio of 1 (one) says that you have enough CASH RIGHT NOW to pay off your current obligations.',
  description: 'The Cash Ratio measures how much CASH you have divided by your short term debt.',
  fn: (cash, currentLiabilities) => {
    return cash / currentLiabilities;
  }
}

export const WorkingCapital = {
  equation: 'Current Assets - Current Liabilities',
  insight: '',
  description: 'Capital Flow. Your liquid position',
  fn: (currentAssets, currentLiabilities) => {
    return currentAssets - currentLiabilities;
  }
}

// Long-term solvency, or financial leverage ratios

export const TotalDebtRatio = {
  equation: '(Total Assets - Total Equity) / Total Assets',
  insight: 'The higher the debt ratio, the more dependent you are on external financing for operations.',
  description: 'The Debt Ratio shows the proportion of the company\'s investment is supported through debt financing.',
  fn: (totalAssets, totalEquity) => {
    return (totalAssets - totalAssets) / totalAssets;
  }
}

export const TotalEquityRatio = {
  equation: '1 - Total Debt',
  insight: 'The higher the equity ratio, the less dependent on outside financing is required.',
  description: 'The Total Equity Ratio shows the proportion of the company\'s investment is supported by equity investment.',
  fn: (totalDebt) => { return 1-totalDebt; }
}

export const DebtEquityRatio = {
  equation: 'Total Debt / Total Equity',
  insight: 'The D/E ratio indicates how much debt a company is using to finance its assets relative to the amount of value represented in shareholders\' equity.',
  description: 'The Debt/Equity Ratio is a debt ratio used to measure a company\'s financial leverage, calculated by dividing a company\'s total liabilities by its stockholders\' equity.',
  fn: (totalDebt, totalEquity) => { return totalDebt / totalEquity; }
}

export const EquityMultiplier = {
  equation: 'Total Assets / Total Equity',
  insight: ' A High equity multiplier indicates that a larger portion of asset financing is attributed to debt.',
  description: 'The Equity multiplier measures financial leverage.',
  fn: (totalAssets, totalEquity) => { return totalAssets / totalEquity; }
}

export const TimesInterestEarned = {
  equation: 'EBIT / Interest',
  insight: 'Indicates how many times a company can cover its interest charges on a pretax earnings basis.',
  description: 'The Times Interest Earned metric (TIE) is used to measure a company\'s ability to meet its debt obligations.  ',
  fn: (EBIT, interest) => { return EBIT / interest; }
}

export const CashCoverageRatio = {
  equation: '(EBIT + Depreciation) / Interest',
  insight: 'The higher the coverage ratio, the better the ability of the enterprise to fulfill its obligations to its lenders.',
  description: 'The Coverage Ratio is a measure of a company\'s ability to meet its financial obligations.',
  fn: (EBIT, depreciation, interest) => {
    return (EBIT + depreciation) / interest;
  }
}

//Returns a decimal percentage 
export const CurrentLiabilitiesToNetWorth = {
  equation: 'Current Liabiitites / Net Worth',
  insight: 'It is one of the measures of the solvency of a firm and, as a rule of thumb, should not exceed 60 percent; higher percentages mean significant pressure on future cash flows.',
  description: 'Indicates reliance on the equity for payment of debt.',
  fn: (currentLiabilities, netWorth) => { return currentLiabilities / netWorth; }
}

//Returns a percentage
export const CurrentLiabilitiesToInventory = {
  equation: 'Current Liabilities / Inventory',
  insight: 'Indicates reliance on the available inventory for payment of debt.',
  description: 'Indicates reliance on the available inventory for payment of debt.',
  fn: (currentLiabilities, inventory) => {
    return currentLiabilities / inventory;
  }
}

//Returns a percentage
export const TotalLiabilitiesToNetWorth = {
  equation: 'Total Liabilities / Net Worth',
  insight: 'It is one of the measures of the solvency of a firm and, as a rule of thumb, should not exceed 60 percent; higher percentages mean significant pressure on future cash flows.',
  description: 'Indicates reliance on equity for payment of debt.',
  fn: (totalLiabilities, netWorth) => { return totalLiabilities / netWorth; }
}

//Returns a percentage
export const FixedAssetsToNetWorth = {
  equation: 'Fixed Assets / Net Worth',
  insight: 'A ratio higher than 0.75 indicates that the firm is vulnerable to unexpected events and changes in the business climate.',
  description: 'The Fixed Assets to Net Worth ratio indicates the extent to which the owners\' cash is frozen in the form of brick and mortar and machinery, and the extent to which funds are available for the firm\'s operations.',
  fn: (fixedAssets, netWorth) => { return fixedAssets / netWorth; } 
}

// Asset utilization, or Turnover Ratios

export const InventoryTurnover = {
  equation: 'Cost of Goods Sold / Inventory',
  insight: 'An inventory turnover that is out of proportion to industry norms may suggest losses due to shortages.',
  description: 'The Inventory Turnover ratio shows the number of times a firm\'s investment in inventory is recouped during an accounting period. Normally a high number indicates a greater sales efficiency and a lower risk of loss through un-saleable stock.',
  fn: (COGs, inventory) => { return COGs / inventory; }
}

export const InventoryPeriod = {
  equation: '365 (days) / Inventory turnover',
  insight: 'A number above the norm indicates problems with sales forecasts. A number lower than the norm indicates lost sales because of the company\'s inability to meet demand.',
  description: 'The Inventory Period is the average number of days goods remain in inventory before being sold.',
  fn: (inventoryTurnover) => { return 365 / inventoryTurnover; }
}

export const ReceivablesTurnover = {
  equation: 'Credit Sales / Accounts Receivable. Annual is yearly average',
  insight: 'Unless you’re in the credit business, you’re not making any money on your assets in the form of AR. As a matter of fact, you’re actually losing it. Even worse still - some people may REFUSE to pay, placing your company in more jeopardy.',
  description: 'The Accounts Receivable Turnover tells you how many times a year your credit accounts are paid off. The higher this ratio, the more times your accounts are paid off and thus – the less interest you lose on the money you extend as credit. If you are extending credit, the higher this ratio, the better.',
  fn: (creditSales, accountsReceivable) => { return creditSales / accountsReceivable; }
}

export const ARCollectionPeriod = {
  equation: '365 (days) / Receivables Turnover',
  insight: 'You need to know how many days your money is locked up being unpaid. Can\'t pay bills, lose interest opportunity.',
  description: 'The Average Collection Period measures the how long it takes to receive money for sales made on credit. Again, this ratio tells you how many DAYS it takes for you to get your money for a sale made on a credit purchase account.',
  fn: (receivablesTurnover) => { return 365 / receivablesTurnover; }
}

export const PayablesTurnover = {
  equation: 'Cost of Goods Sold / Average Payables',
  insight: 'The measure shows investors how many times per period the company pays its average payable amount.',
  description: 'The Accounts Payable Turnover Ratio is a short-term liquidity measure used to quantify the rate at which a company pays off its suppliers.',
  fn: (COGs, averagePayables) => { return COGs / averagePayables; }
}

export const PayablesPeriod = {
  equation: '365 (days) / Payables turnover',
  insight: 'As a rule, well managed company\'s payables do not exceed 40 - 50 days.',
  description: 'The Payables Period is the average number of days a company takes to pay its bills.',
  fn: (payablesTurnover) => { return 365 / payablesTurnover }
}

export const OperatingCycle = {
  equation: 'Inventory Period + Receivables Period',
  insight: 'The shorter the operating cycle, the less time cash is out of your hands in a different form.',
  description: 'The Operating Cycle is the average time taken by a company in converting merchandise into cash.',
  fn: (inventoryPeriod, receivablesPeriod) => { return inventoryPeriod + receivablesPeriod; }
}

export const cashCycle = {
  equation: 'Operating Cycle - Payables Period',
  insight: 'Shorter the number of days in this cycle, more the amount of available cash, and lesser the need to borrow.',
  description: 'The Cash Cycle is the day measure of cashflow beginning with payment for raw materials and ends with receipt of cash on goods sold.',
  fn: (operatingCycle, payablesPeriod) => { return operatingCycle - payablesPeriod; }
}