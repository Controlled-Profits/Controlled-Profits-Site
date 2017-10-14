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
  },
  colorCode: (val) => {
    if(val < 1) return 'red';
    else if (val < 2) return 'yellow';
    else return 'green';
  }
}

export const CashRatio = {
  equation: 'Cash / Current Liabilities',
  insight: 'A Cash Ratio of 1 (one) says that you have enough CASH RIGHT NOW to pay off your current obligations.',
  description: 'The Cash Ratio measures how much CASH you have divided by your short term debt.',
  fn: (cash, currentLiabilities) => {
    return cash / currentLiabilities;
  },
  colorCode: (val) => {
    if(val < 0.25) return 'red';
    else if (val < 0.75) return 'yellow';
    else return 'green';
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
  },
  colorCode: (val) => {
    if(val <= 0.33) return 'green';
    else if (val <= 0.66) return 'yellow';
    else return 'red';
  }
}

export const TotalEquityRatio = {
  equation: '1 - Total Debt',
  insight: 'The higher the equity ratio, the less dependent on outside financing is required.',
  description: 'The Total Equity Ratio shows the proportion of the company\'s investment is supported by equity investment.',
  fn: (totalDebt) => { return 1-totalDebt; },
  colorCode: (val) => {
    if(val < 0.33) return 'red';
    else if (val < 0.66) return 'yellow';
    else return 'green';
  }
}

