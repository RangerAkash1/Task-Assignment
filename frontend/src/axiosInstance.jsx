import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

axiosInstance.defaults.headers["Authorization"] = `Bearer ${
  (JSON.parse(localStorage.getItem("token")) || null)?.access
}`;

export default axiosInstance;
