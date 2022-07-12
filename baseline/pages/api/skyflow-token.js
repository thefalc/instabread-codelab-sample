const { ironOptions } = require('../../util/ironOptions');
import { withIronSessionApiRoute } from 'iron-session/next';
const { generateBearerTokenFromCreds } = require('skyflow-node');

/**
 * Used by the front-end application to get a valid Skyflow auth token.
 */
export default withIronSessionApiRoute(
  async function handler(req, res) {
    let authToken = await generateBearerTokenFromCreds(process.env.SERVICE_ACCOUNT_KEY);

    res.send({ accessToken: authToken.accessToken });
  }, ironOptions,
);