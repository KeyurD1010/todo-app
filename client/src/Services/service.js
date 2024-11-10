import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const fetchTasks = async (token) => {
  return axios.get(`${API_URL}/tasks/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = async (taskData, token) => {
  return axios.post(`${API_URL}/tasks/`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (id, taskData, token) => {
  return axios.put(`${API_URL}/tasks/${id}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = async (id, token) => {
  return axios.delete(`${API_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
