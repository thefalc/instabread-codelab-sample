const { ironOptions } = require('../../util/ironOptions');
import { withIronSessionApiRoute } from 'iron-session/next';

/**
 * Saves the shopper tokenized data into a session object. This would typically be saved into an
 * downstream application database, but for simplicity, the session is used here.
 */
export default withIronSessionApiRoute(
  async function handler(req, res) {
    let shopper = req.body;

    // Save shopper's Skyflow ID and tokenized data into the session for reference later.
    req.session.user = {
      fields: shopper.fields
    };
    await req.session.save();

    res.send({ ok: true });
  }, ironOptions,
);