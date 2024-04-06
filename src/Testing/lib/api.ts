import axios from "axios";
import { Authorize } from "../Prerrequisites/Authorize";

export const flyEaseApi = axios.create({
  baseURL: "https://flyeasemanager.site/FlyEaseApi/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
flyEaseApi.interceptors.request.use(
    async (config) => {
        const token = await Authorize("Aisaac", "isaacdavid1234");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
