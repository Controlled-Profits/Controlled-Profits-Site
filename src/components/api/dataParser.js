/*
 * Just a library for commonly used functions that might save us from callback hell
 * Handles superagent requests and returns promises that resolve to arrays or objects
 * 
 * Example usage:
 * import DataParser from '../api/dataParser.js'
 * 
 * // Store in state so that user data does not need to be passed along components, 
 * // only the parser. This way data is up to date whenever it is grabbed.
 * this.setState({dataParser: dataParser.new(this.props.apiUrl, this.props.accessToken, client, uid)})
 * 
 * ...
 * 
 * someComponentAction() {
 *  this.props.dataParser.getBusinessDataEntries(businessId: this.props.activeBizId, entry_type='actual', [...])
 *    .then(function(data) { // Pay attention to return type of data, 
 *                           // some functions return arrays and some return objects
 *                           // as necessary
 *      this.setState({businessEntries: data});
 *    })
 * 
 *    .catch(function(err) { //err = superagent response error
 *      this.setState({errorMessage: ...});
 *    });
 * }
 * 
 *
 */

import superagent from 'superagent';

class DataParser {
  constructor(apiUrl, accessToken, client, uid) {
    this.apiUrl = apiUrl;
    this.accessToken = accessToken,
    this.client = client
    this.uid = uid
  }

  // Returns user data as object if credentials are valid
  // Will add an api route for this - OP
  getUser() {
    return new Promise(function(resolve, reject) {
      superagent
      .get(this.apiUrl + 'profile')
      .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
      .end((err, res) => {
        if(err) { reject(err) }
        else {
          resolve(res.body);
        }
      });
    });
  }

  // Returns all a user's businesses as an array of objects
  getAllBusinesses() {
    return new Promise(function(resolve, reject) {
      superagent
      .get(this.apiUrl + 'businesses')
      .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
      .end((err, res) => {
        if(err) { reject(err) }
        else {
          resolve(res.body);
        }
      });
    });
  }

  // Returns a single business' data as an object
  getBusiness(businessId) {
    return new Promise(function(resolve, reject) {
      superagent
      .get(this.apiUrl + `businesses/${businessId}`)
      .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
      .end((err, res) => {
        if(err) { reject(err) }
        else {
          resolve(res.body);
        }
      });
    });
  }

  // Returns all of the data entered for a business as an array of objects
  // Optional parameters:
  // entry_type: actual || adjusted
  // section: income_statement || balance_sheet || sales_and_marketing || financial_roi
  // startDate/endDate: must be strings in format YYYY/mm/dd 
  getBusinessDataEntries(businessId, entryType=null, section=null, startDate=null, endDate=null) {
    return new Promise(function(resolve, reject) {
      let url = this.apiUrl + `businesses/${businessId}/data/`;
      let queryTokens = [];

      if(entryType && entryType.length) 
        queryTokens.push(`entry_type=${entryType}`);

      if(section && section.length) 
        queryTokens.push(`section=${section}`);

      if(startDate && endDate && startDate.length && endDate.length)
        queryTokens.push(`start_date=${startDate}&end_date=${endDate}`);

      if(queryTokens.length) url += ('?' + queryTokens.join('&'));

      superagent
      .get(url)
      .set({"Access-Token": accessToken, "Client": client, "Token-Type": tokenType, "Uid": uid})
      .end((err, res) => {
        if(err) { reject(err) }
        else {
          resolve(res.body);
        }
      });
    });
  }
  
  // Returns all of the entered profit driver sensitivities for the current month
  // as an object. Alternatively, a date range can be specified
  getProfitDriverData(businessId, startDate=null, endDate=null) {

  }
}