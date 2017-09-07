export default {
  finacialMarketingAndSalesDataInputArray: [
  {
  sectionHeader: 'incomeStatementDataInput',
  sectionSubHeader: [
    {
      header: 'Income Statement',
      fields:[
        {
          title: 'Total Earned Revenue (Cash & Credit)',
          type: 'input',
          value: 0,
          role: 'sum'
        }],
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
    }
    ]
  }
]
}
