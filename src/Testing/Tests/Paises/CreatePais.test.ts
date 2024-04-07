import { Request } from "../../Utils/Request.ts";
import { RandomString } from "../../Utils/RamdomString.ts";
import {Exist} from "../../Utils/Exist.ts";
describe("Test Crear Pais", () => {
  describe("Casos de prueba: Clases de equivalencia validas", () => {

      test("CPU_01_CrearPais", async () => {
      const data = {
        nombre: RandomString(10),
      };
      await Request("/Paises/Post", "post", data)
        .then(async (response) => {
            await Exist.ifExistDelete('idpais', data, 'Paises');
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

      test("CPU_02_CrearPais_VoidName", async () => {
      const data = {
        nombre: "",
      };

      await Request("/Paises/Post", "post", data)
        .then(async (response) => {
            await Exist.ifExistDelete('idpais', data, 'Paises');
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

      test("CPU_03_CrearPais", async () => {
      const data = {
          idpais:233,
          nombre: RandomString(61)
      };
      await Request("/Paises/Post", "post", data)
        .then(async (response) => {
            await Exist.ifExistDelete('idpais', data, 'Paises');
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

      test("CPU_04_CrearPais", async () => {
      const data = {
        nombre: null,
      };
      await Request("/Paises/Post", "post", data)
        .then(async (response) => {
            await Exist.ifExistDelete('idpais', data, 'Paises');
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
