import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";
import {RandomNumber} from "../../Utils/RandomNumber.ts";

describe("Test Crear Vuelos", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {

        test("CPU_01_CrearVuelos_Correctly_EspecificData01", async () => {

            const aeropuerto_Despegue= await Request("Aeropuertos/GetById/23", "get")
            const aeropuerto_Destino= await Request("Aeropuertos/GetById/25", "get")


            const avion= await Request("Aviones/GetById/AV345", "get")
            const fecha = new Date("2024-03-16T15:30:00");

            const data = {
                preciovuelo: RandomNumber.randomDecimalNumber(0, 1000000, 3),
                descuento: RandomNumber.randomNumber(0, 100),
                fechayhoradesalida: fecha.toISOString().slice(0, -5),
                tarifatemporada: RandomNumber.randomDecimalNumber(0, 99, 2),
                aeropuerto_Despegue: aeropuerto_Despegue.data.response,
                aeropuerto_Destino: aeropuerto_Destino.data.response,
                avion: avion.data.response
        };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(200);
                    //@ts-ignore
                    expect(response.data.response.aeropuerto_Despegue.nombre).toBe("Olaya Herrera");
                    //@ts-ignore
                    expect(response.data.response.aeropuerto_Destino.nombre).toBe("Alfonso López Pumarejo");
                    //@ts-ignore
                    expect(response.data.response.avion.nombre).toBe("Avianca-789");
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(200);
                    }else{
                        console.log(error)
                        throw error;
                    }
                });
        });

        test("CPU_02_CrearVuelos_Correctly_EspecificData02", async () => {


            const aeropuerto_Despegue= await Request("Aeropuertos/GetById/26", "get")
            const aeropuerto_Destino= await Request("Aeropuertos/GetById/23", "get")


            const avion= await Request("Aviones/GetById/VV235", "get")
            const fecha = new Date("2024-03-16T15:30:00");

            const data = {
                preciovuelo: RandomNumber.randomDecimalNumber(0, 1000000, 3),
                descuento: RandomNumber.randomNumber(0, 100),
                fechayhoradesalida: fecha.toISOString().slice(0, -5),
                tarifatemporada: RandomNumber.randomDecimalNumber(0, 99, 2),
                aeropuerto_Despegue: aeropuerto_Despegue.data.response,
                aeropuerto_Destino: aeropuerto_Destino.data.response,
                avion: avion.data.response
            };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(200);
                    //@ts-ignore
                    expect(response.data.response.aeropuerto_Despegue.nombre).toBe("El Dorado");
                    //@ts-ignore
                    expect(response.data.response.aeropuerto_Destino.nombre).toBe("Olaya Herrera");
                    //@ts-ignore
                    expect(response.data.response.avion.nombre).toBe("VivaAir-234");
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(200);
                    }else{
                        console.log(error)
                        throw error;
                    }
                });
        });

        test("CPU_03_CrearVuelos_Correctly_EspecificData03", async () => {


            const aeropuerto_Despegue= await Request("Aeropuertos/GetById/25", "get")
            const aeropuerto_Destino= await Request("Aeropuertos/GetById/26", "get")


            const avion= await Request("Aviones/GetById/AV987", "get")
            const fecha = new Date("2024-03-16T15:30:00");

            const data = {
                preciovuelo: RandomNumber.randomDecimalNumber(0, 1000000, 3),
                descuento: RandomNumber.randomNumber(0, 100),
                fechayhoradesalida: fecha.toISOString().slice(0, -5),
                tarifatemporada: RandomNumber.randomDecimalNumber(0, 99, 2),
                aeropuerto_Despegue: aeropuerto_Despegue.data.response,
                aeropuerto_Destino: aeropuerto_Destino.data.response,
                avion: avion.data.response
            };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(200);
                    //@ts-ignore
                    expect(response.data.response.aeropuerto_Despegue.nombre).toBe("Alfonso López Pumarejo");
                    //@ts-ignore
                    expect(response.data.response.aeropuerto_Destino.nombre).toBe("El Dorado");
                    //@ts-ignore
                    expect(response.data.response.avion.nombre).toBe("LatamAirlines-987");
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(200);
                    }else{
                        console.log(error)
                        throw error;
                    }
                });
        });

    });

    describe("Casos de prueba: Clases de equivalencia invalidas", () => {

        test("CPU_04_CrearVuelos_Incorrectly_01", async () => {

            const fecha = new Date("2024-03-02T14:30:00");

            const data = {
                preciovuelo: 0,
                descuento: 150,
                fechayhoradesalida: fecha.toISOString().slice(0, -5),
                tarifatemporada: 120,
                aeropuerto_Despegue: null,
                aeropuerto_Destino: null,
                avion: null
            };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(409 || 400);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 400);
                    }else{
                        console.log(error)
                        throw error;
                    }
                });
        });

        test("CPU_05_CrearVuelos_Incorrectly_02", async () => {

            const fecha = new Date("2024-03-24T14:30:00");

            const data = {
                preciovuelo: 0,
                descuento: -15,
                fechayhoradesalida: fecha.toISOString().slice(0, -5),
                tarifatemporada: 0,
                aeropuerto_Despegue: {
                    nombre:"New York Airport"
                },
                aeropuerto_Destino: {
                    nombre:"Miami Airport"
                },
                avion: {
                    nombre:"Avion Volador"
                },
            };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(409 || 400);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 400);
                    }else{
                        console.log(error)
                        throw error;
                    }
                });
        });

        test("CPU_06_CrearVuelos_Incorrectly_03", async () => {


            const data = {
                preciovuelo: "aasdasd#asd2@",
                descuento: null,
                fechayhoradesalida: null,
                tarifatemporada: null,
                aeropuerto_Despegue: null,
                aeropuerto_Destino: null,
                avion: null
            };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(400 || 409);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(400 || 409);
                    }else{
                        console.log(error)
                        throw error;
                    }
                });
        });

        test("CPU_07_CrearVuelos_Incorrectly_04", async () => {


            const data = {
                preciovuelo: null,
                descuento: null,
                fechayhoradesalida: null,
                tarifatemporada: null,
                aeropuerto_Despegue: null,
                aeropuerto_Destino: null,
                avion: null
            };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(400);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(400);
                    }else{
                        console.log(error)
                        throw error;
                    }
                });
        });
    });
});