export const DebtEquityRatio = {
  equation: 'Total Debt / Total Equity',
  insight: 'The D/E ratio indicates how much debt a company is using to finance its assets relative to the amount of value represented in shareholders\' equity.',
  description: 'The Debt/Equity Ratio is a debt ratio used to measure a company\'s financial leverage, calculated by dividing a company\'s total liabilities by its stockholders\' equity.',
  fn: (totalDebt, totalEquity) => { return totalDebt / totalEquity; },
  colorCode: (val) => { return 'yellow'; /* TODO: Could change in future */}
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
  fn: (COGs, inventory) => { return COGs / inventory; },
  colorCode: (val) => { return 'yellow' /* TODO: could change in future */ }
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

export const CashCycle = {
  equation: 'Operating Cycle - Payables Period',
  insight: 'Shorter the number of days in this cycle, more the amount of available cash, and lesser the need to borrow.',
  description: 'The Cash Cycle is the day measure of cashflow beginning with payment for raw materials and ends with receipt of cash on goods sold.',
  fn: (operatingCycle, payablesPeriod) => { return operatingCycle - payablesPeriod; }
}

export const AverageDailySales = {
  equation: 'Operating Profit / 365 (days)',
  insight: 'For reporting and comparison purposes, dividing your Net Sales by 365 days gives you an apples to apples basis for improvement purposes. Basically, it tells you how much revenue you are bringing in for each day of operation, or for each day of the year.',
  description: 'The Average Daily Sales Ratio is used to measure the SPEED of your Sales on a daily basis, given the number of days in a year.',
  fn: (operatingProfit) => { return operatingProfit / 365; }
}

export const TotalAssetTurnover = {
  equation: 'Sales / Total Assets',
  insight: 'A high ratio is considered desirable as compared to peer group.',
  description: 'The Total Asset Turnover Ratio indicates how successful a firm is in utilizing its assets in generation of sales revenue.',
  fn: (sales, totalAssets) => { return sales / totalAssets; }
}

export const SalesToInventory = {
  equation: 'Sales / Inventory',
  insight: 'An increasing number indicates higher efficiency in use of resources; a decreasing number suggests potential cash flow problems due to greater sums tied up in inventory.',
  description: 'The Sales to Inventory Ratio is the percentage of cost of sales attributable to average inventory.',
  fn: (sales, inventory) => { return sales / inventory; }
}

export const SalesToAssets = {
  equation: 'Assets / Sales',
  insight: 'The higher this ratio, the smaller the investment required to generate sales revenue and, therefore, the higher the profitability of the company.',
  description: 'Called the Fixed Asset Ratio. A measure of a company\'s efficiency in managing its assets in relation to the revenue generated.',
  fn: (assets, sales) => { return assets / sales; }
}

export const SalesToNetWorkingCapital = {
  equation: 'Sales / Net Working Capital',
  insight: 'Because working capital is current assets minus current liabilities, a high turnover ratio shows that management is being very efficient in using a company’s short-term assets and liabilities for supporting sales. In contrast, a low ratio shows a business is investing in too many accounts receivable (AR) and inventory assets for supporting its sales. This may lead to an excessive amount of bad debts and obsolete inventory.',
  description: 'Called Working Capital Turnover. Shows how well a company is using its working capital to support a given level of sales.',
  fn: (sales, netWorkingCapital) => { return sales / netWorkingCapital; }
}

export const AccountsPayableToSales = {
  equation: 'Accounts Payable / Sales',
  insight: 'If the turnover ratio is falling from one period to another, this is a sign that the company is taking longer to pay off its suppliers than it was in previous time periods. The opposite is true when the turnover ratio is increasing, which means that the company is paying off suppliers at a faster rate.',
  description: 'Called Accounts Payable Turnover ratio is a liquidity measure to quantify the rate which a company pays off its suppliers.',
  fn: (accountsPayable, sales) => { return accountsPayable / sales; }
}

export const AssetTurnover = {
  equation: 'Sales / Total Assets',
  insight: 'The higher the asset turnover ratio, the better the company is performing, since higher ratios imply that the company is generating more revenue per dollar of assets.',
  description: 'The Asset Turnover ratio is used as an indicator of the efficiency with which a company is using its assets in generating revenue.',
  fn: (sales, totalAssets) => { return sales / totalAssets; }
}

// Profitability Ratios

export const ContributionMargin = {
  equation: 'Cost of Sales (COS) / Revenues',
  insight: 'Contribution Margin measures how much of every sales dollar a company keeps in earnings after paying all direct costs of sales. This closely compares with Gross Margin. The main difference is that Contribution Margin makes a specific effort to allocate all variable costs associated with the sale of a product. This includes direct marketing costs as well as the costs for fulfillment (distribution).',
  description: 'Contribution Margin measures how much of every sales dollar a company keeps in earnings after paying all direct costs of sales. This closely compares with Gross Margin. The main difference is that Contribution Margin makes a specific effort to allocate all variable costs associated with the sale of a product. This includes direct marketing costs as well as the costs for fulfillment (distribution). ',
  fn: (COS, revenues) => { return COS / revenues; }
}

export const ProfitMargin = {
  equation: 'Earnings After Tax (Net Income) / Revenues',
  insight: 'Profit Margin measures how much of every dollar of sales a company keeps in earnings – after taxes.',
  description: 'Profit Margin measures how much of every dollar of sales a company keeps in earnings – after taxes.',
  fn: (netIncome, revenues) => { return netIncome / revenues; },
  colorCode: (val) => {
    if(val < 0) return 'red';
    else if (val < 0.1) return 'yellow';
    else return 'green';
  }
}

export const EBITDAMargin = {
  equation: 'Earnings Before Interest Taxes, Depreciation & Amortization / Revenues',
  insight: 'Profit is cash, and this ratio tells you how much cash profit you are generating as a percentage of revenues.',
  description: 'EBITDA Margin tells you how profitable your company is with regard to operations. The EBITDA measure is pure cash not adjusted for non-cash items, and it doesn’t take into account tax shields,or tax benefits of any kind. In this sense, the EBITDA margin is a ‘clean’ way of looking at your true cash profit margin.',
  fn: (EBITDA, revenues) => { return EBITDA / revenues; }
}

//TODO: Ask micheal about possible typo in color code ranges
export const ReturnOnAssets = {
  equation: 'Earnings After Tax / Total Assets',
  insight: 'Return on Assets (Investment) tells you how well you are employing your assets to make money. Quite simply, the ROI ratio indicates that if you can make more money on fewer assets, then you need less capital investment for a certain level of return. The larger this ratio, the more intelligently you are using assets for profit.',
  description: 'Return on Investment (or Return on Assets) is the ratio of earnings after tax divided by Total Assets. Total Assets represents the total amount of assets the company owns and is represented on their Balance sheet.',
  fn: (earningsAfterTax, totalAssets) => { return earningsAfterTax / totalAssets; },
  colorCode: (val) => {
    if(val < 0.1) return 'red';
    else if (val < 0.2) return 'yellow';
    else return 'green';
  }
}

export const ReturnOnEquity = {
  equation: 'Earnings After Tax / Stockholders\' Equity',
  insight: 'ROE is often considered to be the one of the most important of the profitability ratios. If you can increase and control this ratio, the more money you earn. You would use this number to compare to other uses of your money for greatest return and performance over time. A general rule maintains that a ROE of at least 15% is a reasonable objective to provide dividends to shareholders as well as fund for future growth.',
  description: 'Return on Equity is the ratio of earnings after tax divided by Stockholders Equity. Stockholders’ Equity is the dollar amount of money recognized on the Balance Sheet as invested capital. It tells you what percentage of your ownership dollars are being returned to you for your investment, on an after tax basis.',
  fn: (earningsAfterTax, stockholdersEquity) => { return earningsAfterTax / stockholdersEquity; },
  colorCode: (val) => {
    if(val < 0) return 'red';
    else if (val < 0.24) return 'yellow';
    else return 'green';
  }
}

export const ReturnOnSales = {
  equation: 'Earnings After Tax / Net Sales',
  insight: 'Quite simply, if you can increase and control this ratio, the more money you earn.',
  description: 'Return on Sales is the ratio of earnings after tax divided by NET sales. Net Sales is the dollar volume of sales less any returns, allowances, and cash discounts. In other words, Net sales is the actual realized dollars that stays in the business. It tells you what percentage of your sales is operating profit that ‘sticks’, after taxes.',
  fn: (earningsAfterTax, netSales) => { return earningsAfterTax / netSales; }
}


//TODO: b?
export const b = {
  equation: 'Addition to retained earnings / Net income',
  insight: 'Companies can decide how much is required to reinvest in the business as retained earnings based on business needs. If not retained, then it is distributed as profits in the form of dividends.',
  description: 'Percent of after tax income allocated for reinvestment.',
  fn: (additionToRetainedEarnings, netIncome) => { return additionToRetainedEarnings / netIncome; }
}

export const InternalGrowthRate = {
  equation: '(ROA*b)/(1-ROA*b)',
  insight: 'The higher the rate indicates a more self reliant business.',
  description: 'An internal growth rate is the highest level of growth achievable for a business without obtaining outside financing, and a firm\'s maximum internal growth rateis the level of business operations that can continue to fund and grow the company.',
  fn: (ROA, b) => {
    return (ROA*b) / (1-ROA*b);
  }
}