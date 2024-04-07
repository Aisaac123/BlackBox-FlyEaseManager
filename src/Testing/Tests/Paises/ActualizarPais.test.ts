import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";
import {RandomString} from "../../Utils/RamdomString.ts";
import {Pais} from "../../interfaces/AirportModel.ts";

describe("Test Actualizar Pais", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_ActualizarPais_Correctly", async () => {
            const data = {
                nombre: RandomString(10),
            };

            const newData = {
                nombre: RandomString(10),
            }
            const newCountry = (await Request("/Paises/Post", "post", data)).data.response as Pais

            await Request(`/Paises/Put/${newCountry.idpais}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idpais', data, 'Paises');
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

            const newCountry = (await Request("/Paises/Post", "post", data)).data.response as Pais

            await Request(`/Paises/Put/${newCountry.idpais}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idpais', data, 'Paises');
                    expect(response.status).toBe(401 || 404 || 409 || 500);
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

        test("CPU_03_ActualizarPais_NameHigherThan60", async () => {
            const data = {
                nombre: RandomString(10),
            };

            const newData = {
                nombre: RandomString(61),
            }

            const newCountry = (await Request("/Paises/Post", "post", data)).data.response as Pais

            await Request(`/Paises/Put/${newCountry.idpais}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idpais', data, 'Paises');
                    expect(response.status).toBe(401 || 404 || 409 || 500);
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

        test("CPU_04_ActualizarPais_NullName", async () => {
            const data = {
                nombre: RandomString(10),
            };

            const newData = {
                nombre: null,
            }

            const newCountry = (await Request("/Paises/Post", "post", data)).data.response as Pais

            await Request(`/Paises/Put/${newCountry.idpais}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idpais', data, 'Paises');
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