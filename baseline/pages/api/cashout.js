const { ironOptions } = require('../../util/ironOptions');
import { withIronSessionApiRoute } from 'iron-session/next';
import { Moov, SCOPES } from '@moovio/node';
const axios = require('axios');

const moov = new Moov({
  accountID: process.env.MOOV_BUSINESS_ACCOUNT_ID,
  publicKey: process.env.MOOV_PUBLIC_KEY,
  secretKey: process.env.MOOV_SECRET_KEY,
  domain: process.env.MOOV_DOMAIN
});

export default withIronSessionApiRoute(
  /**
   * Moves money from the Instabread business account into the Instabread shopper account.
   */
  async function handler(req, res) {
    // TODO: Insert code here.

    res.send({ ok: true });
  }, ironOptions,
);

/**
 * Uses the Moov payment methods API to get the payment method IDs required for carrying out a
 * transaction.
 * @param {string} accountId The account owner Moov ID.
 * @param {string} paymentMethodType The payment method type to match on.
 * @returns A payment method ID that matches the paymentMethodType.
 */
async function getPaymentMethodId(accountId, paymentMethodType) {
  let apiUrl = `https://api.moov.io/accounts/${accountId}/payment-methods`;
  try {
    let moovAuthToken = await moov.generateToken([SCOPES.PAYMENT_METHODS_READ], accountId);

    const response = await axios.get(apiUrl, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + moovAuthToken.token,
        'Origin': process.env.MOOV_DOMAIN
      }
    });

    // Loop over the result and match on the payment method type.
    for(let i = 0; i < response.data.length; i++) {
      if(response.data[i].paymentMethodType === paymentMethodType) {
        return response.data[i].paymentMethodID;
      }
    }
  } catch(e) {
    console.dir(JSON.stringify(e));
  }

  return false;
}