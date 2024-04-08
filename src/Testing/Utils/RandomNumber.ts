export class RandomNumber {

    /**
     * Genera un número aleatorio entero dentro de un rango especificado.
     * @param minimo El valor mínimo del rango.
     * @param maximo El valor máximo del rango.
     * @returns Un número aleatorio entero dentro del rango especificado.
     */
    static randomNumber(minimo: number, maximo: number): number {
        return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    }

    /**
     * Genera un número aleatorio con decimales dentro de un rango especificado.
     * @param minimo El valor mínimo del rango.
     * @param maximo El valor máximo del rango.
     * @param decimales El número de decimales a incluir.
     * @returns Un número aleatorio con decimales dentro del rango especificado.
     */
    static randomDecimalNumber(minimo: number, maximo: number, decimales: number): number {
        const multiplicador = Math.pow(10, decimales);
        const minimoAjustado = minimo * multiplicador;
        const maximoAjustado = maximo * multiplicador;
        return (Math.floor(Math.random() * (maximoAjustado - minimoAjustado + 1)) + minimoAjustado) / multiplicador;
    }
}