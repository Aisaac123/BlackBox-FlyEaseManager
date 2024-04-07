import {RandomString} from "../../Utils/RamdomString.ts";
import {GetLastItem} from "../../Utils/GetLastItem.ts";
import {UpdateRequest} from "../../Utils/UpdateRequest.ts";

describe("Test Actualizar Region", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_ActualizarRegion_Correctly", async () => {

            const pais = await GetLastItem("Paises");
            const data = {
                nombre: RandomString(10),
                pais,
            };

            const newData = {
                nombre: RandomString(20),
                pais,
            }
            await UpdateRequest("Regiones", "idregion", data, newData)
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
        test("CPU_02_ActualizarRegion_VoidName", async () => {
            const pais = await GetLastItem("Paises");
            const data = {
                nombre: RandomString(10),
                pais,
            };

            const newData = {
                nombre: "",
                pais,
            }

            await UpdateRequest("Regiones", "idregion", data, newData)
                .then(async (response) => {
                    expect(response.status).toBe( 409 || 500);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    } else {
                        throw error;
                    }
                });
        });

        test("CPU_03_ActualizarRegion_NameHigherThan60", async () => {
            const pais = await GetLastItem("Paises");

            const data = {
                nombre: RandomString(10),
                pais,
            };

            const newData = {
                nombre: RandomString(61),
                pais,
            }

            await UpdateRequest("Regiones", "idregion", data, newData)
                .then(async (response) => {
                    expect(response.status).toBe( 409 || 500);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    } else {
                        throw error;
                    }
                });
        });

        test("CPU_04_ActualizarRegion_NullName", async () => {
            const pais = await GetLastItem("Paises");
            const data = {
                nombre: RandomString(10),
                pais,
            };

            const newData = {
                nombre: null,
                pais,
            }

            await UpdateRequest("Regiones", "idregion", data, newData)
                .then(async (response) => {
                    expect(response.status).toBe( 409);
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
})