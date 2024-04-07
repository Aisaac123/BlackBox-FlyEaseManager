import { Request } from "../../Utils/Request.ts";
import { RandomString } from "../../Utils/RamdomString.ts";
import {Ciudad, Region} from "../../interfaces/AirportModel.ts";

describe("Test Eliminar Ciudad", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        // Deberia de ser ingresado correctamente
        test("CPU_01_ELiminarCiudad_Correctly", async () => {
            const regions = (await Request("/Regiones/GetAll", "get")).data.response as Region[];
            const cities = (await Request("/Ciudades/GetAll", "get")).data.response as Ciudad[];
            const lastRegion : Region = regions[regions?.length - 1];
            const lastCity : Ciudad = cities[cities?.length - 1];
            const data: Ciudad = {
                idciudad: 0,
                imagen: lastCity.imagen,
                nombre: RandomString(10),
                fecharegistro: new Date(),
                region: lastRegion,
            };
            const ciudad  = (await Request("/Ciudades/Post", "post", data)).data.response as Ciudad;
            await Request(`/Regiones/Delete/${ciudad.idciudad}`, "delete", null)
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
        test("CPU_02_ELiminarCiudad_IdZero", async () => {
            await Request(`/Ciudades/Delete/0`, "delete", null)
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
        test("CPU_03_ELiminarCiudad_IdHigherThan9999", async () => {
            await Request(`/Ciudades/Delete/10000`, "delete", null)
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
        test("CPU_04_ELiminarCiudad_IdNull", async () => {
            await Request(`/Ciudades/Delete/`, "delete", null)
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
        test("CPU_05_ELiminarCiudad_IdNaN", async () => {
            await Request(`/Ciudades/Delete/as#asd@`, "delete", null)
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
