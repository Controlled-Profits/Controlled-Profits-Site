import React, {Component} from 'react';
import XYAxis from './xyAxis.js';

export default class DataBarGraph extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    //TODO: Make dynamic
    let rectHeight = 20;

    let gNodes = [];
    for(var i = 0; i < this.props.data.length; i++) {
      let transformAttr = `translate(${this.props.padding}, ${this.props.padding+((rectHeight*2)*i)})`;
      let rectWidth = this.props.xScale(this.props.data[i].value);
      
      gNodes.push(
        <g transform={transformAttr} key={this.props.data[i].value}>
          <rect width={rectWidth} height={rectHeight}></rect>
          <text x={this.props.padding+5} y="9.5" dy=".35em">{this.props.data[i].name}</text>
        </g>
      )
    }

    return (
      <svg width={this.props.width} height={this.props.height}>
        {gNodes}
        <XYAxis {...this.props} {...this.props.scales} />
      </svg>
    );

  }
}