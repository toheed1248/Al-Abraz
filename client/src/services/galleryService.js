import API from "./api";

/* 🔥 NORMALIZER (ADMIN + USER SAME DATA) */
const normalize = (res) => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  return [];
};

/* ================= GET ================= */
export const getImages = async () => {
  try {
    const res = await API.get("/gallery");
    return normalize(res.data); // 🔥 ALWAYS ARRAY
  } catch (err) {
    console.error("GET ERROR:", err);
    return [];
  }
};

/* ================= UPLOAD ================= */
export const uploadImage = async (data) => {
  try {
    const res = await API.post("/gallery/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    throw err;
  }
};

/* ================= DELETE ================= */
export const deleteImage = async (id) => {
  try {
    const res = await API.delete(`/gallery/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE ERROR:", err);
    throw err;
  }
};

/* ================= UPDATE ================= */
export const updateImage = async (id, data) => {
  try {
    const res = await API.put(`/gallery/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    throw err;
  }
};