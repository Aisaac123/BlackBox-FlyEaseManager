import { Exist } from "../../Utils/Exist.ts";
import { Request } from "../../Utils/Request.ts";
import { Asiento, Avion, Categoria } from "../../interfaces/SeatsModel.ts";

describe("Test Eliminar Asiento", () => {
  describe("Casos de prueba: Clases de equivalencia validas", () => {
    // Deberia de ser ingresado correctamente
    test("CPU_01_ELiminarAsiento_Correctly", async () => {
      const planes = (await Request("/Aviones/GetAll", "get")).data.response as Avion[];
      const lastPlane: Avion = planes[planes?.length - 1];
      const categories = (await Request("/Categorias/GetAll", "get")).data.response as Categoria[];
      const lastCategory: Avion = categories[categories?.length - 1];

      const data: Asiento = {
        idasiento: 0,
        posicion: Math.floor(Math.random() * 1000),
        disponibilidad: true,
        fecharegistro: new Date(),
        avion: lastPlane,
        categoria: lastCategory,
      };

      const asiento = (await Request("/Asientos/Post", "post", data)).data.response as Asiento;
      await Request(`/Asientos/Delete/${asiento.idasiento}`, "delete", null)
        .then(async (response) => {
          await Exist.ifExistDelete("idasiento", data, "Asientos");
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
      // Deberia de fallar, ID 0
      test("CPU_02_ELiminarAsiento_IdZero", async () => {
        await Request(`/Asientos/Delete/0`, "delete", null)
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
      test("CPU_03_EliminarAsiento_IdHigherThan9999", async () => {
        await Request(`/Asientos/Delete/10000`, "delete", null)
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
      test("CPU_04_ELiminarAsiento_IdNull", async () => {
        await Request(`/Asientos/Delete/`, "delete", null)
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
      test("CPU_05_EliminarAsiento_IdNaN", async () => {
        await Request(`/Asientos/Delete/as#asd@`, "delete", null)
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
