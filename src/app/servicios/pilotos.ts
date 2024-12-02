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
): Promise<string> => {
  try {
    const response = await fetch(
      `https://ergast.com/api/f1/${anio}/drivers/${driverId}/constructors.json`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener el equipo para el piloto ${driverId}`);
    }

    const data = await response.json();

    // Si la respuesta contiene datos de constructores, devolvemos el nombre del equipo
    return data.MRData.ConstructorTable.Constructors.length > 0
      ? data.MRData.ConstructorTable.Constructors[0].name
      : "Desconocido";
  } catch (error) {
    console.error("Error en la solicitud de equipo", error);
    return "Desconocido"; // Si hay error, devolvemos "Desconocido"
  }
};

// Función auxiliar para calcular la edad
const calcularEdad = (fechaNacimiento: string): number => {
  const fechaNac = new Date(fechaNacimiento);
  const diferenciaMs = Date.now() - fechaNac.getTime();
  const edadFecha = new Date(diferenciaMs);
  return Math.abs(edadFecha.getUTCFullYear() - 1970);
};
