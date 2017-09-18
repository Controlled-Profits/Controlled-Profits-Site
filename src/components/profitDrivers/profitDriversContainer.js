import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import DataParser from '../api/dataParser.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CalcHandler from '../calc/calcHandler';
import DeltaProspects from './deltaProspects.js';
import DeltaConversions from './deltaConversions.js';
import TotalProfitImpact from '../totalProfitImpact/totalProfitImpactContainer.js';



import 'react-datepicker/dist/react-datepicker.css';

import '../../styles/profitDrivers.css';

export default class ProfitDrivers extends Component {
  constructor(props) {
    super(props)

    this.getDataActual = this.getDataActual.bind(this);
    this.getDataAdjusted = this.getDataAdjusted.bind(this);

    this.handleTargetDateChange = this.handleTargetDateChange.bind(this);
    this.handleProspectsPercentChange = this.handleProspectsPercentChange.bind(this);
    this.handleProspectsVarCostChange = this.handleProspectsVarCostChange.bind(this);
    this.handleProspectsFixedCostChange = this.handleProspectsFixedCostChange.bind(this);
    this.handleConversionsPctChange = this.handleConversionsPctChange.bind(this);
    this.handleConversionsVarCostChange = this.handleConversionsVarCostChange.bind(this);
    this.handleConversionsFixedCostChange = this.handleConversionsFixedCostChange.bind(this);
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
      //Driver percent change, var cost, fixed cost:
      pctProspects: 0.00,
      vcProspects: 0.00,
      fcProspects: 0.00,
      //
      pctConversions: 0.00,
      vcConversions: 0.00,
      fcConversions: 0.00,
      //
      pctVolume: 0.00,
      vcVolume: 0.00,
      fcVolume: 0.00,
      //
      pctPrice: 0.00,
      vcPrice: 0.00,
      fcPrice: 0.00,
      //
      pctProductivity: 0.00,
      vcProductivity: 0.00,
      fcProductivity: 0.00,
      //
      pctEfficiency: 0.00,
      vcEfficiency: 0.00,
      fcEfficiency: 0.00,
      //
      pctFrequency: 0.00,
      vcFrequency: 0.00,
      fcFrequency: 0.00
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

  // Prospects input handlers
  handleProspectsPercentChange(event) {
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctProspects: pct/100
      });
    }
  }

  handleProspectsVarCostChange(event) {
    let vc = parseFloat(event.target.value);
    if(!isNaN(vc)) {
      this.setState({
        vcProspects: vc
      });
    }
  }

  handleProspectsFixedCostChange(event) {
    let fc = parseFloat(event.target.value);
    if(!isNaN(fc)) {
      this.setState({
        fcProspects: fc
      });
    }
  }

  //Conversions input handlers
  handleConversionsPctChange(event) {
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctConversions: pct/100
      });
    }
  }

  handleConversionsVarCostChange(event) {
    let vc = parseFloat(event.target.value);
    if(!isNaN(vc)) {
      this.setState({
        vcConversions: vc
      });
    }
  }

  handleConversionsFixedCostChange(event) {
    let fc = parseFloat(event.target.value);
    if(!isNaN(fc)) {
      this.setState({
        fcConversions: fc
      });
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
                <strong>Target Date:</strong><DatePicker 
                  selected={this.state.targetDate}
                  onChange={this.handleTargetDateChange}
                />
              </div>
              <div className="col-md-10 col-xs-10">
                <h4 className="text-center">Total Profit Impact</h4>
                <div className="well tpi-graph-container">
                  <TotalProfitImpact />
                </div>
                
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 col-xs-2">
                {/* TODO: convert to component updated on label hover */}
                <div className="well driver-tip-container">
                  <h4 id="driver-tip-heading">Hint</h4>
                  <p id="driver-tip-body">
                    Hover over any of the field titles on the right to
                    read about their usage.
                  </p>
                </div>
              </div>
              <div className="col-md-10 col-xs-10">
              <table className="driver-input-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Percent Improvement</th>
                      <th>Variable Cost</th>
                      <th>Fixed Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Prospects</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_prospects" type="number" className="form-control" placeholder="1.0" 
                            onChange={this.handleProspectsPercentChange} 
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_prospects" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleProspectsVarCostChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_prospects" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleProspectsFixedCostChange}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Conversions</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_conversions" type="number" className="form-control" placeholder="15.0"
                            onChange={this.handleConversionsPctChange}
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_conversions" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleConversionsVarCostChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_conversions" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleConversionsFixedCostChange}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Volume</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_volume" type="number" className="form-control" placeholder="5.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_volume" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_volume" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_price" type="number" className="form-control" placeholder="3.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_price" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_price" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Productivity</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_productivity" type="number" className="form-control" placeholder="1.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_productivity" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_productivity" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Efficiency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_efficiency" type="number" className="form-control" placeholder="1.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_efficiency" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_efficiency" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Frequency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_frequency" type="number" className="form-control" placeholder="7.0"/>
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_frequency" type="number" className="form-control" placeholder="100.00"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
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
          <Tab eventKey={1} title="Prospects Impact">
            <DeltaProspects 
              pctProspects={this.state.pctProspects} 
              vcProspects={this.state.vcProspects}
              fcProspects={this.state.fcProspects}
              calcHandler={this.state.calcHandler}
              dataActual={this.state.dataActual} 
              dataAdjusted={this.state.dataAdjusted}
            />
          </Tab>
          <Tab eventKey={2} title="Conversions Impact">
            <DeltaConversions 
              pctConversions={this.state.pctConversions} 
              vcConversions={this.state.vcConversions}
              fcConversions={this.state.fcConversions}
              calcHandler={this.state.calcHandler}
              dataActual={this.state.dataActual} 
              dataAdjusted={this.state.dataAdjusted}
            />
          </Tab>
          <Tab eventKey={3} title="Volume Impact">
            Tab 3 content
          </Tab>
          <Tab eventKey={4} title="Price Impact">
            Tab 3 content
          </Tab>
          <Tab eventKey={5} title="Productivity Impact">
            Tab 1 content
          </Tab>
          <Tab eventKey={6} title="Efficiency Impact">
            Tab 2 content
          </Tab>
          <Tab eventKey={7} title="Frequency Impact">
            Tab 3 content
          </Tab>
        </Tabs>
      </div>
    );
  }

}