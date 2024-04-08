import {Request} from "./Request.ts";

export const DeleteRequest = async (
    model: string,
    idProperty: string,
    data: object,
) => {
    try {
        const item  = (await Request(`/${model}/Post`, "post", data)).data
        //@ts-ignore
        return Request(`/Paises/Delete/${item.response[idProperty]}`, "delete")
    }catch (error:any){
        if (error.isAxiosError) return error.response;
        else throw error;
    }

}