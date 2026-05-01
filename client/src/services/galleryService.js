import API from "./api";

/* 🔥 SAFE RESPONSE HANDLER */
const handleResponse = (res) => {
  // backend structure: { success: true, data: [...] }
  return res?.data?.data || [];
};

/* 🔥 SAFE ERROR HANDLER */
const handleError = (err) => {
  console.error("API ERROR:", err);

  if (err.response) {
    // server responded
    throw err.response.data?.msg || "Server error";
  } else if (err.request) {
    // no response
    throw "Network error (server not responding)";
  } else {
    throw err.message || "Unexpected error";
  }
};

/* ================= GET ================= */
export const getImages = async () => {
  try {
    const res = await API.get("/gallery");
    return handleResponse(res);
  } catch (err) {
    handleError(err);
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
    handleError(err);
  }
};

/* ================= DELETE ================= */
export const deleteImage = async (id) => {
  try {
    const res = await API.delete(`/gallery/${id}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

/* ================= UPDATE ================= */
export const updateImage = async (id, data) => {
  try {
    const res = await API.put(`/gallery/${id}`, data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};