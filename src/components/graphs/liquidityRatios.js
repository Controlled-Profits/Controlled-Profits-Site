import React, {Component} from 'react';
import * as d3 from 'd3';
import * as ratios from '../calc/financialRatios';


export default class LiquidityRatios extends Component {
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
      let earningsAfterTax = this.props.financialData.currentNetOpProfit();

      let cashRatio = ratios.CashRatio.fn(this.props.financialData.balanceSheet.cash, 
        this.props.financialData.currentLiabilities()) * 100;

      let quickRatio = ratios.QuickRatio.fn(this.props.financialData.currentAssets(),
        this.props.financialData.balanceSheet.assets, 
        this.props.financialData.currentLiabilities());

      let currentRatio = ratios.CurrentRatio.fn(this.props.financialData.currentAssets(),
        this.props.financialData.currentLiabilities());

      let data = [
        {name: "Cash Ratio", value: cashRatio, color: ratios.CashRatio.colorCode(cashRatio)},
        {name: "Quick Ratio (Acid Test)", value: quickRatio, color: ratios.QuickRatio.colorCode(quickRatio)},
        {name: "Current Ratio", value: currentRatio, color: ratios.CurrentRatio.colorCode(currentRatio)}
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
            <text x={rectWidth/1.5+5} y="9.5" dy=".35em">{data[i].value.toFixed(2)}%</text>
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
    <div className="lr-graph">
      <h4 className="pp-header text-center">Liquidity Ratios</h4>
      
      <div className="row">
        <div className="col-md-12 col-xs-12">
          {this.getGNodes()}
        </div>
      </div>
    </div>);
  }
}