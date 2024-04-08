import { Request } from "../../Utils/Request.ts";
import { RandomString } from "../../Utils/RamdomString.ts";
import { Pais } from "../../interfaces/AirportModel.ts";

describe("Test Eliminar Pais", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        // Deberia de ser ingresado correctamente
        test("CPU_01_ELiminarPais_Correctly", async () => {
            const data = {
                nombre: RandomString(6),
            };
            const pais  = (await Request("/Paises/Post", "post", data)).data.response as Pais
            await Request(`/Paises/Delete/${pais.idpais}`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(200);
                    console.log(response.status);
                })
                .catch((error) => {
                    expect(error.status).toBe(200);
                    console.log(error.status);
                });
        });
    });

    describe("Casos de prueba: Clases de equivalencia invalidas", () => {
        test("CPU_02_ELiminarPais_IdZero", async () => {
            await Request(`/Paises/Delete/0`, "delete", null)
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
        test("CPU_03_ELiminarPais_IdHigherThan9999", async () => {
            await Request(`/Paises/Delete/10000`, "delete", null)
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
        test("CPU_04_ELiminarPais_IdNull", async () => {
            await Request(`/Paises/Delete/`, "delete", null)
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
        test("CPU_05_ELiminarPais_IdNaN", async () => {
            await Request(`/Paises/Delete/as#asd@`, "delete", null)
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
