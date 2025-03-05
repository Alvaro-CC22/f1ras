import { Piloto } from "../lib/definitions";

export const obtenerResultados = async (
  driverId: string,
  anio: number
): Promise<Partial<Piloto>> => {
  try {
    const urlResultados = `https://ergast.com/api/f1/${anio}/drivers/${driverId}/results.json`;
    const urlSprint = `https://ergast.com/api/f1/${anio}/drivers/${driverId}/sprint.json`;

    const [resultadosResponse, sprintResponse] = await Promise.all([
      fetch(urlResultados),
      fetch(urlSprint),
    ]);

    const dataResultados = await resultadosResponse.json();
    const dataSprint = await sprintResponse.json();

    let victorias = 0;
    let podios = 0;
    let puntos = 0;
    let equipoId = "";

    // Recoge datos de las carreras normales
    if (dataResultados.MRData.RaceTable?.Races) {
      dataResultados.MRData.RaceTable.Races.forEach((race: any) => {
        race.Results.forEach((result: any) => {
          const posicion = parseInt(result.position);
          if (posicion === 1) victorias++;
          if ([1, 2, 3].includes(posicion)) podios++;
          puntos += result.points ? parseFloat(result.points) : 0;
          if (!equipoId && result.Constructor) equipoId = result.Constructor.constructorId;
        });
      });
    }

    // Recoge datos de las carreras sprints
    if (dataSprint.MRData.RaceTable?.Races) {
      dataSprint.MRData.RaceTable.Races.forEach((race: any) => {
        race.SprintResults.forEach((sprintResult: any) => {
          if (sprintResult.points) {
            puntos += parseFloat(sprintResult.points);
          }
        });
      });
    }

    return { victorias, podios, puntos, equipoId };
  } catch (error) {
    console.error(`Error al obtener resultados para ${driverId} en ${anio}:`, error);
    return { victorias: 0, podios: 0, puntos: 0, equipoId: "desconocido" };
  }
};

export const calcularPodiosPiloto = async (anio: number, driverId: string): Promise<number> => {
  const url = `https://ergast.com/api/f1/${anio}/drivers/${driverId}/results.json`;

  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`Error al obtener los resultados de ${driverId} en el año ${anio}.`);
  }

  const datos = await respuesta.json();
  const carreras = datos.MRData.RaceTable.Races;

  if (!carreras || carreras.length === 0) {
    return 0;
  }

  const podios = carreras.filter((carrera: any) => {
    const resultado = carrera.Results.find((resultado: any) => resultado.Driver.driverId === driverId);
    return resultado && ["1", "2", "3"].includes(resultado.position);
  });

  return podios.length;
};

export const obtenerPrimerAnioParticipacion = async (driverId: string): Promise<number> => {
  try {
    const urlPrimerAnio = `https://ergast.com/api/f1/drivers/${driverId}/seasons.json`;
    const response = await fetch(urlPrimerAnio);
    
    if (!response.ok) {
      throw new Error('Error al obtener el primer año de participación');
    }

    const data = await response.json();
    const primeraTemporada = data.MRData.SeasonTable.Seasons[0].season;
    return parseInt(primeraTemporada); 
  } catch (error) {
    console.error(`Error al obtener el primer año de participación para ${driverId}:`, error);
    return 2000;
  }
};


