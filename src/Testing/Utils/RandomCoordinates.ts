export const randomCoordinates = () => {
    const latitud = (Math.random() * 180 - 90).toFixed(6);
    const longitud = (Math.random() * 360 - 180).toFixed(6);
    return { latitud: parseFloat(latitud), longitud: parseFloat(longitud) };
}