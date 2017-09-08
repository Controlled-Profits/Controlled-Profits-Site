import React, {Component} from 'react'
import DeltaProspects from './deltaProspects.js'

export default class ProfitDrivers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return(
      <div className="container container-fluid">
        <DeltaProspects props={this.props} />
      </div>
    );
  }

}