export const obtenerResultadosCarrera = async (
  driverId: string
): Promise<Partial<Piloto>> => {
  try {
    const urlDriverStandings = `https://ergast.com/api/f1/drivers/${driverId}/driverStandings.json`;
    let urlResultadosBase = `https://ergast.com/api/f1/drivers/${driverId}/results.json?limit=30&offset=`;

    // Obtener las clasificaciones
    const standingsResponse = await fetch(urlDriverStandings);
    if (!standingsResponse.ok) throw new Error("Error en driverStandings");
    const standingsData = await standingsResponse.json();
    const standingsLists = standingsData?.MRData?.StandingsTable?.StandingsLists || [];

    let puntos = 0;
    let campeonatos = 0;
    let equipoId = "";
    let victorias = 0;

    // Procesa las clasificaciones
    standingsLists.forEach((season: any) => {
      const driverStandings = season.DriverStandings[0];

      if (driverStandings) {
        puntos += driverStandings.points ? parseFloat(driverStandings.points) : 0;

        if (driverStandings.position === "1") {
          campeonatos++;
        }

        if (!equipoId && driverStandings.Constructors?.length > 0) {
          equipoId = driverStandings.Constructors[0].constructorId;
        }
      }
    });

    // Paginar para obtener todas las carreras
    let offset = 0;
    let hasMoreResults = true;

    while (hasMoreResults) {
      const urlResultados = `${urlResultadosBase}${offset}`;
      const resultadosResponse = await fetch(urlResultados);
      if (!resultadosResponse.ok) throw new Error("Error en results.json");
      
      const resultadosData = await resultadosResponse.json();
      const raceResults = resultadosData?.MRData?.RaceTable?.Races || [];

      if (raceResults.length === 0) {
        hasMoreResults = false; 
      } else {
        // Procesamos las carreras obtenidas
        raceResults.forEach((race: any) => {
          if (race.Results) {
            race.Results.forEach((result: any) => {
              if (result.Driver.driverId === driverId && parseInt(result.position) === 1) {
                victorias++;
              }
            });
          }
        });

        offset += 30;
      }
    }

    return { puntos, campeonatos, equipoId, victorias };
  } catch (error) {
    console.error(`Error al obtener estadísticas para ${driverId}:`, error);
    return { puntos: 0, campeonatos: 0, equipoId: "desconocido", victorias: 0 };
  }
};



// Función para obtener el piloto desde API local
export const obtenerPilotoApiPorId = async (id: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/piloto/${id}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos del piloto');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Error desconocido al obtener el piloto');
  }
};

// Función para obtener los datos del piloto desde ambas APIs
export const obtenerPilotoPorId = async (id: string): Promise<Piloto> => {
  // Obtener los datos de la API externa
  const response = await fetch(`https://ergast.com/api/f1/drivers/${id}.json`);
  const data = await response.json();
  const pilotoData = data.MRData.DriverTable.Drivers[0];

  // Obtener los datos de la API local
  const datosPilotoApiLocal = await obtenerPilotoApiPorId(id);

  // Obtener los resultados a través de la función obtenerResultadosCarrera, que calcula todas las estadisticas de toda su carrera como piloto
  const { victorias, puntos, campeonatos } = await obtenerResultadosCarrera(id);

  const piloto: Piloto = {
    id: pilotoData.driverId,
    nombre: `${pilotoData.givenName} ${pilotoData.familyName}`,
    acronimo: pilotoData.code || "N/A",
    edad: new Date().getFullYear() - new Date(pilotoData.dateOfBirth).getFullYear(),
    pais: pilotoData.nationality,
    fechaNacimiento: pilotoData.dateOfBirth,
    numeroPiloto: pilotoData.permanentNumber ? parseInt(pilotoData.permanentNumber) : 0,
    puntos: puntos || 0,
    equipoId: datosPilotoApiLocal.equipoId || "",
    equipoActual: datosPilotoApiLocal.equipoActual || "",
    temporadas: datosPilotoApiLocal.temporadas || 0,
    campeonatos: campeonatos || 0,
    victorias: victorias || 0, 
    podios: datosPilotoApiLocal.podios || 0,
    poles: datosPilotoApiLocal.poles || 0,
    vueltasRecord: datosPilotoApiLocal.fastLaps || 0,
    imagen: datosPilotoApiLocal.imagen || "",
    biografia: datosPilotoApiLocal.biografia || "",
    retirado: pilotoData.status === "Retired", 
  };

  return piloto;
};






export const obtenerClasificacionPilotos = async (anio: number): Promise<Piloto[]> => {
  const url = `https://ergast.com/api/f1/${anio}/driverStandings.json`;

  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("Error al obtener la clasificación de pilotos.");
  }

  const datos = await respuesta.json();
  const standings = datos.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;

  if (!standings) {
    throw new Error(`No se encontraron datos para el año ${anio}.`);
  }

  const pilotos = await Promise.all(
    standings.map(async (piloto: any) => {
      const fechaNacimiento = piloto.Driver.dateOfBirth;
      const edad = calcularEdad(fechaNacimiento);

      return {
        id: piloto.Driver.driverId,
        nombre: `${piloto.Driver.givenName} ${piloto.Driver.familyName}`,
        acronimo: piloto.Driver.code || "N/A",
        edad,
        pais: piloto.Driver.nationality,
        fechaNacimiento,
        numeroPiloto: piloto.Driver.permanentNumber ? parseInt(piloto.Driver.permanentNumber, 10) : 0,
        puntos: parseFloat(piloto.points),
        equipoId: piloto.Constructors[0]?.constructorId || undefined,
        equipoNombre: piloto.Constructors[0]?.name || undefined,
        temporadas: 1,
        campeonatos: 0,
        victorias: parseInt(piloto.wins, 10),
        podios: 0,
        poles: 0,
        vueltasRecord: 0,
        vueltasRecordId: undefined,
        retirado: false,
      };
    })
  );

  return pilotos;
};

