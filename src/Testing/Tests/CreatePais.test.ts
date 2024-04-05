import {Request} from "../Prerrequisites/Request.ts";
// No es un caso de prueba de la documentacion, simplemente probando la configuracion de jest.
describe("Test Crear Pais", () =>{
    test('Insertar Pais Correctamente', async () => {

        const data = {
            nombre: 'Prueba 12345'
        }
        const response = await Request("Paises/Post", "post", data)
        expect(response.status).toBe(200);
        console.log(response)
    });

    // TODO Realizar los casos de pruebas segun la docuemtacion de caja negra de FlyEase.
} );