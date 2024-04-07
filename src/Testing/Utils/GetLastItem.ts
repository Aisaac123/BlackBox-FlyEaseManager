import {Request} from "./Request.ts";

export const GetLastItem = async (model:string) => {
    try {
        const list = (await Request(`/${model}/GetAll`, "get")).data.response as object[];
        return list[list?.length - 1];
    }catch (error:any){
        if (error.isAxiosError) return error.response;
        throw error;
    }

}