export default {
  finacialMarketingAndSalesDataInputArray: [
  {
  sectionHeader: 'Income Statement',
  sectionSubHeader: [
    {
      header: 'Total Earned Revenue',
      fields:[
        {
          title: 'Total Earned Revenue (Cash & Credit)',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Total Sales Revenue',
          type: 'output',
          value: 0,
          role: 'calculated'
        }
      ],
    },
    {
      header: 'Cost of Sales',
      fields:[
        {
          title: 'Cost of Goods Sold (materials, storae, packaging)',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: "Marketing",
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: "Direct Labor",
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: "Distribution",
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: "Variable Profit Improvement Expenses",
          type: 'output',
          value: 0,
          role: 'sum'
        },
        {
          title: "Subtotal Cost of Sales",
          type: 'output',
          value: 0,
          role: 'calculated',
          formula: ""
        },
        {
          title: "Gross Contribution Profit",
          type: 'output',
          value: 0,
          role: 'calculated',
          formula: ''
        },
      ],
    },
    {
      header: "Fixed Expenses (SG&A)",
      fields:[
        {
          title: 'Salaries (including payroll taxes)',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Benefit Admin (payroll services, contributions, etc)',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Office Lease/Rent',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Office Supplies',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Utilities',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Trasportation',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: "Online Expenses",
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Insurance',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Training',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Accounting & Legal',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Advertising',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Marketing Development',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Other (Repairs, Maintenance, Furniture)',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Fixed Profit Improvement Expense',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Fixed Expenses',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Earnings Before Interest, Taxes, Depreciation & Amortization',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Interest Paid',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Operating Income',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Earnings Befor Taxes, Depreciation & Amortization',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Depreciation & Amortization',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Taxable Income',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Tax Rate',
          type: 'output',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Taxes',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Net Operating Income',
          type: 'output',
          value: 0,
          role: 'calculated'
        },
        {
          title: 'Dividends / Profits',
          type: 'input',
          value: 0,
          role: 'sum'
        },
        {
          title: 'Addition to Retained Earnings',
          type: 'output',
          value: 0,
          role: 'calculated'
        }
      ]
    }
    ]
  }
]
}
