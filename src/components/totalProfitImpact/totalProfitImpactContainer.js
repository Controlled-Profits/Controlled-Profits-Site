import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import TPIGraph from './tpiGraph.js'

import '../../styles/totalProfitImpact.css';

// The number of data points for the chart.
const numDataPoints = 50;

// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 10000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

export default class TotalProfitImpact extends Component {
  constructor(props) {
    super(props);

    this.randomizeData = this.randomizeData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.styles = {
      width   : 900,
      height  : 300,
      padding : 35,
    };

    this.state = { data: randomDataSet() };
  }

  componentDidMount() {
    /*this.styles = {
      width: this.refs.tpicontainer.offsetWidth,
      height: this.refs.tpicontainer.offsetHeight,
      padding: 30
    }*/
  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  // Handle nav pill click and change graph type
  handleSelect() {
    //
  }

  render() {
    console.log('dataSet: ', this.state.data);
    return(
      <div ref="tpicontainer" id="tpi-container">
        <div id="graph-nav-container">
          <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="#">Monthly</NavItem>
            <NavItem eventKey={2} title="Item">Annualized</NavItem>
          </Nav>
        </div>
        <TPIGraph {...this.state} {...this.styles}/>
      </div>
    )
  }
}