export interface Piloto {
    id: string;
    nombre: string;
    acronimo: string;
    edad: number;
    pais: string; 
    fechaNacimiento: string;
    numeroPiloto: number;
    puntos: number;
    equipoId?: string;
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
    fecha: string;
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
    pais: string;
    base: string;
    fechaInauguracion: string;
    pilotoId?: number;
    campeonatos: number;
    carreras: number;
    victorias: number;
    podios: number;
    poles: number;
    vueltasRapidas: number;    
    pilotos: Piloto[];
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
  