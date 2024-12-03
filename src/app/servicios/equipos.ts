
import { Equipo } from "../lib/definitions";

/* export const obtenerClasificacionConstructores = async (anio: number) => {
  const url = `https://ergast.com/api/f1/${anio}/constructorStandings.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const standingsList = data.MRData.StandingsTable.StandingsLists;

    if (!standingsList || standingsList.length === 0) {
      console.warn("No se encontraron datos de clasificación");
      return [];
    }

    // Extraer clasificación con nombre del equipo, puntos y posición
    const clasificacion = standingsList[0].ConstructorStandings.map((standing: any) => ({
      nombre: standing.Constructor.name,
      posicion: parseInt(standing.position, 10),
      puntos: parseFloat(standing.points),
    }));

    return clasificacion.sort((a: any, b: any) => a.posicion - b.posicion);
  } catch (error) {
    console.error("Error obteniendo la clasificación de constructores", error);
    return [];
  }
};
 */

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

export const obtenerVictoriasPorConstructor = async (anio: number) => {
  const url = `https://ergast.com/api/f1/${anio}/results/1.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const carreras = data.MRData.RaceTable.Races;

    const victoriasPorConstructor: { [key: string]: number } = {};

    // Recorre todas las carreras
    carreras.forEach((carrera: any) => {
      const ganador = carrera.Results[0].Constructor.name;
      if (ganador) {
        if (victoriasPorConstructor[ganador]) {
          victoriasPorConstructor[ganador] += 1;
        } else {
          victoriasPorConstructor[ganador] = 1;
        }
      }
    });

    return victoriasPorConstructor;
  } catch (error) {
    console.error("Error obteniendo victorias de constructores", error);
    return {};
  }
};

export const obtenerClasificacionConstructores = async (anio: number) => {
  const url = `https://ergast.com/api/f1/${anio}/constructorStandings.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const standingsList = data.MRData.StandingsTable.StandingsLists;

    if (!standingsList || standingsList.length === 0) {
      console.warn("No se encontraron datos de clasificación");
      return [];
    }

    // Obtiene la clasificación de los constructores
    const clasificacion = standingsList[0].ConstructorStandings.map((standing: any) => ({
      nombre: standing.Constructor.name,
      posicion: parseInt(standing.position, 10),
      puntos: parseFloat(standing.points),
      victorias: parseInt(standing.wins, 10),
      nacionalidad: standing.Constructor.nationality,
      constructorId: standing.Constructor.constructorId,
      url: standing.Constructor.url,
    }));

    return clasificacion.sort((a: any, b: any) => a.posicion - b.posicion);
  } catch (error) {
    console.error("Error obteniendo la clasificación de constructores", error);
    return [];
  }
};

