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
    //Automatically sets to end of chosen month
    this.setState({
      targetDate: date.add('months', 1).date(0)
    });
  }


  render() {
    return(
      <div className="container container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Profit Driver Inputs</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 col-xs-2">
                <strong>Start Date:</strong><br />
                <input value={this.state.startDate.format("MM[/]DD[/]YYYY")} disabled/><br /><br />
                <strong>End Date:</strong><DatePicker 
                  selected={this.state.targetDate}
                  onChange={this.handleTargetDateChange}
                />
              </div>
              <div className="col-md-10 col-xs-10">
                <table className="driver-input-table">
                  <thead>
                    <tr>
                      <th>Driver Name</th>
                      <th>Percent</th>
                      <th>Variable Cost</th>
                      <th>Fixed Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Prospects</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_prospects" type="text" className="form-control" placeholder="1.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_prospects" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_prospects" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Conversions</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_conversions" type="text" className="form-control" placeholder="15.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_conversions" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_conversions" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Volume</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_volume" type="text" className="form-control" placeholder="5.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_volume" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_volume" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_price" type="text" className="form-control" placeholder="3.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_price" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_price" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Productivity</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_productivity" type="text" className="form-control" placeholder="1.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_productivity" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_productivity" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Efficiency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_efficiency" type="text" className="form-control" placeholder="1.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_efficiency" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_efficiency" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Frequency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_frequency" type="text" className="form-control" placeholder="7.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_frequency" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_frequency" type="text" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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