import express from 'express'
import { initiateSTKPush } from '../utils/mpesaService.js'

const router = express.Router()

// In-memory store for payment statuses (for demo purposes)
const paymentStatuses = {}

// GET /api/mpesa/config
router.get('/config', (req, res) => {
  const config = {
    consumerKeySet: !!process.env.MPESA_CONSUMER_KEY,
    consumerSecretSet: !!process.env.MPESA_CONSUMER_SECRET,
    shortcodeSet: !!process.env.MPESA_SHORTCODE,
    passkeySet: !!process.env.MPESA_PASSKEY,
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox'
  }
  res.json({ success: true, config })
})

// POST /api/mpesa/stkpush
router.post('/stkpush', async (req, res) => {
  let { phoneNumber, amount, accountReference, transactionDesc } = req.body;

  if (!phoneNumber || !amount) {
    return res.status(400).json({ success: false, message: 'phoneNumber and amount are required' });
  }

  // ✅ Normalize phone number
  if (phoneNumber.startsWith('0')) {
    phoneNumber = '254' + phoneNumber.slice(1);
  } else if (phoneNumber.startsWith('+')) {
    phoneNumber = phoneNumber.replace('+', '');
  }

  try {
    // ✅ HERE is where you add this line
    const callbackUrl = process.env.MPESA_CALLBACK_URL || `${req.protocol}://${req.get('host')}/api/mpesa/callback`;

    const response = await initiateSTKPush(
      phoneNumber,
      amount,
      accountReference || 'Appointment',
      transactionDesc || 'Payment for appointment',
      callbackUrl
    );

    if (response.CheckoutRequestID) {
      paymentStatuses[response.CheckoutRequestID] = 'Pending';
    }

    res.json({ success: true, data: response });

  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate STK Push',
      error: error.response?.data || error.message
    });
  }
});



// POST /api/mpesa/callback
// mpesaRoute.js
router.post('/callback', async (req, res) => {
    try {
        console.log('M-Pesa callback received:', JSON.stringify(req.body));
        //  ... your callback processing logic here ...
        const resultCode = req.body.Body?.stkCallback?.ResultCode;
        const checkoutRequestID = req.body.Body?.stkCallback?.CheckoutRequestID;

         if (checkoutRequestID) {
            //  Conceptual database update
            //  Replace this with your actual database logic
            // await updatePaymentStatus(checkoutRequestID, resultCode);
         }

        res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' }); //  IMPORTANT:  Always send this!

    } catch (error) {
        console.error('Error processing M-Pesa callback:', error);
        //  Log the error to a file or logging service (recommended)
        //  Do NOT send a non-200 response to M-Pesa here!
        res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' }); //  Keep M-Pesa happy.
    }
});


// GET /api/mpesa/status/:checkoutRequestID
router.get('/status/:checkoutRequestID', (req, res) => {
  const { checkoutRequestID } = req.params
  const status = paymentStatuses[checkoutRequestID]
  if (!status) {
    return res.status(404).json({ success: false, message: 'Payment status not found' })
  }
  res.json({ success: true, status })
})

export default router
