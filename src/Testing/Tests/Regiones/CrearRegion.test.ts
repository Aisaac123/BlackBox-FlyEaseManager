import {Pais, Region} from "../../interfaces/AirportModel.ts";
import {RandomString} from "../../Utils/RamdomString.ts";
import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";

describe("Test crear region", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_CrearRegion_Correctly", async () => {
            const countries = (await Request("/Paises/GetAll", "get")).data.response as Pais[];
            const lastCountry : Pais = countries[countries?.length - 1];
            const data: Region = {
                idregion: 0,
                nombre: RandomString(10),
                fecharegistro: new Date(),
                pais: lastCountry,
            };
            await Request("/Regiones/Post", "post", data)
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
    })

    describe("Casos de prueba: Clases de equivalencia invalidas", () => {
        test("CPU_02_CrearRegion_NameHigherThan60_VoidCountry", async () => {
            const data : Region = {
                idregion: 0,
                nombre: RandomString(60),
                fecharegistro: new Date(),
                pais: null,
            };
            await Request("/Regiones/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idregion', data, 'Regiones');
                    expect(response.status).toBe(409);
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

        test("CPU_03_CrearRegion_NullRegion", async () => {
            await Request("/Regiones/Post", "post", null)
                .then(async (response) => {
                    expect(response.status).toBe(409);
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
    })
})