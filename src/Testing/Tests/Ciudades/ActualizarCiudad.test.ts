import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";
import {RandomString} from "../../Utils/RamdomString.ts";
import {Ciudad, Region} from "../../interfaces/AirportModel.ts";

describe("Test Actualizar Ciudad", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_ActualizarCiudad_Correctly", async () => {
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

            const newData : Ciudad = {
                imagen: lastCity.imagen,
                nombre: RandomString(30),
                fecharegistro: new Date(),
                region: lastRegion,
            };
            const newCity = (await Request("/Ciudades/Post", "post", data)).data.response as Ciudad

            await Request(`/Ciudades/Put/${newCity.idciudad}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idciudad', data, 'Ciudades');
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
        test("CPU_02_ActualizarCiudad_VoidName", async () => {
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

            const newData : Ciudad = {
                imagen: lastCity.imagen,
                nombre: "",
                fecharegistro: new Date(),
                region: lastRegion,
            };

            const newCity = (await Request("/Ciudades/Post", "post", data)).data.response as Ciudad

            await Request(`/Ciudades/Put/${newCity.idciudad}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idciudad', data, 'Ciudades');
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

        test("CPU_03_ActualizarCiudad_NameHigherThan60", async () => {
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

            const newData : Ciudad = {
                imagen: lastCity.imagen,
                nombre: RandomString(61),
                fecharegistro: new Date(),
                region: lastRegion,
            };

            const newCity = (await Request("/Ciudades/Post", "post", data)).data.response as Ciudad

            await Request(`/Ciudades/Put/${newCity.idciudad}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idciudad', data, 'Ciudades');
                    expect(response.status).toBe(409 || 500);
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

        test("CPU_04_ActualizarCiudad_NullName", async () => {
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

            const newData  = {
                imagen: lastCity.imagen,
                nombre: null,
                fecharegistro: new Date(),
                region: lastRegion,
            };

            const newCity = (await Request("/Ciudades/Post", "post", data)).data.response as Ciudad

            await Request(`/Ciudades/Put/${newCity.idciudad}`, "put", newData)
                .then(async (response) => {
                    await Exist.ifExistDelete('idciudad', data, 'Ciudades');
                    expect(response.status).toBe(409 || 500);
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