import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .post(`${API_URL}/auth/register`, userData, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred during Fetching Menus:", error);
      throw error;
    });
};

export const loginUser = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .post(`${API_URL}/auth/login`, userData, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred during Fetching Menus:", error);
      throw error;
    });
};

export const fetchTasks = async (token) => {
  const t = localStorage.getItem("token");
  return axios.get(`${API_URL}/tasks/`, {
    headers: {
      Authorization: `Bearer ${t}`,
    },
  });
};

export const createTask = async (taskData, user) => {
  const t = localStorage.getItem("token");
  return axios.post(`${API_URL}/tasks/`, taskData, {
    headers: {
      Authorization: `Bearer ${t}`,
    },
  });
};

export const updateTask = async (id, taskData, token) => {
  const t = localStorage.getItem("token");
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
