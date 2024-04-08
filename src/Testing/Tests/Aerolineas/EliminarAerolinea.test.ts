import {RandomString} from "../../Utils/RamdomString.ts";
import {DeleteRequest} from "../../Utils/DeleteRequest.ts";
import {Request} from "../../Utils/Request.ts";
describe("Test Eliminar Aerolineas", () => {


    describe("Casos de prueba: Clases de equivalencia validas", () => {

        test("CPU_01_EliminarAerolinea_Correctly", async () => {
            const data = {
                nombre: RandomString(10),
                codigoiata: RandomString(2),
                codigoicao: RandomString(3)
            };

            await DeleteRequest("Aerolineas", "idaereolinea", data)
                .then(async (response) => {
                    expect(response.status).toBe(200);
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

        test("CPU_02_EliminarAerolinea_IdLowerThan1", async () => {


            await Request(`/Aerolineas/Delete/0`, "delete")
                .then(async (response) => {
                    expect(response.status).toBe(  409 || 500);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe( 409 || 500);
                    } else {
                        throw error;
                    }
                });
        });

        test("CPU_03_EliminarAerolinea_IdHigherThan9999", async () => {

            await Request(`/Aerolineas/Delete/124502`, "delete")
                .then(async (response) => {
                    expect(response.status).toBe(  409 || 500);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe( 409 || 500);
                    } else {
                        throw error;
                    }
                });
        });

        test("CPU_04_EliminarAerolinea_IdNull", async () => {

            await Request(`/Aerolineas/Delete/${null}`, "delete")
                .then(async (response) => {
                    expect(response.status).toBe(  400);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe( 400);
                    } else {
                        throw error;
                    }
                });
        });


        test("CPU_05_EliminarAerolinea_IdNotANumber", async () => {
            const id:string = "as#asd@";

            await Request(`/Aerolineas/Delete/${id}`, "delete")
                .then(async (response) => {
                    expect(response.status).toBe(  400);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe( 400);
                    } else {
                        throw error;
                    }
                });
        });
    });
});