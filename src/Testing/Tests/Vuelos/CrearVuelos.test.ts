import {RandomString} from "../../Utils/RamdomString.ts";
import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";

describe("Test Crear Vuelos", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {

        test("CPU_01_CrearVuelos_Correctly_EspecificData01", async () => {

            const aeropuerto_Despegue= await Request("Aeropuertos/GetById/23", "get")
            const aeropuerto_Destino= await Request("Aeropuertos/GetById/25", "get")


            const avion= await Request("Aviones/GetById/AV345", "get")
            const fecha = new Date("2024-03-16T15:30:00");

            const data = {
                preciovuelo: 80.990,
                descuento: 0,
                fechayhoradesalida: fecha.toISOString().slice(0, -5),
                tarifatemporada: 15.5,
                aeropuerto_Despegue: aeropuerto_Despegue.data.response,
                aeropuerto_Destino: aeropuerto_Destino.data.response,
                avion: avion.data.response
        };
            await Request("/Vuelos/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idvuelo', data, 'Vuelos');
                    expect(response.status).toBe(200);
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


        test("CPU_02_CrearAerolinea_NameHigherThan61_1lenghtIATA_2lenghtICAO", async () => {

            const data = {
                nombre: RandomString(61),
                codigoiata: RandomString(1),
                codigoicao: RandomString(2)
            };

            await Request("/Aerolineas/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idaereolinea', data, 'Aerolineas');
                    expect(response.status).toBe(409 || 500);
                }).catch((error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    }else{
                        throw error;
                    }
                });
        });


        test("CPU_03_CrearAerolinea_NullName_3lenghtIATA_4lenghtICAO", async () => {

            const data = {
                nombre: null,
                codigoiata: RandomString(3),
                codigoicao: RandomString(4)
            };

            await Request("/Aerolineas/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idaereolinea', data, 'Aerolineas');
                    expect(response.status).toBe(409 || 500);
                }).catch((error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    }else{
                        throw error;
                    }
                });
        });

        test("CPU_04_CrearAerolinea_allNull", async () => {

            const data = {
                nombre: null,
                codigoiata: null,
                codigoicao: null
            };

            await Request("/Aerolineas/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idaereolinea', data, 'Aerolineas');
                    expect(response.status).toBe(409 || 500);
                })
                .catch((error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(409 || 500);
                    }else{
                        throw error;
                    }
                });
        });

    });
});