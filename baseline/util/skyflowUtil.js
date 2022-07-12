const axios = require('axios');
const Qs = require('qs');

// Setup for the Skyflow Vault
const { Skyflow, GenerateToken } = require('skyflow-node');

const {
  SKYFLOW_VAULT_API_URL,
  SERVICE_ACCOUNT_FILE
} = require('./config');

const skyflowUtil = {
  /**
   * Inserts the records into the given table in the vault.
   * @param {String} tableName The table to insert records into. 
   * @param {Array} records List of record objects to insert.
   * @returns List of inserted records.
   */
   insert: async function(tableName, records) {
    const body = {
      quorum: false,
      records: records,
      tokenization: true
    };

    let insertURI = SKYFLOW_VAULT_API_URL + '/' + tableName;
    try {
      const response = await axios.post(insertURI, body, { headers: await getRequestHeaders() });

      return response.data.records;
    } catch(e) {
      console.dir(e.response);
    }
    
    return false;
  },

  /**
   * Inserts the records into the given table in the vault.
   * @param {String} tableName The table to insert records into. 
   * @param {String} skyflowId The Skyflow ID for the record being updated.
   * @param {Object} record Record object to update
   * @returns List of inserted records.
   */
   update: async function(tableName, skyflowId, record) {
    const body = {
      quorum: false,
      record: record,
      tokenization: false
    };

    let insertURI = SKYFLOW_VAULT_API_URL + '/' + tableName + '/' + skyflowId;
    try {
      const response = await axios.put(insertURI, body, { headers: await getRequestHeaders() });

      return response.data.records;
    } catch(e) {
      console.dir(e.response);
    }
    
    return false;
  },

  /**
   * Gets a single record.
   * @param {String} tableName The table to insert records into. 
   * @param {string} skyflowId Unique identifier for the record to be retrieved.
   * @param {object} options Options for request.
   * @returns Single matching record if found.
   */
   get: async function(tableName, skyflowId, options) {
    let customersURI = SKYFLOW_VAULT_API_URL + '/' + tableName + '/' + skyflowId;

    try {
      const response = await axios.get(customersURI, { headers: await getRequestHeaders(),
        params: {
          fields: options.fields,
          redaction: options.redaction,
          tokenization: options.tokenization,
        },
        paramsSerializer: function(params) {
          return Qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });    
  
      return response.data;
    } catch(e) {
      console.log(e);
      return false;
    }
  },

  /**
   * Executes the passed in query against the Skyflow vault.
   * @param {string} query Valid Skyflow SQL query.
   * @param {array} params Request parameters.
   * @returns List of matching records.
   */
  executeQuery: async function(query, params) {
    if(typeof params === 'undefined') {
      params = [];
    }

    let queryURI = SKYFLOW_VAULT_API_URL + '/query';
    try {
      const response = await axios.post(queryURI, { query: query, params: params },
        { headers: await getRequestHeaders() });

        return response.data.records;
    } catch(e) {
      console.log(e);
    }
    
    return false;
  }
}

/**
 * Generates standard request headers for API calls.
 * @returns Object structure for a valid API request header.
 */
async function getRequestHeaders() {
  let authToken = await GenerateToken(SERVICE_ACCOUNT_FILE);

  return {
    'Authorization': 'Bearer ' + authToken.accessToken,
    'Content-Type': 'application/json'
  };
}

/**
 * Generates an auth bearer token based on the Skyflow Vault
 * service account key file.
 * @param {string} filepath Location of the service account key.
 * @returns An auth bearer token.
 */
 function getSkyflowAuthBearerToken() {
  return new Promise(async (resolve, reject) => {
    try {
      let authToken = await GenerateToken(SERVICE_ACCOUNT_FILE);
      resolve(authToken.accessToken);
    } catch(e) {
      reject(e);
    }
  });
}

module.exports = { skyflowUtil, getSkyflowAuthBearerToken };