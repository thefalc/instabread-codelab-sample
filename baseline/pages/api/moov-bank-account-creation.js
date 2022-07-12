const { ironOptions } = require('../../util/ironOptions');
import { withIronSessionApiRoute } from 'iron-session/next';
import { Moov, SCOPES } from '@moovio/node';
const axios = require('axios');
const { generateBearerTokenFromCreds } = require('skyflow-node');

const moov = new Moov({
  accountID: process.env.MOOV_BUSINESS_ACCOUNT_ID,
  publicKey: process.env.MOOV_PUBLIC_KEY,
  secretKey: process.env.MOOV_SECRET_KEY,
  domain: process.env.MOOV_DOMAIN
});

/**
 * Creates a Moov bank account for the shopper using the stored bank account tokens. The tokens are
 * sent to a Skyflow Connection and the connection detokenizes the tokens and passes the values
 * securely to Moov to register the account.
 */
export default withIronSessionApiRoute(
  async function handler(req, res) {
    let shopperBankInformation = req.body;
    const moovAccountId = req.session.moovAccountId;
    
    // Generate Moov auth token, this is a passthrough for the Skyflow Connection call.
    let moovAuthToken = await moov.generateToken([SCOPES.BANK_ACCOUNTS_READ,
      SCOPES.BANK_ACCOUNTS_WRITE], moovAccountId);

    // Body for the API call to Skyflow Connections. The individual values here are tokens.
    const body = {
      account: {
        holderName: shopperBankInformation.fields.account_holder_name,
        holderType: 'individual',
        accountNumber: shopperBankInformation.fields.bank_account_number,
        routingNumber: shopperBankInformation.fields.bank_routing_number,
        bankAccountType: 'checking'
      }
    };

    // The Skyflow API bearer token for the Skyflow Connection to Moov.
    let authToken
        = await generateBearerTokenFromCreds(process.env.CONNECTIONS_SERVICE_ACCOUNT_KEY);

    // The Connection route URL to create the Moov bank account for the shopper.
    let connectionsRouteUrl = `<REPLACE ME>`;
    try {
      const response = await axios.post(connectionsRouteUrl, body, { 
        headers: {
          'Content-Type': 'application/json',
          'X-Skyflow-Authorization': authToken.accessToken,
          'Authorization': 'Bearer ' + moovAuthToken.token,
          'Origin': process.env.MOOV_DOMAIN
        }
      });
    } catch(e) {
      console.dir(JSON.stringify(e));
    }

    res.send({ ok: true });
  }, ironOptions,
);