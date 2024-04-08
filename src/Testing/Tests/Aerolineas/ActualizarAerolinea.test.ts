import {RandomString} from "../../Utils/RamdomString.ts";
import {UpdateRequest} from "../../Utils/UpdateRequest.ts";
import {Exist} from "../../Utils/Exist.ts";

describe("Test Actualizar Aerolineas", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {

        test("CPU_01_ActualizarAerolinea_Correctly", async () => {
            const data = {
                nombre: RandomString(10),
                codigoiata: RandomString(2),
                codigoicao: RandomString(3)
            };

            const newData = {
                nombre: RandomString(10),
                codigoiata: RandomString(2),
                codigoicao: RandomString(3)
            };

            await UpdateRequest("Aerolineas", "idaereolinea", data, newData)
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

        test("CPU_02_ActualizarAerolinea_NameHigherThan61_1lenghtIATA_2lenghtICAO", async () => {
            const data = {
                nombre: RandomString(10),
                codigoiata: RandomString(2),
                codigoicao: RandomString(3)
            };

            const newData = {
                nombre: RandomString(61),
                codigoiata: RandomString(1),
                codigoicao: RandomString(2)
            };

            await UpdateRequest("Aerolineas", "idaereolinea", data, newData)
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

        test("CPU_03_ActualizarAerolinea_NullName_3lenghtIATA_4lenghtICAO", async () => {
            const data = {
                nombre: RandomString(10),
                codigoiata: RandomString(2),
                codigoicao: RandomString(3)
            };

            const newData = {
                nombre: null,
                codigoiata: RandomString(3),
                codigoicao: RandomString(4)
            };

            await UpdateRequest("Aerolineas", "idaereolinea", data, newData)
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

        test("CPU_04_ActualizarAerolinea_AllNull", async () => {
            const data = {
                nombre: RandomString(10),
                codigoiata: RandomString(2),
                codigoicao: RandomString(3)
            };

            const newData = {
                nombre: null,
                codigoiata: null,
                codigoicao: null
            };

            await UpdateRequest("Aerolineas", "idaereolinea", data, newData)
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
});