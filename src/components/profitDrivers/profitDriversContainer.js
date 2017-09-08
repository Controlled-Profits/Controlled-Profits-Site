import React, {Component} from 'react'
import DeltaProspects from './deltaProspects.js'

export default class ProfitDrivers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="container container-fluid">
        <DeltaProspects businessHolder={this.props.businessHolder} />
      </div>
    );
  }

}