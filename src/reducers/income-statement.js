export default function() {
  return [{
    id:1,
    sectionHeader: 'Income Statement',
    sectionSubHeader: [
      {
        id:10,
        header: 'Total Earned Revenue',
        fields:[
          {
            id: 100,
            title: 'Total Earned Revenue (Cash & Credit)',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id:101,
            title: 'Total Sales Revenue',
            type: 'output',
            value: 0,
            role: 'calculated'
          }
        ],
      },
      {
        id: 11,
        header: 'Cost of Sales',
        fields:[
          {
            id: 110,
            title: 'Cost of Goods Sold (materials, storae, packaging)',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 111,
            title: "Marketing",
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 112,
            title: "Direct Labor",
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 113,
            title: "Distribution",
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 114,
            title: "Variable Profit Improvement Expenses",
            type: 'output',
            value: 0,
            role: 'sum'
          },
          {
            id: 115,
            title: "Subtotal Cost of Sales",
            type: 'output',
            value: 0,
            role: 'calculated',
            formula: ""
          },
          {
            id: 116,
            title: "Gross Contribution Profit",
            type: 'output',
            value: 0,
            role: 'calculated',
            formula: ''
          },
        ],
      },
      {
        id: 12,
        header: "Fixed Expenses (SG&A)",
        fields:[
          {
            id: 120,
            title: 'Salaries (including payroll taxes)',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 121,
            title: 'Benefit Admin (payroll services, contributions, etc)',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 122,
            title: 'Office Lease/Rent',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 123,
            title: 'Office Supplies',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 124,
            title: 'Utilities',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 125,
            title: 'Trasportation',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 126,
            title: "Online Expenses",
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 127,
            title: 'Insurance',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 128,
            title: 'Training',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 129,
            title: 'Accounting & Legal',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 1200,
            title: 'Advertising',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 1201,
            title: 'Marketing Development',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 1202,
            title: 'Other (Repairs, Maintenance, Furniture)',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 1203,
            title: 'Fixed Profit Improvement Expense',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1204,
            title: 'Fixed Expenses',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1205,
            title: 'Earnings Before Interest, Taxes, Depreciation & Amortization',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1206,
            title: 'Interest Paid',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 1207,
            title: 'Operating Income',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1208,
            title: 'Earnings Befor Taxes, Depreciation & Amortization',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1209,
            title: 'Depreciation & Amortization',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 1210,
            title: 'Taxable Income',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1211,
            title: 'Tax Rate',
            type: 'output',
            value: 0,
            role: 'sum'
          },
          {
            id: 1212,
            title: 'Taxes',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1213,
            title: 'Net Operating Income',
            type: 'output',
            value: 0,
            role: 'calculated'
          },
          {
            id: 1214,
            title: 'Dividends / Profits',
            type: 'input',
            value: 0,
            role: 'sum'
          },
          {
            id: 1215,
            title: 'Addition to Retained Earnings',
            type: 'output',
            value: 0,
            role: 'calculated'
          }
        ]
      }
      ]
    }]
}
