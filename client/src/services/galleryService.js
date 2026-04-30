import axios from "axios";

const API = "http://localhost:5000/api/gallery";

/* 🔥 AUTO TOKEN ATTACH (BEST PRACTICE) */
const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= GET ================= */
export const getImages = () => api.get("/");

/* ================= UPLOAD ================= */
export const uploadImage = (data) =>
  api.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* ================= DELETE ================= */
export const deleteImage = (id) =>
  api.delete(`/${id}`);

/* ================= UPDATE ================= */
export const updateImage = (id, data) =>
  api.put(`/${id}`, data);