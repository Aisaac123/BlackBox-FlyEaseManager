import { Asiento, Avion, Categoria } from "../../interfaces/SeatsModel";
import { Request } from "../../Utils/Request";
import { Exist } from "../../Utils/Exist";

describe("Test Actualizar Asiento", () => {
  describe("Caso de prueba: Clases de equivalencia validas", () => {
    test("CPU_01_ActualizarAsiento_Correctly", async () => {
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

      const newData: Asiento = {
        idasiento: 0,
        posicion: Math.floor(Math.random() * 1000),
        disponibilidad: true,
        fecharegistro: new Date(),
        avion: lastPlane,
        categoria: lastCategory,
      };

      const newSeat = (await Request("/Asientos/Post", "post", data)).data.response as Asiento;

      await Request(`/Asientos/Put/${newSeat.idasiento}`, "put", newData)
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
    test("CPU_02_ActualizarAsiento_invalidAvailability_invalidCategory", async () => {
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

      const newData: Asiento = {
        idasiento: 0,
        posicion: Math.floor(Math.random() * 1000),
        disponibilidad: undefined,
        fecharegistro: new Date(),
        avion: lastPlane,
        categoria: undefined,
      };

      const newSeat = (await Request("/Asientos/Post", "post", data)).data.response as Asiento;

      await Request(`/Asientos/Put/${newSeat.idasiento}`, "put", newData)
        .then(async (response) => {
          await Exist.ifExistDelete("idasiento", data, "Asientos");
          expect(response.status).toBe(409);
        })
        .catch(async (error) => {
          if (error.isAxiosError) {
            console.log(error.status);
            expect(error.status).toBe(409);
          } else {
            throw error;
          }
        });
    });
  });
});
