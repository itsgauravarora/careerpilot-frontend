import axios from "axios";

const API = axios.create({
  baseURL: "https://careerpilot-backend-1.onrender.com/api",
});

export default API;