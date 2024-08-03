import axios from 'axios';

const baseUrl = 'https://link-chat-server.onrender.com';

export const addUser = async (from, to) => {
  try {
    await axios.post(`${baseUrl}/addUser`, { from, to });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (from, to) => {
  try {
    await axios.post(`${baseUrl}/deleteuser`, { from, to });
  } catch (error) {
    throw new Error(error.message);
  }
};
