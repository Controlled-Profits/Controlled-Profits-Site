import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import DataParser from '../api/dataParser.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FinancialData from '../calc/financialData.js';
import DeltaProspects from './deltaProspects.js';
import DeltaConversions from './deltaConversions.js';
import DeltaVolume from './deltaVolume.js';
import DeltaPrice from './deltaPrice.js';
import DeltaProductivity from './deltaProductivity.js';
import DeltaEfficiency from './deltaEfficiency.js';
import DeltaFrequency from './deltaFrequency.js';
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

    this.handleVolumePctChange = this.handleVolumePctChange.bind(this);
    this.handleVolumeVarCostChange = this.handleVolumeVarCostChange.bind(this);
    this.handleVolumeFixedCostChange = this.handleVolumeFixedCostChange.bind(this);

    this.handlePricePctChange = this.handlePricePctChange.bind(this);
    this.handlePriceVarCostChange = this.handlePriceVarCostChange.bind(this);
    this.handlePriceFixedCostChange = this.handlePriceFixedCostChange.bind(this);

    this.handleProductivityPctChange = this.handleProductivityPctChange.bind(this);
    this.handleProductivityVarCostChange = this.handleProductivityVarCostChange.bind(this);
    this.handleProductivityFixedCostChange = this.handleProductivityFixedCostChange.bind(this);

    this.handleFrequencyPctChange = this.handleFrequencyPctChange.bind(this);
    this.handleFrequencyVarCostChange = this.handleFrequencyVarCostChange.bind(this);
    this.handleFrequencyFixedCostChange = this.handleFrequencyFixedCostChange.bind(this);

    this.handleEfficiencyPctChange = this.handleEfficiencyPctChange.bind(this);
    this.handleEfficiencyVarCostChange = this.handleEfficiencyVarCostChange.bind(this);
    this.handleEfficiencyFixedCostChange = this.handleEfficiencyFixedCostChange.bind(this);

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
        this.state.financialData = new FinancialData(objArray[0]);
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

  //Volume input handlers
  handleVolumePctChange(event) {
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctVolume: pct/100
      });
    }
  }

  handleVolumeVarCostChange(event) {
    let vc = parseFloat(event.target.value);
    if(!isNaN(vc)) {
      this.setState({
        vcVolume: vc
      });
    }
  }

  handleVolumeFixedCostChange(event) {
    let fc = parseFloat(event.target.value);
    if(!isNaN(fc)) {
      this.setState({
        fcVolume: fc
      });
    }
  }

  //Price input handlers
  handlePricePctChange(event) {
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctPrice: pct/100
      });
    }
  }

  handlePriceVarCostChange(event) {
    let vc = parseFloat(event.target.value);
    if(!isNaN(vc)) {
      this.setState({
        vcPrice: vc
      });
    }
  }

  handlePriceFixedCostChange(event) {
    let fc = parseFloat(event.target.value);
    if(!isNaN(fc)) {
      this.setState({
        fcPrice: fc
      });
    }
  }

  //Productivity input handlers
  handleProductivityPctChange(event) {
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctProductivity: pct/100
      });
    }
  }

  handleProductivityVarCostChange(event) {
    let vc = parseFloat(event.target.value);
    if(!isNaN(vc)) {
      this.setState({
        vcProductivity: vc
      });
    }
  }

  handleProductivityFixedCostChange(event) {
    let fc = parseFloat(event.target.value);
    if(!isNaN(fc)) {
      this.setState({
        fcProductivity: fc
      });
    }
  }


  //Efficiency input handlers
  handleEfficiencyPctChange(event) {
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctEfficiency: pct/100
      });
    }
  }

  handleEfficiencyVarCostChange(event) {
    let vc = parseFloat(event.target.value);
    if(!isNaN(vc)) {
      this.setState({
        vcEfficiency: vc
      });
    }
  }

  handleEfficiencyFixedCostChange(event) {
    let fc = parseFloat(event.target.value);
    if(!isNaN(fc)) {
      this.setState({
        fcEfficiency: fc
      });
    }
  }

  //Frequency input handlers
  handleFrequencyPctChange(event) {
    let pct = parseFloat(event.target.value);
    if (!isNaN(pct)) {
      this.setState({
        pctFrequency : pct/100
      });
    }
  }

  handleFrequencyVarCostChange(event) {
    let vc = parseFloat(event.target.value);
    if(!isNaN(vc)) {
      this.setState({
        vcFrequency: vc
      });
    }
  }

  handleFrequencyFixedCostChange(event) {
    let fc = parseFloat(event.target.value);
    if(!isNaN(fc)) {
      this.setState({
        fcFrequency: fc
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
                  <TotalProfitImpact  />
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
                          <input id="pct_volume" type="number" className="form-control" placeholder="5.0"
                            onChange={this.handleVolumePctChange}
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_volume" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleVolumeVarCostChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_volume" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleVolumeFixedCostChange}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_price" type="number" className="form-control" placeholder="3.0"
                            onChange={this.handlePricePctChange}
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_price" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handlePriceVarCostChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_price" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handlePriceFixedCostChange}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Productivity</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_productivity" type="number" className="form-control" placeholder="1.0"
                            onChange={this.handleProductivityPctChange}
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_productivity" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleProductivityVarCostChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_productivity" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleProductivityFixedCostChange}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Efficiency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_efficiency" type="number" className="form-control" placeholder="1.0"
                            onChange={this.handleEfficiencyPctChange}
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_efficiency" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleEfficiencyVarCostChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_efficiency" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleEfficiencyFixedCostChange}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Frequency</td>
                      <td>
                        {/* This can pretty easily be changed to a slider later */}
                        <div className="input-group input-group-sm">
                          <input id="pct_frequency" type="number" className="form-control" placeholder="7.0"
                            onChange={this.handleFrequencyPctChange}
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="var_cost_frequency" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleFrequencyVarCostChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <span className="input-group-addon">$</span>
                          <input id="fixed_cost_frequency" type="number" className="form-control" placeholder="100.00"
                            onChange={this.handleFrequencyFixedCostChange}
                          />
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
              financialData={this.state.financialData}
            />
          </Tab>
          <Tab eventKey={2} title="Conversions Impact">
            <DeltaConversions
              pctConversions={this.state.pctConversions}
              vcConversions={this.state.vcConversions}
              fcConversions={this.state.fcConversions}
              financialData={this.state.financialData}
            /> 
          </Tab>
          <Tab eventKey={3} title="Volume Impact">
            <DeltaVolume 
              pctVolume={this.state.pctVolume} 
              vcVolume={this.state.vcVolume}
              fcVolume={this.state.fcVolume}
              financialData={this.state.financialData}
            />
          </Tab>
          <Tab eventKey={4} title="Price Impact">
            <DeltaPrice
              pctPrice={this.state.pctPrice}
              vcPrice={this.state.vcPrice}
              fcPrice={this.state.fcPrice}
              financialData={this.state.financialData}
            />
          </Tab>
          <Tab eventKey={5} title="Productivity Impact">
            <DeltaProductivity
              pctProductivity={this.state.pctProductivity} 
              vcProductivity={this.state.vcProductivity}
              fcProductivity={this.state.fcProductivity}
              financialData={this.state.financialData}
            />
          </Tab>
          <Tab eventKey={6} title="Efficiency Impact">
            <DeltaEfficiency
              pctEfficiency={this.state.pctEfficiency} 
              vcEfficiency={this.state.vcEfficiency}
              fcEfficiency={this.state.fcEfficiency}
              financialData={this.state.financialData}
            />
          </Tab>
          <Tab eventKey={7} title="Frequency Impact">
            <DeltaFrequency
              pctFrequency={this.state.pctFrequency} 
              vcFrequency={this.state.vcFrequency}
              fcFrequency={this.state.fcFrequency}
              financialData={this.state.financialData}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }

}
