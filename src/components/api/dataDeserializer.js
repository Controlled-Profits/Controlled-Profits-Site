//Returns a parsed object with JS friendly keys, and values parsed to float
const deserializeFinancialData = (financialData) => {
    // Stores data for total profit impact calculations
    // TODO: Refactor this and float parsing into original api grab
    let incomeStatement = {
      totalRevenues: financialData['income_statement']['total_revenues'],
      cogs: financialData['income_statement']['cogs'],
      marketing: financialData['income_statement']['marketing'],
      directLabor: financialData['income_statement']['direct_labor'],
      distribution: financialData['income_statement']['distribution'],
      vpie: financialData['income_statement']['vpie'],
      salaries: financialData['income_statement']['salaries'],
      benefitAdmin: financialData['income_statement']['benefit_admin'],
      officeLease: financialData['income_statement']['office_lease'],
      officeSupplies: financialData['income_statement']['office_supplies'],
      utilities: financialData['income_statement']['utilities'],
      transportation: financialData['income_statement']['transportation'],
      onlineExpenses: financialData['income_statement']['online_expenses'],
      insurance: financialData['income_statement']['insurance'],
      training: financialData['income_statement']['training'],
      accountingAndLegal: financialData['income_statement']['accounting_and_legal'],
      advertising: financialData['income_statement']['advertising'],
      marketingDevelopment: financialData['income_statement']['marketing_development'],
      other: financialData['income_statement']['other'],
      fpie: financialData['income_statement']['fpie'],
      interestPaid: financialData['income_statement']['interest_paid'],
      depreciationAndAmortization: financialData['income_statement']['depreciation_and_amortization'],
      donations: financialData['income_statement']['donations'],
      taxRate: financialData['income_statement']['tax_rate'],
      dividends: financialData['income_statement']['dividends']
    }

    let balanceSheet = {
      cash: financialData['balance_sheet']['cash'],
      accountsReceivable: financialData['balance_sheet']['accounts_receivable'],
      inventory: financialData['balance_sheet']['inventory'],
      prepaidExpenses: financialData['balance_sheet']['prepaid_expenses'],
      otherCurrentAssets: financialData['balance_sheet']['other_current_assets'],
      ppe: financialData['balance_sheet']['ppe'],
      furnitureAndFixtures: financialData['balance_sheet']['furniture_and_fixtures'],
      leaseholdImprovements: financialData['balance_sheet']['leasehold_improvements'],
      landAndBuildings: financialData['balance_sheet']['land_and_buildings'],
      otherFixedAssets: financialData['balance_sheet']['other_fixed_assets'],
      accumulatedDepreciation: financialData['balance_sheet']['accumulated_depreciation'],
      goodwill: financialData['balance_sheet']['goodwill'],
      accountsPayable: financialData['balance_sheet']['accounts_payable'],
      interestPayable: financialData['balance_sheet']['interests_payable'],
      taxesPayable: financialData['balance_sheet']['taxes_payable'],
      deferredRevenue: financialData['balance_sheet']['deferred_revenue'],
      shortTermNotes: financialData['balance_sheet']['short_term_notes'],
      currentDebt: financialData['balance_sheet']['current_debt'],
      otherCurrentLiabilities: financialData['balance_sheet']['other_current_liabilities'],
      bankLoansPayable: financialData['balance_sheet']['bank_loans_payable'],
      notesPayableToStockholders: financialData['balance_sheet']['notes_payable_to_stockholders'],
      otherLongTermDebt: financialData['balance_sheet']['other_long_term_debt'],
      commonStock: financialData['balance_sheet']['common_stock'],
      paidInSurplus: financialData['balance_sheet']['paid_in_surplus'],
      retainedEarnings: financialData['balance_sheet']['retained_earnings']
    }

    let salesAndMarketing = {
      prospects: financialData['sales_and_marketing']['prospects'],
      numberOfSales: financialData['sales_and_marketing']['number_of_sales'],
      marketingSpend: financialData['sales_and_marketing']['marketing_spend'],
      grandTotalUnits: financialData['sales_and_marketing']['grand_total_units']
    }

    let financialROI = {
      airpDebt: financialData['financial_roi']['airp_debt'],
      airpEquity: financialData['financial_roi']['airp_equity'],
      airpForFinancing: financialData['financial_roi']['airp_for_financing'],
      corpTaxRate: financialData['financial_roi']['corp_tax_rate']
    }

    //Loop through sections and parse to float, copy to adjusted sections
    for(var key in incomeStatement) {
      if(incomeStatement.hasOwnProperty(key)) {
        let val = parseFloat(incomeStatement[key]);
        if(isNaN(val)) val = 0;
        incomeStatement[key] = val;
      }
    }

    for(var key in balanceSheet) {
      if(balanceSheet.hasOwnProperty(key)) {
        let val = parseFloat(balanceSheet[key]);
        if(isNaN(val)) val = 0;
        balanceSheet[key] = val;
      }
    }

    for(var key in salesAndMarketing) {
      if(salesAndMarketing.hasOwnProperty(key)) {
        let val = parseFloat(salesAndMarketing[key]);
        if(isNaN(val)) val = 0;
        salesAndMarketing[key] = val;
      }
    }

    for(var key in financialROI) {
      if(financialROI.hasOwnProperty(key)) {
        let val = parseFloat(financialROI[key]);
        if(isNaN(val)) val = 0;
        financialROI[key] = val;
      }
    }

    let result = {
      incomeStatement: incomeStatement,
      balanceSheet: balanceSheet,
      salesAndMarketing: salesAndMarketing,
      financialROI: financialROI
    }

    return result;
}

export { deserializeFinancialData }; 