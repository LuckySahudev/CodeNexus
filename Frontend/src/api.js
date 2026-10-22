import axios from "axios";

const configuredPort = import.meta.env.PORT?.trim();
const baseURL = /^\d+$/.test(configuredPort || "")
  ? `http://localhost:${configuredPort}`
  : (configuredPort || "http://localhost:8080").replace(/\/$/, "");

const api = axios.create({ baseURL });

export default api;
