import axios from 'axios';

const BASE_URL = 'https://tu-backend.com/api'; // cambia por tu URL real

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/login/`, { email, password });
    // puedes guardar el token con AsyncStorage si lo necesitas
    return true;
  } catch (err) {
    return false;
  }
};

export const registerUser = async (email, password) => {
  try {
    await axios.post(`${BASE_URL}/register/`, { email, password });
    return true;
  } catch (err) {
    return false;
  }
};
