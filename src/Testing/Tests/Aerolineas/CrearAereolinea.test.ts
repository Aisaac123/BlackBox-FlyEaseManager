import {RandomString} from "../../Utils/RamdomString.ts";
import {Request} from "../../Utils/Request.ts";
import {Exist} from "../../Utils/Exist.ts";

describe("Test Crear Aerolineas", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {

        test("CPU_01_CrearAerolinea_Correctly", async () => {

            const data = {
                nombre: RandomString(10),
                codigoiata: RandomString(2),
                codigoicao: RandomString(3)
            };
            await Request("/Aerolineas/Post", "post", data)
                .then(async (response) => {
                    await Exist.ifExistDelete('idaereolinea', data, 'Aerolineas');
                    expect(response.status).toBe(200);
                })
                .catch(async (error) => {
                    if(error.isAxiosError){
                        console.log(error.status);
                        expect(error.status).toBe(200);
                    }else{
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