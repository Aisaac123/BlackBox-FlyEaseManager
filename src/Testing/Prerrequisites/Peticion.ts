import {Autorize} from "./Autorize.ts";
import axios, {AxiosResponse} from "axios";
import {ModelResponse} from "../interfaces/ModelsResponse.ts";
import {AxiosErrorResponse} from "../interfaces/AxiosErrorResponse.ts";

export const Peticion = async (endpoint:string, tipo:string, data:object | null = null ):Promise<AxiosResponse<ModelResponse>> => {
    const token = await Autorize('Aisaac', 'isaacdavid1234')


    if(token === "error")
        return new Promise((_, reject) => {
            const errorResponse: AxiosErrorResponse = {
                data: { mensaje: "Error en la autorizacion.", success: false },
                status: 0,
                statusText: ""
            };
            reject(errorResponse);
        });


    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    if(tipo === "post") return await axios.post(` https://www.flyeasemanager.site/FlyEaseApi/${endpoint}`, data, config);
    else if (tipo === "put") return await axios.put(` https://www.flyeasemanager.site/FlyEaseApi/${endpoint}`, data, config);
    else if (tipo === "delete") return await axios.delete(` https://www.flyeasemanager.site/FlyEaseApi/${endpoint}`, config);


    return new Promise((_, reject) => {
        const errorResponse: AxiosErrorResponse = {
            data: { mensaje: "Error en el tipo de método.", success: false },
            status: 0,
            statusText: ""
        };
        reject(errorResponse);
    });

};