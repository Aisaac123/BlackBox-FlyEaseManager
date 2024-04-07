import { Request } from "../../Utils/Request.ts";
import { RandomString } from "../../Utils/RamdomString.ts";
import {Pais, Region} from "../../interfaces/AirportModel.ts";

describe("Test Eliminar Region", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        // Deberia de ser ingresado correctamente
        test("CPU_01_ELiminarRegion_Correctly", async () => {
            const countries = (await Request("/Paises/GetAll", "get")).data.response as Pais[];
            const lastCountry : Pais = countries[countries?.length - 1];
            const data: Region = {
                idregion: 0,
                nombre: RandomString(10),
                fecharegistro: new Date(),
                pais: lastCountry,
            };
            const region  = (await Request("/Regiones/Post", "post", data)).data.response as Region
            await Request(`/Regiones/Delete/${region.idregion}`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(200);
                    console.log(response.status);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe(200);
                    } else {
                        throw error;
                    }
                });
        });
    });

    describe("Casos de prueba: Clases de equivalencia invalidas", () => {
        // Deberia de fallar, ID 0
        test("CPU_02_ELiminarRegion_IdZero", async () => {
            await Request(`/Regiones/Delete/0`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(409 || 500);
                    console.log(response.status);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    }else{
                        throw error;
                    }
                });
        });

        // Deberia de fallar, ID mayor a 9999
        test("CPU_03_ELiminarRegion_IdHigherThan9999", async () => {
            await Request(`/Regiones/Delete/10000`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(409 || 500);
                    console.log(response.status);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    }else{
                        throw error;
                    }
                });
        });

        // Deberia de fallar, ID null
        test("CPU_04_ELiminarRegion_IdNull", async () => {
            await Request(`/Regiones/Delete/`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(404 || 409 || 500);
                    console.log(response.status);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    }else{
                        throw error;
                    }
                });
        });

        // Deberia de fallar, ID Not A Number
        test("CPU_05_ELiminarRegion_IdNaN", async () => {
            await Request(`/Regiones/Delete/as#asd@`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(400 || 409 || 500);
                    console.log(response.status);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    }else{
                        throw error;
                    }
                });
        });
    });
});
