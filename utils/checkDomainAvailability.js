import axios from 'axios';

export async function checkDomainAvailability(name) {
  try {
    const response = await axios.get(`/api/checkDomain?domain=${name}.com`);
    return response.data.available;
  } catch (error) {
    console.error('Error checking domain availability:', error);
    return null;
  }
}