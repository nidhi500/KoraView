import axios from "axios";

const API_URL = "http://localhost:5000";

// Auth
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

// Monasteries
export const getMonasteries = () => axios.get(`${API_URL}/monasteries`);
export const createMonastery = (data, token) =>
  axios.post(`${API_URL}/monasteries`, data, { headers: { Authorization: `Bearer ${token}` }});
export const approveMonastery = (id, token) =>
  axios.put(`${API_URL}/monasteries/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }});