export const obtenerClasificacionPilotosDetallada = async (anio: number): Promise<Piloto[]> => {
  const url = `https://ergast.com/api/f1/${anio}/driverStandings.json`;

  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("Error al obtener la clasificación de pilotos.");
  }

  const datos = await respuesta.json();
  const standings = datos.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;

  if (!standings) {
    throw new Error(`No se encontraron datos para el año ${anio}.`);
  }

  const pilotos = await Promise.all(
    standings.map(async (piloto: any) => {
      const fechaNacimiento = piloto.Driver.dateOfBirth;
      const edad = calcularEdad(fechaNacimiento);
      const podios = await calcularPodiosPiloto(anio, piloto.Driver.driverId);

      return {
        id: piloto.Driver.driverId,
        nombre: `${piloto.Driver.givenName} ${piloto.Driver.familyName}`,
        acronimo: piloto.Driver.code || "N/A",
        edad,
        pais: piloto.Driver.nationality,
        fechaNacimiento,
        numeroPiloto: piloto.Driver.permanentNumber ? parseInt(piloto.Driver.permanentNumber, 10) : 0,
        puntos: parseFloat(piloto.points),
        equipoId: piloto.Constructors[0]?.constructorId || undefined,
        equipoNombre: piloto.Constructors[0]?.name || undefined,
        temporadas: 1,
        campeonatos: 0,
        victorias: parseInt(piloto.wins, 10),
        podios,
        poles: 0,
        vueltasRecord: 0,
        vueltasRecordId: undefined,
        retirado: false,
      };
    })
  );

  return pilotos;
};



export const obtenerPilotosPorAnio = async (anio: number): Promise<Piloto[]> => {
  const url = `https://ergast.com/api/f1/${anio}/drivers.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.MRData.DriverTable.Drivers.map((driver: any): Piloto => ({
      id: driver.driverId,
      nombre: `${driver.givenName} ${driver.familyName}`,
      acronimo: driver.code || driver.driverId,
      edad: calcularEdad(driver.dateOfBirth),
      pais: driver.nationality,
      fechaNacimiento: driver.dateOfBirth,
      numeroPiloto: parseInt(driver.permanentNumber || "0"),
      puntos: 0, 
      equipoId: undefined, 
      temporadas: 0, 
      campeonatos: 0,
      victorias: 0,
      podios: 0, 
      poles: 0, 
      vueltasRecord: 0,
      vueltasRecordId: undefined, 
      retirado: false, 
    }));
  } catch (error) {
    console.error("Error al obtener los pilotos:", error);
    return [];
  }
};

export const obtenerEquipoDePiloto = async (
  anio: number,
  driverId: string
): Promise<{ id: string, nombre: string }> => {
  try {
    const response = await fetch(
      `https://ergast.com/api/f1/${anio}/drivers/${driverId}/constructors.json`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener el equipo para el piloto ${driverId}`);
    }

    const data = await response.json();

    if (data.MRData.ConstructorTable.Constructors.length > 0) {
      const constructor = data.MRData.ConstructorTable.Constructors[0];
      return { id: constructor.constructorId, nombre: constructor.name };
    } else {
      return { id: "Desconocido", nombre: "Desconocido" };
    }
  } catch (error) {
    console.error("Error en la solicitud de equipo", error);
    return { id: "Desconocido", nombre: "Desconocido" }; 
  }
};


// Función para calcular la edad
const calcularEdad = (fechaNacimiento: string): number => {
  const fechaNac = new Date(fechaNacimiento);
  const diferenciaMs = Date.now() - fechaNac.getTime();
  const edadFecha = new Date(diferenciaMs);
  return Math.abs(edadFecha.getUTCFullYear() - 1970);
};
