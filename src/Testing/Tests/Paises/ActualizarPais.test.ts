import {Exist} from "../../Utils/Exist.ts";
import {RandomString} from "../../Utils/RamdomString.ts";
import {UpdateRequest} from "../../Utils/UpdateRequest.ts";

describe("Test Actualizar Pais", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_ActualizarPais_Correctly", async () => {
            const data = {
                nombre: RandomString(10),
            };

            const newData = {
                nombre: RandomString(10),
            }

            await UpdateRequest("Paises", "idpais", data, newData)
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
        test("CPU_02_ActualizarPais_VoidName", async () => {
            const data = {
                nombre: RandomString(10),
            };

            const newData = {
                nombre: "",
            }

            await UpdateRequest("Paises", "idpais", data, newData)
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

        test("CPU_03_ActualizarPais_NameHigherThan60", async () => {
            const data = {
                nombre: RandomString(10),
            };

            const newData = {
                nombre: RandomString(61),
            }

            await UpdateRequest("Paises", "idpais", data, newData)
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

        test("CPU_04_ActualizarPais_NullName", async () => {
            const data = {
                nombre: RandomString(10),
            };

            const newData = {
                nombre: null,
            }

            await UpdateRequest("Paises", "idpais", data, newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idpais', data, 'Paises');
                    expect(response.status).toBe(  409);
                })
                .catch(async (error) => {
                    if (error.isAxiosError) {
                        console.log(error.status);
                        expect(error.status).toBe( 409);
                    } else {
                        throw error;
                    }
                });
        });
    });
})