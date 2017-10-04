// React d3 implementation adapted from example at:
// https://github.com/freddyrangel/playing-with-react-and-d3

import React, {Component} from 'react';
import * as d3 from 'd3';
import DataCircles from './dataCircles.js';
import DataBarGraph from './dataBarGraph.js';

export default class TPIGraph extends Component {
  constructor(props) {
    super(props);

    this.xMax = this.xMax.bind(this);
    this.yMax = this.yMax.bind(this);
    this.xScale = this.xScale.bind(this);
    this.yScale = this.yScale.bind(this);
  }

  // Returns the largest X coordinate from the data set
  xMax(data) {
    return d3.max(data, (d) => d.value);
  }

  // Returns the higest Y coordinate from the data set
  yMax(data) {
    return d3.max(data, (d) => d[1]);
  }

  // Returns a function that "scales" X coordinates from the data to fit the chart
  xScale() {
    return d3.scaleLinear()
      .domain([0, this.xMax(this.props.data)])
      .range([0, this.props.width - this.props.padding * 2]);
  }

  // Returns a function that "scales" Y coordinates from the data to fit the chart
  yScale() {
    return d3.scaleLinear()
      .domain([0, this.yMax(this.props.data)])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }
  
  render() { 
    let scales = { xScale: this.xScale(), yScale: this.yScale() };

    //TODO Conditional graphs and things
    return (
      <DataBarGraph {...this.props} {...scales} />
    );
  }
}