import React, {Component} from 'react';

export default class MemberHome extends Component {
  constructor(props) {
    super(props);
    this.state {
      addBusiness: false
    }
  }




  render(){
    return(
      <div>
        <h1>Member Home</h1>
        <div>
          <a className="adminAnchor btn btn-primary" href="#" onClick={this.handleNewBuisness}>Add A Business</a>
          {(this.state.addBusiness) ? (
            <form className="adminForm form-group" onSubmit={this.handleBuisnessBuild}>
            </form>
        </div>
      </div>
    )
  }
}
