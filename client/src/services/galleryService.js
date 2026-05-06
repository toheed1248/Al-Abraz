import API from "./api";

/* =========================================================
   🔥 NORMALIZER
========================================================= */

const normalize = (res) => {

  /*
  ARRAY DIRECT
  */
  if (Array.isArray(res)) {
    return res;
  }

  /*
  data:[]
  */
  if (Array.isArray(res?.data)) {
    return res.data;
  }

  /*
  data.data:[]
  */
  if (Array.isArray(res?.data?.data)) {
    return res.data.data;
  }

  return [];
};

/* =========================================================
   🔥 TOKEN HELPER
========================================================= */

const authHeader = () => {

  const token =
    localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

/* =========================================================
   🔥 GET IMAGES
========================================================= */

export const getImages =
  async () => {

    try {

      const res =
        await API.get("/gallery");

      return normalize(res.data);

    } catch (err) {

      console.error(
        "GET ERROR:",
        err
      );

      return [];
    }
  };

/* =========================================================
   🔥 UPLOAD PROJECT
========================================================= */

export const uploadImage =
  async (data) => {

    try {

      const res =
        await API.post(
          "/gallery/upload",
          data,
          {
            headers: {
              ...authHeader(),

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return res.data;

    } catch (err) {

      console.error(
        "UPLOAD ERROR:",
        err
      );

      throw (
        err.response?.data || {
          msg: "Upload failed",
        }
      );
    }
  };

/* =========================================================
   🔥 DELETE PROJECT
========================================================= */

export const deleteImage =
  async (id) => {

    try {

      const res =
        await API.delete(
          `/gallery/${id}`,
          {
            headers:
              authHeader(),
          }
        );

      return res.data;

    } catch (err) {

      console.error(
        "DELETE ERROR:",
        err
      );

      throw (
        err.response?.data || {
          msg: "Delete failed",
        }
      );
    }
  };

/* =========================================================
   🔥 UPDATE PROJECT
========================================================= */

export const updateImage =
  async (id, data) => {

    try {

      const res =
        await API.put(
          `/gallery/${id}`,
          data,
          {
            headers: {
              ...authHeader(),

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return res.data;

    } catch (err) {

      console.error(
        "UPDATE ERROR:",
        err
      );

      throw (
        err.response?.data || {
          msg: "Update failed",
        }
      );
    }
  };