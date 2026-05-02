import API from "./api";

/* 🔥 NORMALIZER (SAFE FOR ALL RESPONSES) */
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

    const data = normalize(res.data);

    // 🔥 ensure gallery array always exists
    return data.map(item => ({
      ...item,
      gallery: item.gallery || [],
      coverImage: item.coverImage || item.gallery?.[0]?.url || ""
    }));

  } catch (err) {
    console.error("GET ERROR:", err);
    return [];
  }
};

/* ================= UPLOAD (MULTI IMAGE) ================= */
export const uploadImage = async (formData) => {
  try {
    const res = await API.post("/gallery/upload", formData);
    return res.data;
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    throw err;
  }
};

/* ================= DELETE PROJECT ================= */
export const deleteImage = async (id) => {
  try {
    const res = await API.delete(`/gallery/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE ERROR:", err);
    throw err;
  }
};

/* ================= DELETE SINGLE IMAGE ================= */
export const deleteSingleImage = async (projectId, imageId) => {
  try {
    const res = await API.delete(
      `/gallery/${projectId}/image/${imageId}`
    );
    return res.data;
  } catch (err) {
    console.error("DELETE SINGLE ERROR:", err);
    throw err;
  }
};

/* ================= UPDATE (ADD IMAGES + TEXT) ================= */
export const updateImage = async (id, formData) => {
  try {
    const res = await API.put(`/gallery/${id}`, formData);
    return res.data;
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    throw err;
  }
};