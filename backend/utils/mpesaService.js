import axios from 'axios'
import qs from 'qs'

const mpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  shortcode: process.env.MPESA_SHORTCODE,
  lipaNaMpesaOnlinePasskey: process.env.MPESA_PASSKEY,
  environment: process.env.MPESA_ENVIRONMENT || 'sandbox', // 'sandbox' or 'production'
  baseUrl: process.env.MPESA_ENVIRONMENT === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke'
}

let accessToken = null
let tokenExpiry = null

async function getAccessToken() {
  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    return accessToken
  }
  const auth = Buffer.from(`${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`).toString('base64')
  try {
    const response = await axios.get(`${mpesaConfig.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    })
    accessToken = response.data.access_token
    tokenExpiry = new Date(new Date().getTime() + (response.data.expires_in - 60) * 1000) // expire 60s earlier
    return accessToken
  } catch (error) {
    console.error('Failed to get M-Pesa access token:', error.response?.data || error.message)
    throw error
  }
}

function getTimestamp() {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)
  const second = ('0' + date.getSeconds()).slice(-2)
  return `${year}${month}${day}${hour}${minute}${second}`
}

function getPassword(shortcode, passkey, timestamp) {
  const dataToEncode = shortcode + passkey + timestamp
  return Buffer.from(dataToEncode).toString('base64')
}

async function initiateSTKPush(phoneNumber, amount, accountReference, transactionDesc, callbackUrl) {
  const token = await getAccessToken()
  const timestamp = getTimestamp()
  const password = getPassword(mpesaConfig.shortcode, mpesaConfig.lipaNaMpesaOnlinePasskey, timestamp)

  const payload = {
    BusinessShortCode: mpesaConfig.shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: mpesaConfig.shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackUrl,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc
  }

  try {
    const response = await axios.post(`${mpesaConfig.baseUrl}/mpesa/stkpush/v1/processrequest`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to initiate STK Push:', error.response?.data || error.message)
    throw error
  }
}

export {
  initiateSTKPush
}
