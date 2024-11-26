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
    id: string; 
    nombre: string;
    pais: string; 
    fechaInauguracion: string;
    tipo: string;
    longitud: number;
    curvas: number;
    capacidad: number;
    pilotoRecordId?: number;
    ultimoGanador: string | null;
    anioUltimoGanador: string | null;
    vueltaRapida: string | null;
    anioVueltaRapida: string | null;
    tiempoVueltaRapida: string | null; 
    imagen: string; 
    bandera: string; 
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