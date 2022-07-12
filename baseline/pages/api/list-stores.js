const { ironOptions } = require('../../util/ironOptions');
import { withIronSessionApiRoute } from 'iron-session/next';

// Hardcoded store list. Represents data from a database, but for simplicity is hardcoded into
// this sample application.
const stores = [
  {
    store_id: 1,
    store_name: 'Safeway',
    street_address: '1343 Taravel Street',
    city: 'San Francisco',
    state: 'California',
    zip_code: '94113'
  },
  {
    store_id: 2,
    store_name: 'Lucky\'s Supermarket',
    street_address: '4502 Sloat Avenue',
    city: 'San Francisco',
    state: 'California',
    zip_code: '94113'
  },
  {
    store_id: 3,
    store_name: 'Wholefoods',
    street_address: '457 Water Street',
    city: 'San Francisco',
    state: 'California',
    zip_code: '94113'
  },
  {
    store_id: 4,
    store_name: 'Trader Joes',
    street_address: '96523 John Daly',
    city: 'San Francisco',
    state: 'California',
    zip_code: '94113'
  },
]

export default withIronSessionApiRoute(
  /**
   * Returns the potential stores available for the shopper to shop at.
   * For simplicity of this sample, the stores are hardcoded within this file.
   */
  async function handler(req, res) {
    res.send({ stores });
  }, ironOptions,
);