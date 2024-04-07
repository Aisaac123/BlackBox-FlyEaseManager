import { Request } from "./Request.ts";
import {ExistResponse} from "../interfaces/ExistResponse.ts";

export class Exist {
    /**
     Devuelve true si encontro un objeto el cual sus propiedades concuerden con su valor, false si el valor no coincide, ej:
     await Exist({nombre:Colombia}, 'Paises') busca si hay un objeto en el controlador de Paises donde el nombre === 'Colombia' devolvera true en este caso.
     En caso contrario donde no haya ningun objeto el cual su nombre === Colombia devolvera false, asi para cada propiedad del objeto
     Aplica para cualquier parametro de cualquier objeto.
     */
    public static async ExistProperties(data: object, model: string): Promise<ExistResponse> {
        try {
            const response = await Request(`${model}/GetAll`, 'get');
            const list = response.data.response as object[];
            const dataProperties = new Set(Object.keys(data));
            let foundObject: object | undefined;
            let mismatchedProperties: string[] = [];
            let ismismatched = false;
            for (const item of list) {
                let allPropertiesMatch = true;

                for (const key in data) {

                    if (!item.hasOwnProperty(key)) {
                        allPropertiesMatch = false;
                        ismismatched = true;
                    }
                    if (ismismatched) {
                        for (const key in data) {
                            if (!item.hasOwnProperty(key)) {
                                mismatchedProperties.push(key)
                            }
                        }
                        throw new Error(`Las siguientes propiedades no coinciden: ${mismatchedProperties.join(', ')}`);
                    }

                    // @ts-ignore
                    if (item[key as keyof typeof item] !== data[key] || item[key as keyof typeof item].length !== data[key].length) {
                        allPropertiesMatch = false;
                        break;
                    }

                    dataProperties.delete(key);
                }
                if(ismismatched) break;

                if (allPropertiesMatch) {
                    foundObject = item;
                    break;
                }
            }
            if(foundObject) return {success: true, data: foundObject};
            else return {success: false, data: {}};

        } catch (error: any) {
            throw new Error(error);
        }
    }
    /**
     Lo mismo que ExistProperties pero este elimina directamente si existe, pide el nombre del parametro del id del objeto para eliminar por id
     */
    public static async ifExistDelete(idProperty:string, data:object, model:string):Promise<boolean> {
        try {

            const response = await this.ExistProperties(data, model);
            if(!response.success) return false

            // @ts-ignore
            const successDelete = await Request(`${model}/Delete/${response.data[idProperty]}`, 'delete');
            return successDelete.data.success;
        } catch (error:any) {
            throw new Error(error);
        }
    }

    public static async _delete(id:string | number,model:string):Promise<boolean> {
        const successDelete = await Request(`${model}/Delete/${id}`, 'delete');
        return successDelete.data.success;
    }
}
