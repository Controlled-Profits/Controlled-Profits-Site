import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DeltaProspects from './deltaProspects.js';

import 'react-datepicker/dist/react-datepicker.css';

import '../../styles/profitDrivers.css';

export default class ProfitDrivers extends Component {
  constructor(props) {
    super(props)

    this.handleTargetDateChange = this.handleTargetDateChange.bind(this);

    //Get last day in month, convert to appropriate string format
    let today = new Date();

    //Keep in api accepted format
    let endOfMonthStr = moment().add('months', 1).date(0).format('YYYY[/]MM[/]DD'),
        nextMonthStr = moment().add('months', 2).date(0).format('YYYY[/]MM[/]DD');

    this.state = {
      startDate: moment(endOfMonthStr),
      targetDate: moment(nextMonthStr)
    }
  }

  handleTargetDateChange(date) {
    //Probably will need to recalculate 
    this.setState({
      targetDate: date 
    });
  }


  render() {
    return(
      <div className="container container-fluid">
      <div className="delta-prospects-container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Profit Driver Inputs</h3>
          </div>
          <div className="panel-body">
        <span>
          <strong>Start Date:</strong><br />
          <input value={this.state.startDate.format("MM[/]DD[/]YYYY")} disabled/><br /><br />
          <strong>End Date:</strong><DatePicker 
            selected={this.state.targetDate}
            onChange={this.handleTargetDateChange}
          />
        </span>
        </div>
      </div>
    </div>
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