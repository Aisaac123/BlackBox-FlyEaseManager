import { Aeropuerto, Ciudad } from "../../interfaces/AirportModel";
import { RandomString } from "../../Utils/RamdomString";
import { Request } from "../../Utils/Request";
import { Exist } from "../../Utils/Exist";
import { randomCoordinates } from "../../Utils/RandomCoordinates";

describe("Test Crear aeropuerto", () => {
  describe("Caso de prueba: Clases de equivalencia validas", () => {
    test("CPU_01_CrearAeropuerto_Correctly", async () => {
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

      await Request("/Aeropuertos/Post", "post", data)
        .then(async (response) => {
          await Exist.ifExistDelete("idaereopuerto", data, "Aeropuertos");
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
    test("CPU_02_CrearAeropuerto_NameHigherThan60_VoidCity", async () => {
      //   const cities = (await Request("/Ciudades/GetAll", "get")).data.response as Ciudad[];
      //   const lastCity: Ciudad = cities[cities?.length - 1];
      const data = {
        idaereopuerto: 0,
        nombre: RandomString(61),
        ciudad: null,
        fecharegistro: new Date(),
        coordenadas: {
          idcoordenada: 0,
          latitud: randomCoordinates().latitud,
          longitud: randomCoordinates().longitud,
          fecharegistro: new Date(),
        },
      };

      await Request("/Aeropuertos/Post", "post", data)
        .then(async (response) => {
          await Exist.ifExistDelete("idaereopuerto", data, "Aeropuertos");
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

    test("CPU_03_CrearAeropuerto_VoidName", async () => {
      const cities = (await Request("/Ciudades/GetAll", "get")).data.response as Ciudad[];
      const lastCity: Ciudad = cities[cities?.length - 1];
      const data = {
        idaereopuerto: 0,
        nombre: "",
        ciudad: lastCity,
        fecharegistro: new Date(),
        coordenadas: {
          idcoordenada: 0,
          latitud: randomCoordinates().latitud,
          longitud: randomCoordinates().longitud,
          fecharegistro: new Date(),
        },
      };

      await Request("/Aeropuertos/Post", "post", data)
        .then(async (response) => {
          await Exist.ifExistDelete("idaereopuerto", data, "Aeropuertos");
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

    test("CPU_04_CrearAeropuerto_NullObject", async () => {
        const data = {
          idaereopuerto: null,
          nombre: null,
          ciudad: null,
          fecharegistro: null,
          coordenadas: null,
        };
  
        await Request("/Aeropuertos/Post", "post", data)
          .then(async (response) => {
            expect(response.status).toBe(400);
          })
          .catch(async (error) => {
            if (error.isAxiosError) {
              console.log(error.status);
              expect(error.status).toBe(400);
            } else {
              throw error;
            }
          });
      });
  });
});
