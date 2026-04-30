import API from "./api";

export const loginAdmin = async (data) => {
  try {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    throw err.response?.data?.msg || "Login failed";
  }
};