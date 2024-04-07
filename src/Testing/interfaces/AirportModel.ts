export interface Aeropuerto {
    idaereopuerto: number;
    nombre:        string;
    fecharegistro: Date;
    ciudad:        Ciudad;
    coordenadas:   Coordenadas;
}

export interface Ciudad {
    idciudad?:      number;
    nombre:        string;
    fecharegistro: Date;
    imagen:        string;
    region:        Region;
}

export interface Region {
    idregion:      number;
    nombre:        string;
    fecharegistro: Date;
    pais:          Pais | null;
}

export interface Pais {
    idpais:        number;
    nombre:        string;
    fecharegistro: Date;
}

export interface Coordenadas {
    idcoordenada:  number;
    latitud:       number;
    longitud:      number;
    fecharegistro: Date;
}