import { Request } from "../../Utils/Request.ts";
import { RandomString } from "../../Utils/RamdomString.ts";
import { randomCoordinates } from "../../Utils/RandomCoordinates.ts";
import { Ciudad, Aeropuerto } from "../../interfaces/AirportModel.ts";

describe("Test Eliminar Aeropuerto", () => {
  describe("Casos de prueba: Clases de equivalencia validas", () => {
    // Deberia de ser ingresado correctamente
    test("CPU_01_ELiminarAeropuerto_Correctly", async () => {
      const cities = (await Request("/Ciudades/GetAll", "get")).data.response as Ciudad[];
      const lastCity: Ciudad = cities[cities?.length - 1];

      const data: Aeropuerto = {
        idaereopuerto: 0,
        nombre: RandomString(10),
        ciudad: lastCity,
        fecharegistro: new Date(),
        coordenadas: {
          idcoordenada: 0,
          latitud: randomCoordinates().latitud,
          longitud: randomCoordinates().longitud,
          fecharegistro: new Date(),
        },
      };
      const aeropuerto = (await Request("/Aeropuertos/Post", "post", data)).data.response as Aeropuerto;
      await Request(`/Aeropuertos/Delete/${aeropuerto.idaereopuerto}`, "delete", null)
        .then((response) => {
          expect(response.status).toBe(200);
          console.log(response.status);
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
    // Deberia de fallar, ID 0
    test("CPU_02_ELiminarAeropuerto_IdZero", async () => {
      await Request(`/Aeropuertos/Delete/0`, "delete", null)
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

    // Deberia de fallar, ID mayor a 9999
    test("CPU_03_ELiminarAeropuerto_IdHigherThan9999", async () => {
      await Request(`/Aeropuertos/Delete/10000`, "delete", null)
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

    // Deberia de fallar, ID null
    test("CPU_04_ELiminarCiudad_IdNull", async () => {
      await Request(`/Aeropuertos/Delete/`, "delete", null)
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

    // Deberia de fallar, ID Not A Number
    test("CPU_05_ELiminarCiudad_IdNaN", async () => {
      await Request(`/Aeropuertos/Delete/as#asd@`, "delete", null)
        .then((response) => {
          expect(response.status).toBe(400 || 409 || 500);
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
