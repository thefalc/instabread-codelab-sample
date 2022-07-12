const { ironOptions } = require('../../util/ironOptions');
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
  /**
   * Returns the current shopper's Skyflow ID.
   */
  async function handler(req, res) {
    const user = req.session.user;
    let skyflowId = user.fields.skyflow_id;

    res.send({ skyflowId });
  }, ironOptions,
);