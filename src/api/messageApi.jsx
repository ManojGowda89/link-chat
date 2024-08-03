import axios from 'axios';

const baseUrl = 'https://link-chat-server.onrender.com';

export const fetchMessages = async (from, to) => {
  if (!from || !to) return [];

  try {
    const response = await axios.get(`${baseUrl}/receive`, {
      params: { from, to },
    });
    return response.data.messages || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const sendMessage = async (from, to, message) => {
  try {
    await axios.post(`${baseUrl}/send`, { from, to, message });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const clearMessages = async (from, to) => {
  try {
    await axios.post(`${baseUrl}/clear`, { from, to });
  } catch (error) {
    console.error('Error clearing messages:', error);
  }
};
