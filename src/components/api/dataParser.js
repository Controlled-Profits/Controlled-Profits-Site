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
 *  this.props.dataParser.getBusinessDataEntries(this.props.activeBizId, 'actual', [...])
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
  constructor(apiUrl, accessToken, client, uid, tokenType) {
    this.apiUrl = apiUrl;
    this.accessToken = accessToken;
    this.client = client;
    this.tokenType = tokenType
    this.uid = uid;
  }

  // Returns user data as object if credentials are valid
  getUser() {
    return new Promise(function(resolve, reject) {
      superagent
      .get(this.apiUrl + 'auth/validate_token/')
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
      .end((err, res) => {
        if(err || !res.ok) { reject(err) }
        else {
          resolve({
            id: res.body.data['id'],
            firstName: res.body.data['firstname'],
            lastName: res.body.data['lastname'],
            email: res.body.data['email'],
            tier: res.body.data['tier'],
            activeBusinessId: res.body.data['active_business_id']
          });
        }
      });
    }.bind(this));
  }

  // Returns all a user's businesses as an array of objects
  getAllBusinesses() {
    return new Promise(function(resolve, reject) {
      superagent
      .get(this.apiUrl + 'v1/businesses')
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
      .end((err, res) => {
        if(err || !res.ok) { reject(err) }
        else {
          if(!res.body || !res.body.data) resolve([]);
          let businesses = [];
          for(var i = 0; i < res.body.data.length; i++) {
            let business = res.body.data[i];
            businesses.push({
              id: business['id'],
              name: business['attributes']['name'],
              naics: business['attributes']['naics'],
              sic: business['attributes']['sic'],
              ein: business['attributes']['ein'],
              tier: business['attributes']['tier']
            });
          }
          resolve(businesses);
        }
      });
    }.bind(this));
  }

  // Returns a single business' data as an object
  getBusiness(businessId) {
    return new Promise(function(resolve, reject) {
      superagent
      .get(this.apiUrl + `v1/businesses/${businessId}`)
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
      .end((err, res) => {
        if(err || !res.ok) { reject(err) }
        else {
          if(!res.body || !res.body.data) resolve({});
          
          let business = res.body.data;
          
          resolve({
            id: business['id'],
            name: business['attributes']['name'],
            naics: business['attributes']['naics'],
            sic: business['attributes']['sic'],
            ein: business['attributes']['ein'],
            tier: business['attributes']['tier']
          });
        }
      });
    }.bind(this));
  }

  // Returns all of the data entered for a business as an array of objects
  // Optional parameters:
  // entry_type: actual || adjusted
  // section: income_statement || balance_sheet || sales_and_marketing || financial_roi
  // startDate/endDate: must be strings in format YYYY/mm/dd 
  getBusinessDataEntries(businessId, entryType=null, section=null, startDate=null, endDate=null) {
    return new Promise(function(resolve, reject) {
      let url = this.apiUrl + `v1/businesses/${businessId}/data/`;
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
        if(err || !res.ok) { reject(err) }
        else {
          // With optional partial section responses, just loop through and add what is given
          // * Could be refactored into serializers file 
          let sectionNames = ['income_statement', 'balance_sheet', 'sales_and_marketing', 'financial_roi'];
          let dataEntries = [];
          
          if(!res.body || !res.body.data) resolve(dataEntries);
          let entries = res.body.data;

          // Roll response objects into a better packaged JS object,
          // and then those objects back into the result array
          for(var i = 0; i < entries.length; i++) {
            let entry = entries[i];
            let entryData = {
              id: entry['id'],
              entryType: entry['entry_type'],
              entryDate: entry['entry_date'],
              businessId: entry['business_id']
            }

            for(var sKey in sectionNames) {
              let key = sectionNames[sKey];
              if(entry.hasOwnProperty(key)) 
                entryData[key] = entry[key];
            }

            dataEntries.push(entryData);
          }

          resolve(dataEntries);
        }
      });
    }.bind(this));
  }
  
  // Returns all of the entered profit driver sensitivities for the current month
  // as an object. Alternatively, a date range can be specified.
  // * API not yet set up to return data as an array if multiple found in date range - OP
  getProfitDriverData(businessId, startDate=null, endDate=null) {
    return new Promise(function(resolve, reject) {
      let url = this.apiUrl + `v1/businesses/${businessId}/profit_drivers/`;

      if (startDate && endDate && startDate.length && endDate.length)
        url += `?start_date=${startDate}&end_date=${endDate}`;

      superagent
      .get(url)
      .set({"Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
      .end((err, res) => {
        if(err || !res.ok) { reject(err) }
        else {
          //TODO: Deserialize data
          resolve(res.body);
        }
      });
    }.bind(this));
  }
  
  // Returns proper json array format given profit driver data object
  // * Could be refactored into serializers file
  serializeProfitDriverData(dataObj) {
    let result = {
      data: {
        type: 'profit_drivers_data',
        profit_drivers: {}
      }
    };

    if(!dataObj) return result;

    let driverKeys = ['prospects', 'conversions', 'volume', 'price', 'productivity', 'efficiency', 'frequency'];
    
    for(var dkey in driverKeys)
      if(dataObj.hasOwnProperty(dkey))
        result['data']['profit_drivers'][dkey] = dataObj[dkey];

    return result;
  }

  // POSTs profit driver data for business as JSON
  // Resolves {message: [message]} on success, superagent err on failure
  sendProfitDriverData(businessId, dataObj) {
    return new Promise(function(resolve, reject) {
      let reqBody = this.serializeProfitDriverData(dataObj);

      superagent
      .post(this.apiUrl + `v1/businesses/${businessId}/profit_drivers/`)
      .set({"Content-Type": "application/json", "Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
      .send(reqBody)
      .end((err, res) => {
        if(err || !res.ok) { reject(err) }
        else {
          let result = {};
          if(res.body && res.body.data && res.body.data['meta']) 
            result = {
              message: res.body.data['meta']['message']
            }

          resolve(result);
        }
      });
    }.bind(this));
  }

  // Updates a user's personal info; firstName, lastName, activeBusinessId and returns user object
  updateUserData(firstName=null, lastName=null, activeBusinessId=null) {
    return new Promise(function(resolve, reject) {
      let reqBody = {};
      
      if(firstName && firstName.length) reqBody['firstname'] = firstName;
      if(lastName && lastName.length) reqBody['lastname'] = lastName;
      if(activeBusinessId) reqBody['active_business_id'] = parseInt(activeBusinessId);

      superagent
      .put(this.apiUrl + 'auth/')
      .set({"Content-Type": "application/json", "Access-Token": this.accessToken, "Client": this.client, "Token-Type": this.tokenType, "Uid": this.uid})
      .send(reqBody)
      .end((err, res) => {
        if(err || !res.ok) { reject(err) }
        else {
          let result = {};
          if(res.body && res.body.data) {
            result = {
              id: res.body.data['id'],
              firstName: res.body.data['firstname'],
              lastName: res.body.data['lastname'],
              email: res.body.data['email'],
              tier: res.body.data['tier'],
              activeBusinessId: res.body.data['active_business_id']
            }
          }

          resolve(result);
        }
      });
    }.bind(this));
  }

}