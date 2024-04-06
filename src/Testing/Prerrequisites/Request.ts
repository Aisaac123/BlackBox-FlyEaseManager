import {Authorize} from "./Authorize.ts";
import axios, {AxiosResponse} from "axios";
import {ModelResponse} from "../interfaces/ModelsResponse.ts";

export const Request = async (endpoint: string, tipo: string, data: object | null = null): Promise<AxiosResponse<ModelResponse>> => {
    try {
        const token = await Authorize('Aisaac', 'isaacdavid1234');

        if (token === "error") {
            throw new Error("Error en la autorización.");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        switch (tipo) {
            case "post":
                return await axios.post(`https://www.flyeasemanager.site/FlyEaseApi/${endpoint}`, data, config);
            case "put":
                return await axios.put(`https://www.flyeasemanager.site/FlyEaseApi/${endpoint}`, data, config);
            case "delete":
                return await axios.delete(`https://www.flyeasemanager.site/FlyEaseApi/${endpoint}`, config);
            default:
                throw new Error("Error en el tipo de método.");
        }
    } catch (error) {
        // @ts-ignore
        const status = error.response?.status || 0;
        return Promise.reject({
            // @ts-ignore
            data: { mensaje: error.message, success: false },
            status,
            statusText: "",
        });
    }
};
