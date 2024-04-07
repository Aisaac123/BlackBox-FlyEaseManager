import { Request } from "../../Utils/Request.ts";
import { Exist } from "../../Utils/Exist.ts";
import { RandomString } from "../../Utils/RamdomString.ts";
import { randomCoordinates } from "../../Utils/RandomCoordinates.ts";
import { Ciudad, Aeropuerto } from "../../interfaces/AirportModel.ts";

describe("Test Actualizar Aeropuerto", () => {
  describe("Casos de prueba: Clases de equivalencia validas", () => {
    test("CPU_01_ActualizarAeropuerto_Correctly", async () => {
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

      const newData: Aeropuerto = {
        idaereopuerto: 0,
        nombre: RandomString(20),
        ciudad: lastCity,
        fecharegistro: new Date(),
        coordenadas: {
          idcoordenada: 0,
          latitud: randomCoordinates().latitud,
          longitud: randomCoordinates().longitud,
          fecharegistro: new Date(),
        },
      };
      const newAirport = (await Request("/Aeropuertos/Post", "post", data)).data.response as Aeropuerto;

      await Request(`/Ciudades/Put/${newAirport.idaereopuerto}`, "put", newData)
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
  });

  describe("Casos de prueba: Clases de equivalencia invalidas", () => {
    test("CPU_02_ActualizarCiudad_NameHigherThan50_NullCity", async () => {
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

      const newData = {
        idaereopuerto: 0,
        nombre: RandomString(51),
        ciudad: null,
        fecharegistro: new Date(),
        coordenadas: {
          idcoordenada: 0,
          latitud: randomCoordinates().latitud,
          longitud: randomCoordinates().longitud,
          fecharegistro: new Date(),
        },
      };
      const newAirport = (await Request("/Aeropuertos/Post", "post", data)).data.response as Aeropuerto;

      await Request(`/Ciudades/Put/${newAirport.idaereopuerto}`, "put", newData)
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

    test("CPU_03_ActualizarCiudad_NullName", async () => {
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

      const newData = {
        idaereopuerto: 0,
        nombre: null,
        ciudad: lastCity,
        fecharegistro: new Date(),
        coordenadas: {
          idcoordenada: 0,
          latitud: randomCoordinates().latitud,
          longitud: randomCoordinates().longitud,
          fecharegistro: new Date(),
        },
      };
      const newAirport = (await Request("/Aeropuertos/Post", "post", data)).data.response as Aeropuerto;

      await Request(`/Ciudades/Put/${newAirport.idaereopuerto}`, "put", newData)
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

    test("CPU_04_ActualizarCiudad_NullObject", async () => {
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

      const newData = {
        idaereopuerto: null,
        nombre: null,
        ciudad: null,
        fecharegistro: null,
        coordenadas: null,
      };
      const newAirport = (await Request("/Aeropuertos/Post", "post", data)).data.response as Aeropuerto;

      await Request(`/Ciudades/Put/${newAirport.idaereopuerto}`, "put", newData)
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
  });
});
