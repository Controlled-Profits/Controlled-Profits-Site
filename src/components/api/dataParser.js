/*
 * Just a library for commonly used functions that might save us from callback hell
 * Handles superagent requests and returns promises that resolve to arrays or objects
 * 
 * Example usage:
 * import DataParser from '../api/dataParser.js'
 * 
 * // Store in state so that user data does not need to be passed along components, 
 * // only the parser. This way data is up to date whenever it is grabbed.
 * this.setState({dataParser: new DataParser(this.props.apiUrl, this.props.accessToken, client, uid)})
 * 
 * ...
 * 
 * someComponentAction() {
 *  this.props.dataParser.getBusinessDataEntries(this.props.activeBizId, entryType='actual', [...])
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
 * Note: Not even sure if this code runs yet, just a theory
 */

import superagent from 'superagent';

export default class DataParser {
  constructor(apiUrl, accessToken, client, uid) {
    this.apiUrl = apiUrl;
    this.accessToken = accessToken;
    this.client = client;
    this.uid = uid;
  }

  //needs validateUser()

  // Returns user data as object if credentials are valid
  // * Will add an api route for this - OP
  getUser() {
    return new Promise(function(resolve, reject) {
      superagent
      .get(this.apiUrl + 'profile')
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
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
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
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
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
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
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
      .end((err, res) => {
        if(err) { reject(err) }
        else {
          resolve(res.body);
        }
      });
    });
  }
  
  // Returns all of the entered profit driver sensitivities for the current month
  // as an object. Alternatively, a date range can be specified.
  // * API not yet set up to return data as an array if multiple found in date range - OP
  getProfitDriverData(businessId, startDate=null, endDate=null) {
    url = this.apiUrl + `businesses/${businessId}/profit_drivers/`;

    if (startDate && endDate && startDate.length && endDate.length)
      url += `?start_date=${startDate}&end_date=${endDate}`;

    superagent
    .get(url)
    .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
    .end((err, res) => {
      if(err) { reject(err) }
      else {
        resolve(res.body);
      }
    });
  }
  
  // Returns proper json array format given profit driver data object
  // May move to a file for api serializers
  serializeProfitDriverData(dataObj) {
    
  }

  // POSTs profit driver data for business as JSON
  saveProfitDriverData(businessId, dataObj) {


    superagent
    .post(this.apiUrl + `/businesses/${businessId}`)
    .set({"Content-Type": "application/json", "Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
    .send(dataObj)
    .end((err, res) => {
      if(err || !res.ok) { reject(err) }
      else {
        resolve(res.body);
      }
    });
  }
}