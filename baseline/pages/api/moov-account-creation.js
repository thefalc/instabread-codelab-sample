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
 * Creates a Moov account for the shopper using the stored tokens for the shopper's first name,
 * last name, and email. The tokens are sent to a Skyflow connection and the connection
 * detokenizes the tokens and passes the values securely to Moov to register the account.
 */
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const shopper = req.session.user;

    // Body for the API call to Skyflow connections. The individual values here are tokens.
    const body = {
      accountType: 'individual',
      capabilities: ['transfers'],
      profile: {
        individual: {
          name: {
            firstName: shopper.fields.first_name,
            lastName: shopper.fields.last_name
          },
          email: shopper.fields.email
        }
      }
    };

    // Generate Moov auth token, this is a passthrough for the Skyflow Connection call.
    let moovAuthToken = await moov.generateToken([SCOPES.ACCOUNTS_CREATE]);

    // The Skyflow API bearer token for the Skyflow connection to Moov.
    let authToken
        = await generateBearerTokenFromCreds(process.env.CONNECTIONS_SERVICE_ACCOUNT_KEY);

    // The connection route URL to create the Moov account.
    let connectionsRouteUrl = '<REPLACE ME>';
    try {
      const response = await axios.post(connectionsRouteUrl, body, { 
        headers: {
          'Content-Type': 'application/json',
          'X-Skyflow-Authorization': authToken.accessToken,
          'Authorization': 'Bearer ' + moovAuthToken.token,
          'Origin': process.env.MOOV_DOMAIN
        }
      });

      // Save the Moov account ID to the session.
      req.session.moovAccountId = response.data.accountID;
      await req.session.save();
    } catch(e) {
      console.dir(e);
    }

    res.send({ ok: true });
  }, ironOptions,
);