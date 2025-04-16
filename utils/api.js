import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all series
export const fetchSeries = async () => {
  const response = await api.get("/series");
  return response.data;
};

// Add new series
export const addSeries = async (seriesData) => {
  const response = await api.post("/series", seriesData);
  return response.data;
};

// Delete a series
export const deleteSeries = async (id) => {
  const response = await api.delete(`/series/${id}`);
  return response.data;
};

// Upload episode
export const uploadEpisode = async (formData) => {
  const response = await api.post("/upload-episode", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getDirectors = async () => {
    const response = await fetch(`${API_BASE_URL}/directors`);
    return response.json();
  };
  
  export const addDirector = async (director) => {
    const response = await fetch(`${API_BASE_URL}/directors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(director),
    });
    return response.json();
  };
  
  export const deleteDirector = async (id) => {
    await fetch(`${API_BASE_URL}/directors/${id}`, { method: "DELETE" });
  };
  
  export const updateDirector = async (id, director) => {
    const response = await fetch(`${API_BASE_URL}/directors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(director),
    });
    return response.json();
  };

export default api;
