import {Request} from "./Request.ts";
import {Exist} from "./Exist.ts";

export const UpdateRequest = async (
    model: string,
    idProperty: string,
    data: object,
    newData: object
) => {
    try {
        const dataObject = (await Request(`/${model}/Post`, "post", data)).data;
        //@ts-ignore
        const response = await Request(`/Paises/Put/${dataObject.response[idProperty]}`, "put", newData)
        if(dataObject.success)
            await Exist.ifExistDelete(idProperty, data, model);
        if(response.data.success)
            await Exist.ifExistDelete(idProperty, newData, model);
        return response;
    }catch (error:any){
        if (error.isAxiosError) return error.response;
        else throw error;
    }

}