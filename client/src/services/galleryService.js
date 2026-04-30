import API from "./api";

/* ================= GET ================= */
export const getImages = () => API.get("/gallery");

/* ================= UPLOAD ================= */
export const uploadImage = (data) =>
  API.post("/gallery/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* ================= DELETE ================= */
export const deleteImage = (id) =>
  API.delete(`/gallery/${id}`);

/* ================= UPDATE ================= */
export const updateImage = (id, data) =>
  API.put(`/gallery/${id}`, data);