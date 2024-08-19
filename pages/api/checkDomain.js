import axios from 'axios';

const API_BASE_URL = process.env.GODADDY_API_ENVIRONMENT === 'production'
  ? 'https://api.godaddy.com'
  : 'https://api.ote-godaddy.com';

export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: 'Domain parameter is required' });
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/v1/domains/available?domain=${domain}`, {
      headers: {
        'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`,
        'Accept': 'application/json'
      }
    });

    res.status(200).json({ available: response.data.available });
  } catch (error) {
    console.error('Error checking domain availability:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error checking domain availability',
      details: error.response?.data || error.message,
      environment: process.env.GODADDY_API_ENVIRONMENT
    });
  }
}