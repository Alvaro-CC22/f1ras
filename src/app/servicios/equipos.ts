// servicios/equipos.ts
import { Equipo } from "../lib/definitions";

// servicios/equipos.ts
// servicios/equipos.ts
export const obtenerClasificacionConstructores = async (anio: number) => {
    const url = `https://ergast.com/api/f1/${anio}/constructorStandings.json`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
  
      // Acceder correctamente a StandingsLists y verificar si existe
      const standingsList = data.MRData.StandingsTable.StandingsLists;
      if (!standingsList || standingsList.length === 0) {
        console.warn('No se encontraron datos de clasificación');
        return {}; // Retornamos un objeto vacío si no hay datos
      }
  
      // Mapeamos la clasificación en un objeto que asocie el nombre del equipo con su posición
      const clasificacion: Record<string, number> = {};
  
      standingsList[0].ConstructorStandings.forEach((standing: any) => {
        const equipo = standing.Constructor.name;
        const posicion = parseInt(standing.position, 10);
        clasificacion[equipo] = posicion;
      });
  
      return clasificacion;
  
    } catch (error) {
      console.error('Error obteniendo la clasificación de constructores', error);
      return {};
    }
  };
  

export const obtenerEquiposPorAnio = async (anio: number): Promise<Equipo[]> => {
  const url = `https://ergast.com/api/f1/${anio}/constructors.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const equipos = data.MRData.ConstructorTable.Constructors;
    return equipos.map((equipo: any) => ({
      id: equipo.id,
      nombre: equipo.nombre,
      pais: equipo.pais,
      base: equipo.base,
      fechaInauguracion: equipo.añoInauguracion,
      campeonatos: equipo.campeonatos || 0,
      carreras: equipo.carreras || 0,
      victorias: equipo.victorias || 0,
      podios: equipo.podios || 0,
      poles: equipo.poles || 0,
      vueltasRapidas: equipo.fastestLaps || 0,
    }));
  } catch (error) {
    console.error(`Error al obtener equipos para el año ${anio}:`, error);
    return [];
  }
};
