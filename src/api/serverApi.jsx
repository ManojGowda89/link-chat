import axios from 'axios';

const baseUrl = 'https://test-mylv.onrender.com';

export const pingServer = async () => {
  try {
    const response = await axios.get(`${baseUrl}/ping`);
    return response.data === 'pong';
  } catch (error) {
    console.error('Error pinging server:', error);
    return false;
  }
};
