import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";
import {RandomString} from "../../Utils/RamdomString.ts";
import {Pais, Region} from "../../interfaces/AirportModel.ts";

describe("Test Actualizar Region", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_ActualizarRegion_Correctly", async () => {
            const countries = (await Request("/Paises/GetAll", "get")).data.response as Pais[];
            const lastCountry : Pais = countries[countries?.length - 1];
            const data: Region = {
                idregion: 0,
                nombre: RandomString(10),
                fecharegistro: new Date(),
                pais: lastCountry,
            };

            const newData: Region = {
                idregion: 0,
                nombre: RandomString(20),
                fecharegistro: new Date(),
                pais: lastCountry,
            }
            const newRegion = (await Request("/Regiones/Post", "post", data)).data.response as Region

            await Request(`/Paises/Put/${newRegion.idregion}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idregion', data, 'Regiones');
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
            const countries = (await Request("/Paises/GetAll", "get")).data.response as Pais[];
            const lastCountry : Pais = countries[countries?.length - 1];
            const data: Region = {
                idregion: 0,
                nombre: RandomString(10),
                fecharegistro: new Date(),
                pais: lastCountry,
            };

            const newData: Region = {
                idregion: 0,
                nombre: "",
                fecharegistro: new Date(),
                pais: lastCountry,
            }

            const newRegion = (await Request("/Regiones/Post", "post", data)).data.response as Region

            await Request(`/Regiones/Put/${newRegion.idregion}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idregion', data, 'Regiones');
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

        test("CPU_03_ActualizarRegion_NameHigherThan60", async () => {
            const countries = (await Request("/Paises/GetAll", "get")).data.response as Pais[];
            const lastCountry : Pais = countries[countries?.length - 1];
            const data: Region = {
                idregion: 0,
                nombre: RandomString(10),
                fecharegistro: new Date(),
                pais: lastCountry,
            };

            const newData: Region = {
                idregion: 0,
                nombre: RandomString(61),
                fecharegistro: new Date(),
                pais: lastCountry,
            }

            const newRegion = (await Request("/Regiones/Post", "post", data)).data.response as Region

            await Request(`/Regiones/Put/${newRegion.idregion}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idregion', data, 'Regiones');
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

        test("CPU_04_ActualizarRegion_NullName", async () => {
            const countries = (await Request("/Paises/GetAll", "get")).data.response as Pais[];
            const lastCountry : Pais = countries[countries?.length - 1];
            const data: Region = {
                idregion: 0,
                nombre: RandomString(10),
                fecharegistro: new Date(),
                pais: lastCountry,
            };

            const newData = {
                idregion: 0,
                nombre: null,
                fecharegistro: new Date(),
                pais: lastCountry,
            }

            const newRegion = (await Request("/Regiones/Post", "post", data)).data.response as Region

            await Request(`/Regiones/Put/${newRegion.idregion}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idregion', data, 'Regiones');
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