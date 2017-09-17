import React, {Component} from 'react';


export default class DataCircles extends Component {
  constructor(props) {
    super(props);

    this.renderCircles = this.renderCircles.bind(this);
  }

  renderCircles() {
    return (coords, index) => {
      let circleProps = {
        cx: this.props.xScale(coords[0]),
        cy: this.props.yScale(coords[1]),
        r: 2,
        key: index
      };
      console.log(circleProps);
      console.log(coords, index);
      return <circle {...circleProps} />;
    };
  }

  render() {
    return <g>{ this.props.data.map(this.renderCircles(this.props)) }</g>
  }
}