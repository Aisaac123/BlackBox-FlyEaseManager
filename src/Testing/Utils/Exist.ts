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

                        // @ts-ignore
                        if (typeof data[key] === "object" && typeof item[key] === "object") {
                            // @ts-ignore
                            const allNestedPropertiesMatch = this.compareObjects(data[key], item[key]);
                            if (!allNestedPropertiesMatch) {
                                allPropertiesMatch = false;
                                break;
                            }
                        } else {
                            // @ts-ignore
                            if (data[key] !== item[key]) {
                                allPropertiesMatch = false;
                                break;
                            }
                        }
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

    private static compareObjects(obj1: object, obj2: object): boolean {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key in obj1) {
            //@ts-ignore
            const value1 = obj1[key];
            //@ts-ignore
            const value2 = obj2[key];

            if (typeof value1 === "object" && typeof value2 === "object") {
                if (!this.compareObjects(value1, value2)) {
                    return false;
                }
            } else if (value1 !== value2) {
                return false;
            }
        }

        return true;
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


}
