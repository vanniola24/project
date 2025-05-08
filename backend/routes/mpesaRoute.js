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
  const { phoneNumber, amount, accountReference, transactionDesc } = req.body
  if (!phoneNumber || !amount) {
    return res.status(400).json({ success: false, message: 'phoneNumber and amount are required' })
  }
  try {
    const callbackUrl = `${req.protocol}://${req.get('host')}/api/mpesa/callback`
    const response = await initiateSTKPush(phoneNumber, amount, accountReference || 'Appointment', transactionDesc || 'Payment for appointment', callbackUrl)
    // Store the CheckoutRequestID to track status
    if (response.CheckoutRequestID) {
      paymentStatuses[response.CheckoutRequestID] = 'Pending'
    }
    res.json({ success: true, data: response })
  } catch (error) {
    console.error('Failed to initiate STK Push:', error)
    res.status(500).json({ success: false, message: 'Failed to initiate STK Push', error: error.response?.data || error.message || error.toString() })
  }
})

// POST /api/mpesa/callback
router.post('/callback', (req, res) => {
  // M-Pesa will send payment confirmation here
  const callbackData = req.body
  console.log('M-Pesa payment callback received:', JSON.stringify(callbackData))

  // Extract CheckoutRequestID and ResultCode
  const resultCode = callbackData.Body?.stkCallback?.ResultCode
  const checkoutRequestID = callbackData.Body?.stkCallback?.CheckoutRequestID

  if (checkoutRequestID) {
    paymentStatuses[checkoutRequestID] = resultCode === 0 ? 'Success' : 'Failed'
  }

  // Respond with 200 OK to M-Pesa
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' })
})

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
