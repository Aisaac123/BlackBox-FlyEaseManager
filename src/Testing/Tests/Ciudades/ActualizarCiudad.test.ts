import {Exist} from "../../Utils/Exist.ts";
import {RandomString} from "../../Utils/RamdomString.ts";
import {GetLastItem} from "../../Utils/GetLastItem.ts";
import {UpdateRequest} from "../../Utils/UpdateRequest.ts";

describe("Test Actualizar Ciudad", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        test("CPU_01_ActualizarCiudad_Correctly", async () => {
            const lastRegion = await GetLastItem("Regiones");
            const lastCity = await GetLastItem("Ciudades");
            const data = {
                imagen: lastCity.imagen,
                nombre: RandomString(10),
                region: lastRegion,
            };

            const newData = {
                imagen: lastCity.imagen,
                nombre: RandomString(30),
                region: lastRegion,
            };
            await UpdateRequest("Ciudades", "idciudad", data, newData)
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
        test("CPU_02_ActualizarCiudad_VoidName", async () => {
            const lastRegion = await GetLastItem("Regiones");
            const lastCity = await GetLastItem("Ciudades");
            const data = {
                imagen: lastCity.imagen,
                nombre: RandomString(10),
                region: lastRegion,
            };

            const newData = {
                imagen: lastCity.imagen,
                nombre: "",
                region: lastRegion,
            };

            await UpdateRequest("Ciudades", "idciudad", data, newData)
                .then(async (response) => {
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
            const lastRegion = await GetLastItem("Regiones");
            const lastCity = await GetLastItem("Ciudades");
            const data = {
                imagen: lastCity.imagen,
                nombre: RandomString(10),
                region: lastRegion,
            };

            const newData = {
                imagen: lastCity.imagen,
                nombre: RandomString(61),
                region: lastRegion,
            };

            await UpdateRequest("Ciudades", "idciudad", data, newData)
                .then(async (response) => {
                    expect(response.status).toBe(409 || 500);
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

        test("CPU_04_ActualizarCiudad_NullName", async () => {
            const lastRegion = await GetLastItem("Regiones");
            const lastCity = await GetLastItem("Ciudades");

            const data = {
                imagen: lastCity.imagen,
                nombre: RandomString(10),
                region: lastRegion,
            };

            const newData  = {
                imagen: lastCity.imagen,
                nombre: null,
                region: lastRegion,
            };

            await UpdateRequest("Ciudades", "idciudad", data, newData)
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