export interface Asiento {
    idasiento?:      number;
    posicion?:       number;
    disponibilidad?: boolean;
    fecharegistro?:  Date;
    avion?:          Avion;
    categoria?:      Categoria;
}

export interface Avion {
    idavion?:           string;
    nombre?:            string;
    modelo?:            string;
    fabricante?:        string;
    velocidadpromedio?: number;
    cantidadpasajeros?: number;
    cantidadcarga?:     number;
    fecharegistro?:     Date;
    aereolinea?:        Aereolinea;
}

export interface Aereolinea {
    idaereolinea?:  number;
    nombre?:        string;
    codigoiata?:    string;
    codigoicao?:    string;
    fecharegistro?: Date;
}

export interface Categoria {
    idcategoria?:     number;
    nombre?:          string;
    descripcion?:     string;
    estadocategoria?: boolean;
    tarifa?:          number;
    fecharegistro?:   Date;
    comercial?:       boolean;
}
