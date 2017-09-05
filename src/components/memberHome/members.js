import React, {Component} from 'react';
import superagent from 'superagent';

export default class MemberHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBusiness: false,
      name: '',
      naics: '',
      sic: '',
      ein: ''
    }
  }

handleNameChange(event){
  this.setState({name: event.target.value});
}

handleNaicsChange(event){
  this.setState({naics: event.target.value});
}

handleSicChange(event){
  this.setState({sic: event.target.value});
}

handleEinChange(event){
  this.setState({ein: event.target.value});
}

handleNewBuisness(){
  this.setState({addBusiness: !this.state.addBusiness});
}

handleBusinessClose(){
  this.setState({addBusiness: !this.state.addBusiness});
}

handleBuisnessBuild(event){
  event.preventDefault();
  let bname = (this.state.name) ? this.state.name : null;
  let bnaics = (this.state.naics) ? this.state.naics : null;
  let bsic = (this.state.sic) ? this.state.sic : null;
  let bein = (this.state.ein) ? this.state.ein : null;
  console.log("name: ", bname, "naics: ", bnaics, "sic: ", bsic, "ein", bein);

  let accessToken = localStorage.getItem('Access-Token');
  let client = localStorage.getItem('Client');
  let tokenType = localStorage.getItem('Token-Type');
  let uid = localStorage.getItem('Uid');
  superagent
    .post('http://controlledprofits.herokuapp.com/v1/businesses/')
    .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
    .send({name: bname, naics: bnaics, sic: bsic, ein: bein})
    .end((err, res) => {
      if(err) { this.setState({errorMessage: "Authentication Failed"}); return; }

      this.setState({});
    });
}



  render(){

    let businesses = '';
    if(this.props.currentBusinesses === undefined){
      businesses = '';
    }
    else{
    businesses = this.props.currentBusinesses.map((biz) => {
      return(
        <li>
          {biz.name}
        </li>
      );
    })
  }
    return(
      <div>
        <h1>Member Home</h1>
          <ul>
            {businesses}
          </ul>
        <div>
          <a className="adminAnchor btn btn-primary" href="#" onClick={this.handleNewBuisness.bind(this)}>Add A Business</a>
          {(this.state.addBusiness) ? (
            <div className="container">
            <form className="adminForm form-group col-md-6" onSubmit={this.handleBuisnessBuild.bind(this)}>
              <label>Business Name:</label>
              <input className="form-control" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
              <label>NAICS Code:</label>
              <input className='form-control' value={this.state.naics} onChange={this.handleNaicsChange.bind(this)}/>
              <label>SIC Code:</label>
              <input className='form-control' value={this.state.sic} onChange={this.handleSicChange.bind(this)}/>
              <label>EIN Code:</label>
              <input className="form-control" value={this.state.ein} onChange={this.handleEinChange.bind(this)} />
              <button type="submit" className="btn btn-success">Submit</button>
              <button className="btn btn-danger" onClick={this.handleBusinessClose.bind(this)}>Close</button>
            </form>
          </div>
          ) : null}
        </div>
      </div>
    )
  }
}
