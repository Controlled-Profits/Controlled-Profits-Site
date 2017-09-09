import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import DeltaProspects from './deltaProspects.js';

import '../../styles/profitDrivers.css';

export default class ProfitDrivers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="container container-fluid">
        <Tabs defaultActiveKey={1} id="driverTabs">
          <Tab eventKey={1} title="Delta Prospects">
            <DeltaProspects businessHolder={this.props.businessHolder} />
          </Tab>
          <Tab eventKey={2} title="Delta Conversions">
            Tab 2 content
          </Tab>
          <Tab eventKey={3} title="Delta Volume">
            Tab 3 content
          </Tab>
          <Tab eventKey={4} title="Delta Price">
            Tab 3 content
          </Tab>
          <Tab eventKey={5} title="Delta Productivity">
            Tab 1 content
          </Tab>
          <Tab eventKey={6} title="Delta Efficiency">
            Tab 2 content
          </Tab>
          <Tab eventKey={7} title="Delta Frequency">
            Tab 3 content
          </Tab>
        </Tabs>
      </div>
    );
  }

}