import axios from "axios";

const API = axios.create({
  baseURL: "https://zeuss-fitness-studio-website-1.onrender.com/api",
});

export default API;