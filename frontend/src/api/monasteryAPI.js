import axios from "axios";
const API_URL = "http://localhost:5000/api";

// Auth
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);

// Monasteries
export const getMonasteries = (token) =>
  axios.get(`${API_URL}/monasteries`, { headers: { Authorization: `Bearer ${token}` } });

export const createMonastery = (data, token) =>
  axios.post(`${API_URL}/monasteries`, data, { headers: { Authorization: `Bearer ${token}` } });

export const approveMonastery = (id, token) =>
  axios.put(`${API_URL}/monasteries/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
