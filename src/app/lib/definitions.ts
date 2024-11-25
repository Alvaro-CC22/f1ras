export interface Piloto {
    id: number;
    nombre: string;
    acronimo: string;
    edad: number;
    fechaNacimiento: string;
    numeroPiloto: number;
    equipoId?: number;
    temporadas: number;
    campeonatos: number;
    victorias:number;
    podios: number;
    poles:number;
    vueltasRecord: number;
    vueltasRecordId?: number;
    retirado:boolean;
}

export interface Circuito {
    id: number;
    nombre: string;
    pais: number;
    fechaInauguracion: string;
    tipo: string;
    longitud: number;
    curvas: number;
    capacidad: number;
    pilotoRecordId?: number;
}

    export interface Equipo {
        id: number;
        nombre: string;
        pais: number;
        base: string;
        fechaInauguracion: string;
        pilotoId?: number;
        campeonatos: number;
        carreras: number;
        victorias: number;
        podios: number;
        poles: number;
        vueltasRapidas: number;
    }