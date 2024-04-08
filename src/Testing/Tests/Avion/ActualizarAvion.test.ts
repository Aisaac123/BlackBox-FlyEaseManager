import { RandomString } from "../../Utils/RamdomString";
import { Request } from "../../Utils/Request";
import { Exist } from "../../Utils/Exist";
import { Aereolinea, Avion } from "../../interfaces/SeatsModel";

describe("Test Actualizar Avion", () => {
  describe("Caso de prueba: Clases de equivalencia validas", () => {
    test("CPU_01_ActualizarAvion_Correctly", async () => {
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

      const newData: Avion = {
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

      const newPlane = (await Request("/Aviones/Post", "post", data)).data.response as Avion;

      await Request(`/Aviones/Put/${newPlane.idavion}`, "put", newData)
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
    test("CPU_02_ActualizarAvion_FabricantHigherThan20_NegativeSpeed_NegativeCharge_NegativeCustomers", async () => {
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

      const newData: Avion = {
        idavion: RandomString(9),
        nombre: RandomString(20),
        modelo: RandomString(20),
        fabricante: RandomString(40),
        velocidadpromedio: -1,
        cantidadpasajeros: -1,
        cantidadcarga: -1,
        fecharegistro: new Date(),
        aereolinea: lastAirline,
      };

      const newPlane = (await Request("/Aviones/Post", "post", data)).data.response as Avion;

      await Request(`/Aviones/Put/${newPlane.idavion}`, "put", newData)
        .then(async (response) => {
          await Exist.ifExistDelete("idavion", data, "Aviones");
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

    test("CPU_03_ActualizarAvion_FabricantVoidString_NegativeSpeed_NegativeCharge_NegativeCustomers", async () => {
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
  
        const newData: Avion = {
          idavion: RandomString(9),
          nombre: RandomString(20),
          modelo: RandomString(20),
          fabricante: "",
          velocidadpromedio: -1,
          cantidadpasajeros: -1,
          cantidadcarga: -1,
          fecharegistro: new Date(),
          aereolinea: lastAirline,
        };
  
        const newPlane = (await Request("/Aviones/Post", "post", data)).data.response as Avion;
  
        await Request(`/Aviones/Put/${newPlane.idavion}`, "put", newData)
          .then(async (response) => {
            await Exist.ifExistDelete("idavion", data, "Aviones");
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
