import axios from 'axios';
import {Autorize} from "../PreTesting/Autorize.ts";

// No es un caso de prueba de la documentacion, simplemente probando la configuracion de jest.
describe("Test Crear Pais", () =>{
    test('Insertar Pais Correctamente', async () => {

        const token = await Autorize('Aisaac', 'isaacdavid1234')
        if(token === "error") return;
        const data = {
            nombre: 'Prueba 4'
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post
        ('https://www.flyeasemanager.site/FlyEaseApi/Paises/Post', data, config);
        expect(response.status).toBe(200);
    });

    // TODO Realizar los casos de pruebas segun la docuemtacion de caja negra de FlyEase.
} );