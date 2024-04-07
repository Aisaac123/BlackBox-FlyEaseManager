import { Request } from "../../Utils/Request.ts";
import { RandomString } from "../../Utils/RamdomString.ts";
import { Pais } from "../../interfaces/CountryModel.ts";
describe("Test Eliminar Pais", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        // Deberia de ser ingresado correctamente
        test("CPU_01_ELiminarPais_Correctly", async () => {
            const data = {
                nombre: RandomString(6),
            };
            const pais  = (await Request("/Paises/Post", "post", data)).data.response as Pais
            await Request(`/Paises/Delete/${pais.idpais}`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(200);
                    console.log(response.status);
                })
                .catch((error) => {
                    expect(error.status).toBe(200);
                    console.log(error.status);
                });
        });
    });

    describe("Casos de prueba: Clases de equivalencia invalidas", () => {
        // Deberia de fallar, nombre vacio
        test("CPU_02_ELiminarPais_Incorrectly", async () => {
            await Request(`/Paises/Delete/0`, "delete", null)
                .then((response) => {
                    expect(response.status).toBe(409 || 500);
                    console.log(response.status);
                })
                .catch((error) => {
                    expect(error.status).toBe(409 || 500);
                    console.log(error.status);
                });
        });

        // Deberia de fallar, nombre demasiado largo
        /*test("CPU_03_CrearPais", async () => {
            const data = {
                nombre: RandomString(61),
            };
            await Request("/Paises/Post", "post", data)
                .then((response) => {
                    expect(response.status).toBe(409 || 500);
                    console.log(response.status);
                })
                .catch((error) => {
                    expect(error.status).toBe(409 || 500);
                    console.log(error.status);
                });
        });

        // Deberia de fallar, nombre nulo
        test("CPU_04_CrearPais", async () => {
            const data = {
                nombre: null,
            };
            await Request("/Paises/Post", "post", data)
                .then((response) => {
                    expect(response.status).toBe(409 || 500);
                    console.log(response.status);
                })
                .catch((error) => {
                    expect(error.status).toBe(409 || 500);
                    console.log(error.status);
                });
        });*/
    });
});
