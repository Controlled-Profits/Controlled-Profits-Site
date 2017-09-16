import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import DataParser from '../api/dataParser.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CalcHandler from '../calc/calcHandler';
import DeltaProspects from './deltaProspects.js';



import 'react-datepicker/dist/react-datepicker.css';

import '../../styles/profitDrivers.css';

export default class ProfitDrivers extends Component {
  constructor(props) {
    super(props)

    this.getDataActual = this.getDataActual.bind(this);
    this.getDataAdjusted = this.getDataAdjusted.bind(this);

    this.handleTargetDateChange = this.handleTargetDateChange.bind(this);
    this.handleProspectsPercentChange = this.handleProspectsPercentChange.bind(this);

    //Get last day in month, convert to appropriate string format
    let today = new Date();

    //Keep in api accepted format
    let endOfMonthStr = moment().add('months', 1).date(0).format('YYYY[/]MM[/]DD'),
        nextMonthStr = moment().add('months', 2).date(0).format('YYYY[/]MM[/]DD');

    this.state = {
      dataActual: {},
      dataAdjusted: {},
      startDate: moment(endOfMonthStr),
      targetDate: moment(nextMonthStr),
      pctProspects: 0.00,
      pctConversions: 0.00,
      pctVolume: 0.00,
      pctPrice: 0.00,
      pctProductivity: 0.00,
      pctEfficiency: 0.00,
      pctFrequency: 0.00
    }

    //Remove once dp is universally integrated and passed by props
    this.init();
  }

    // Ideally this would run in the AppHomeBox, and then every app that inherits it
  // could just run dp's functions without having to put in four different credentials every time.
  init() {
    let accessToken = localStorage.getItem('Access-Token');
    let client = localStorage.getItem('Client');
    let tokenType = localStorage.getItem('Token-Type');
    let uid = localStorage.getItem('Uid');

    this.dp = new DataParser('http://controlledprofits.herokuapp.com/', accessToken, client, uid);
  }

  componentDidMount() {
    this.dp.getUser()
    .then(function(obj) {
      this.getDataActual(obj.activeBusinessId);
      this.getDataAdjusted(obj.activeBusinessId);
    }.bind(this))

    .catch(function(err) {
      this.setState({errorMessage: err});
    }.bind(this));
  }

  getDataActual(businessId) {
    this.dp.getBusinessDataEntries(businessId, 'actual')
      .then(function(objArray) {
        this.setState({dataActual: objArray[0]});
        this.state.calcHandler = new CalcHandler(objArray[0])
      }.bind(this))

      .catch((err) => {
        console.log(err);
      })
  }

  getDataAdjusted(businessId) {
    this.dp.getBusinessDataEntries(businessId, 'adjusted') 
      .then(function(objArray) {
        if(objArray.length)
          this.setState({dataAdjusted: objArray[0]});
        else 
          //If there is no stored adjusted data, initially set adjusted data to equal current
          this.setState({dataAdjusted: this.state.dataActual})
      }.bind(this))

      .catch(function(err) {
        console.log(err);
      })
  }

  handleTargetDateChange(date) {
    //Automatically sets to end of chosen month
    this.setState({
      targetDate: date.add('months', 1).date(0)
    });
  }

  handleProspectsPercentChange(event) {
    event.preventDefault();
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctProspects: pct/100
      });
      event.target.value = pct.toFixed(1)
    }
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
                          <input id="pct_prospects" type="number" className="form-control" placeholder="1.0" onChange={this.handleProspectsPercentChange}/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_prospects" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_prospects" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Conversions</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_conversions" type="number" className="form-control" placeholder="15.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_conversions" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_conversions" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Volume</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_volume" type="number" className="form-control" placeholder="5.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_volume" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_volume" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_price" type="number" className="form-control" placeholder="3.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_price" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_price" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Productivity</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_productivity" type="number" className="form-control" placeholder="1.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_productivity" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_productivity" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Efficiency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_efficiency" type="number" className="form-control" placeholder="1.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_efficiency" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_efficiency" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Frequency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group">
                          <input id="pct_frequency" type="number" className="form-control" placeholder="7.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_frequency" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_frequency" type="number" className="form-control" placeholder="100.00"/>
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
            <DeltaProspects pctProspects={this.state.pctProspects} 
              calcHandler={this.state.calcHandler}
              dataActual={this.state.dataActual} 
              dataAdjusted={this.state.dataAdjusted}
            />
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