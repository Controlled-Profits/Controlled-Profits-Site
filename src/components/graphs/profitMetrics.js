// Bar graph showing Monthly profit in assessment reports
// Net operating profit, fixed exp., var exp., and total revenues as bars

import React, {Component} from 'react';
import Axis from '../totalProfitImpact/axis';
import * as d3 from 'd3';


export default class FinancialPerformanceSnapshot extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      width   : 700,
      height  : 250,
      padding : 135,
    };

    this.state = {
      graphData: []
    };

    this.xMax = this.xMax.bind(this);
    this.xScale = this.xScale.bind(this);

    this.getData = this.getData.bind(this);
    this.getGNodes = this.getGNodes.bind(this);
  }

  componentDidUpdate() {
    if(!this.state.graphData.length && this.props.financialData)
      this.setState({graphData: this.getData()});
  }

  // Returns the largest X coordinate from the data set
  xMax(data) {
    return d3.max(data, (d) => d.value);
  }

  // Returns a function that "scales" X coordinates from the data to fit the chart
  xScale() {
    return d3.scaleLinear()
      .domain([0, this.xMax(this.state.graphData)])
      .range([0, this.styles.width - this.styles.padding * 2]);
  }
  

  getData() {
    if(this.props.financialData) {
      let totalRevenues = this.props.financialData.incomeStatement.totalRevenues;
      let totalNOP = this.props.financialData.currentNetOpProfit();
      let totalFE = this.props.financialData.currentFixedExpenses();
      let totalVC = this.props.financialData.currentSubtotalCOS();
      let data = [
        {name: "Cash Ratio", value: totalNOP, color: 'green'},
        {name: "Return on Equity", value: totalFE, color: 'brown'},
        {name: "Return on Assets", value: totalVC, color: 'brown'},
        {name: "Profit Margin", value: totalRevenues, color: 'blue'}
      ];

      return data;
    } else return [];
  }

  getGNodes() {
    let gNodes = [];
    if(this.state.graphData.length) {
      let data = this.getData();

      let rectHeight = 20;

      //Make rect and data values
      for(var i = 0; i < data.length; i++) {
        let transformAttr = `translate(${this.styles.padding}, ${35+((rectHeight*2)*i)})`;
        let rectWidth = this.xScale()(data[i].value);
        
        gNodes.push(
          <g transform={transformAttr} key={data[i].value}>
            <rect width={rectWidth/1.5} height={rectHeight} stroke={data[i].color} fill={data[i].color}></rect>
            <text x={rectWidth/1.5+5} y="9.5" dy=".35em">${data[i].value.toFixed(2)}</text>
          </g>
        );
      }

      //Make labels and axis
      for(var i = 0; i < data.length; i++) {
        let transformAttr = `translate(0, ${35+((rectHeight*2)*i)})`;
        
        gNodes.push(
          <g transform={transformAttr} key={data[i].name}>
            <text x="0" y="9.5" dy=".35em">{data[i].name}</text>
          </g>
        );
      }
    }

    return (<svg width={this.styles.width} height={this.styles.height}>
      {gNodes}
    </svg>);
  }


  render() {
    return(
    <div className="pm-graph">
      <h4 className="pp-header text-center">Profit Metrics</h4>
      
      <div className="row">
        <div className="col-md-12 col-xs-12">
          {this.getGNodes()}
        </div>
      </div>
    </div>);
  }
}