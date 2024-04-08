import { RandomString } from "../../Utils/RamdomString";
import { Request } from "../../Utils/Request";
import { Exist } from "../../Utils/Exist";
import { Aereolinea, Avion } from "../../interfaces/SeatsModel";

describe("Test Eliminar Avion", () => {
  describe("Casos de prueba: Clases de equivalencia validas", () => {
    // Deberia de ser ingresado correctamente
    test("CPU_01_ELiminarAvion_Correctly", async () => {
      const airlines = (await Request("/Aerolineas/GetAll", "get")).data.response as Aereolinea[];
      const lastAirline: Aereolinea = airlines[airlines?.length - 1];

      const data: Avion = {
        idavion: RandomString(9),
        nombre: RandomString(20),
        modelo: RandomString(20),
        fabricante: RandomString(40),
        velocidadpromedio: Math.random() * 1000,
        cantidadpasajeros: Math.floor(Math.random() * 1000),
        cantidadcarga: Math.random() * 1000,
        fecharegistro: new Date(),
        aereolinea: lastAirline,
      };

      const avion = (await Request("/Aviones/Post", "post", data)).data.response as Avion;
      await Request(`/Aviones/Delete/${avion.idavion}`, "delete", null)
        .then(async (response) => {
          await Exist.ifExistDelete("idavion", data, "Aviones");
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
    // Deberia de fallar, ID mayor a 10 caracteres
    test("CPU_02_EliminarAvion_IdHigherThanTen", async () => {
      const idHigherThanTen = RandomString(11);
      await Request(`/Aviones/Delete/${idHigherThanTen}`, "delete", null)
        .then((response) => {
          expect(response.status).toBe(409 || 500);
          console.log(response.status);
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

    // Deberia de fallar, ID es un string vacio
    test("CPU_03_EliminarAvion_voidString", async () => {
      await Request(`/Aviones/Delete/ `, "delete", null)
        .then((response) => {
          expect(response.status).toBe(404);
          console.log(response.status);
        })
        .catch(async (error) => {
          if (error.isAxiosError) {
            console.log(error.status);
            expect(error.status).toBe(404);
          } else {
            throw error;
          }
        });
    });

    // Deberia de fallar, ID null
    test("CPU_04_EliminarAvion_IdNull", async () => {
      const id = null;
      await Request(`/Aviones/Delete/${id}`, "delete", null)
        .then((response) => {
          expect(response.status).toBe(404 || 409 || 500);
          console.log(response.status);
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
  });
});
