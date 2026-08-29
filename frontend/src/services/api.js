import axios from "axios";

const API = axios.create({
  baseURL: "https://shopnest-backendnode-server-js.onrender.com/api",
});

export default API;