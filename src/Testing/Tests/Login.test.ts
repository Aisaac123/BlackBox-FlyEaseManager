import {Request} from "../Prerrequisites/Request.ts";
import {RandomString} from "../Prerrequisites/RamdomString.ts";

describe("Test Login", () => {
    describe("Casos de prueba: Clases de equivalencia validas", () => {
        //Deberia de ser ingresado correctamente
        test("CPU01_Login_userLoggedInCorrectly", async () => {
            const user = {
                usuario: "diegoacastro",
                clave: "die18"
            }

            await Request("/Administradores/Authentication", "post", user)
                .then((response) => {
                    expect(response.status).toBe(200);
                    console.log(response.status);
                })
                .catch((err) => {
                    expect(err.status).toBe(404);
                    console.log(err.status);
                })
        })
    })

    describe("Casos de prueba: Clases de equivalencia inválidas", () => {
        //Deberia de ser ingresado incorrectamente
        test("CPU02_Login_limitValues", async () => {
            const user = {
                usuario: RandomString(51),
                clave: RandomString(101)
            }

            await Request("/Administradores/Authentication", "post", user)
                .then((response) => {
                    expect(response.status).toBe(401 || 409 || 500);
                    console.log(response.status);
                })
                .catch((err) => {
                    expect(err.status).toBe(401 || 409 || 500);
                    console.log(err.status);
                })
        })

        //Deberia de ser ingresado incorrectamente: strings vacios
        test("CPU03_Login_emptyStrings", async () => {
            const user = {
                usuario: "",
                clave: ""
            }

            await Request("/Administradores/Authentication", "post", user)
                .then((response) => {
                    expect(response.status).toBe(401 || 500);
                    console.log(response.status);
                })
                .catch((err) => {
                    expect(err.status).toBe(401 || 500);
                    console.log(err.status);
                })
        })

        //Deberia de ser ingresado incorrectamente: Usuario erroneo
        test("CPU04_Login_invalidUser", async () => {
            const user = {
                usuario: "diegoacastro",
                clave: "die188"
            }

            await Request("/Administradores/Authentication", "post", user)
                .then((response) => {
                    expect(response.status).toBe(401 || 500);
                    console.log(response.status);
                })
                .catch((err) => {
                    expect(err.status).toBe(401 || 500);
                    console.log(err.status);
                })
        })
    })
})