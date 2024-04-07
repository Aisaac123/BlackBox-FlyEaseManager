import {Ciudad, Region} from "../../interfaces/AirportModel.ts";
import {RandomString} from "../../Utils/RamdomString.ts";
import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";

describe("Test crear Ciudad", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_CrearCiudad_Correctly", async () => {
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
            await Request("/Ciudades/Post", "post", data)
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
    })

    describe("Casos de prueba: Clases de equivalencia invalidas", () => {
        test("CPU_02_CrearCiudad_NameHigherThan60_VoidCountry", async () => {
            const regions = (await Request("/Regiones/GetAll", "get")).data.response as Region[];
            const cities = (await Request("/Ciudades/GetAll", "get")).data.response as Ciudad[];
            const lastRegion : Region = regions[regions?.length - 1];
            const lastCity : Ciudad = cities[cities?.length - 1];
            const data: Ciudad = {
                idciudad: 0,
                imagen: lastCity.imagen,
                nombre: RandomString(61),
                fecharegistro: new Date(),
                region: lastRegion,
            };
            await Request("/Ciudades/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idciudad', data, 'Ciudades');
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

        test("CPU_03_CrearCiudad_NullCity", async () => {
            await Request("/Ciudades/Post", "post", null)
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