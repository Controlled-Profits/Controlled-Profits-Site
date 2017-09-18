import React from 'react';
import * as d3 from 'd3';

export default class Axis extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs.axis;
    var axis = null;
    if(this.props.orient === "bottom") 
      axis = d3.axisBottom(this.props.scale);
    else axis = d3.axisLeft(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}