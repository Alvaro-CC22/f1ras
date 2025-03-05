export interface Piloto {
    id: string;
    nombre: string;
    acronimo: string;
    edad: number;
    pais: string; 
    fechaNacimiento: string;
    numeroPiloto: number;
    puntos: number;
    equipoId: string;
    equipoNombre: string;
    temporadas: number;
    campeonatos: number;
    victorias:number;
    podios: number;
    poles: number;
    equipoActual: string;
    vueltasRecord: number;
    vueltasRecordId?: number;
    retirado: boolean;
    imagen: string;
    biografia: string;
}

export interface Circuito {
    id: string; 
    nombre: string;
    pais: string; 
    inauguracion: string;
    tipo: string;
    longitud: number;
    fecha: string;
    curvas: number;
    capacidad: number;
    historia: string;
    idPiloto?: string;
    ultimoGanador: string | null;
    anioUltimoGanador: string | null;
    vueltaRapida: string | null;
    anioVueltaRapida: string | null;
    vueltaRecord: string | null; 
    imagen: string; 
    bandera: string; 
}
  

export interface Equipo {
    id: number;
    nombre: string;
    pais: string;
    base: string;
    fundacion: string;
    pilotoId?: number;
    campeonatos: number;
    campeonatosPilotos: string;
    carreras: number;
    victorias: number;
    podios: number;
    poles: number;
    puntos: string;
    vueltasRapidas: number;    
    pilotos: Piloto[];
    imagen: string; 
    historia: string;
}

export interface Campeon {
    id: string;
    anio: number; 
    nombre: string; 
    fechaNacimiento: string; 
    nacionalidad: string; 
    edadGanador: number; 
    edadActual: number; 
    edadFormato: string; 
    equipo: string; 
    puntos: number; 
    victorias: number; 
}
  