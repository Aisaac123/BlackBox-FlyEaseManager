import axios from "axios";
import {AuthResponse} from '../interfaces/AuthResponse.ts'
/**
 Metodo que recibe el usuario y la contraseña para devolver el token de acceso. Swagger: {@link https://www.flyeasemanager.site/FlyEaseWebApiSwaggerUI/index.html}
 */
export const Authorize = async (usuario: string, clave: string): Promise<string> => {
    const data = {
        usuario,
        clave,
    };
    try {
        const response = await axios.post(
            'https://www.flyeasemanager.site/FlyEaseApi/Administradores/Authentication',
            data
        );
        const res: AuthResponse = response.data;
        return res.response.tokens.primaryToken;
    } catch (error) {
        console.error('Error fetching token:', error);
        return 'Error';
    }
};
