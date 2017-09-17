import React, {Component}  from 'react';
import Axis   from './axis.js';

export default class XYAxis extends Component {
  constructor(props) {
    super(props);

    this.xSettings = {
      translate: `translate(0, ${props.height - props.padding})`,
      scale: props.xScale,
      orient: 'bottom'
    };

    this.ySettings = {
      translate: `translate(${props.padding}, 0)`,
      scale: props.yScale,
      orient: 'left'
    }

  }
  
  render() {
    return <g className="xy-axis">
      <Axis {...this.xSettings}/>
      <Axis {...this.ySettings}/>
    </g>
  }
}