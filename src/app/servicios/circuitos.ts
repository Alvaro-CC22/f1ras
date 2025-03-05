import { Circuito } from "../lib/definitions";

export const convertirTiempoASegundos = (tiempo: string): number => {
    const [minutos, segundos] = tiempo.split(":").map(parseFloat);
    return minutos * 60 + segundos;
  };
  
  export const fetchUltimoGanadorCircuito = async (circuitoId: string) => {
    const anioActual = new Date().getFullYear();
    let ultimoGanador = { id: "N/A", resultado: "N/A", anio: "N/A" };
  
    for (let anio = anioActual; anio >= 1950; anio--) {
      const url = `https://ergast.com/api/f1/${anio}/circuits/${circuitoId}/results/1.json`;
      try {
        const response = await fetch(url);
        const json = await response.json();
  
        if (json.MRData.RaceTable.Races.length > 0) {
          const carrera = json.MRData.RaceTable.Races[0];
          const ganador = carrera.Results[0]?.Driver;
          if (ganador) {
            return {
              id: ganador.driverId,
              resultado: `${ganador.givenName} ${ganador.familyName}`,
              anio: `${anio}`,
            };
          }
        }
      } catch (error) {
        console.error(`Error obteniendo el último ganador de ${circuitoId} (${anio}):`, error);
      }
    }
  
    return ultimoGanador;
  };
  
  
  
  // Obtener los circuitos
  export const fetchCircuitos = async (
    anio: number,
    fetchUltimoGanadorCircuito: (
      circuitoId: string,
      tipo: "ganador" | "vueltaRapida"
    ) => Promise<any>,
    circuitosPorAnio: any,
    setCircuitosPorAnio: (data: any) => void
  ): Promise<any[]> => {
    // Verifico si ya han cargado los circuitos de ese año, para no hacer cargas innecesarias
    if (circuitosPorAnio[anio]) {
      return circuitosPorAnio[anio];
    }
  
    const url = `https://ergast.com/api/f1/${anio}.json`;
  
    try {
      const response = await fetch(url);
      const json = await response.json();
  
      const circuitosData = await Promise.all(
        json.MRData.RaceTable.Races.map(async (carrera: any) => {
          const circuitoId = carrera.Circuit.circuitId;
  
          const [ultimoGanador] = await Promise.all([
            fetchUltimoGanadorCircuito(circuitoId, "ganador"),
          ]);
  
          return {
            id: circuitoId,
            nombre: carrera.Circuit.circuitName,
            imagen: `/circuitos/${circuitoId}.avif`,
            fecha: new Date(carrera.date).toLocaleDateString(),
            pais: `${carrera.Circuit.Location.country} (${carrera.Circuit.Location.locality})`,
            ultimoGanador: ultimoGanador.resultado || "N/A",
            anioUltimoGanador: ultimoGanador.anio || "N/A",
            idPiloto: ultimoGanador.id || "N/A",
          };
        })
      );
  
      setCircuitosPorAnio((prevCache: any) => ({
        ...prevCache,
        [anio]: circuitosData,
      }));
  
      return circuitosData;
    } catch (error) {
      console.error("Error obteniendo los circuitos:", error);
      return [];
    }
  };
  
// Función para obtener los datos de un circuito desde la API local
const obtenerCircuitoApiPorId = async (id: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/circuitos/${id}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos del circuito desde la API local');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error desconocido al obtener el circuito desde la API local');
  }
};

// Función para obtener los datos de un circuito combinando la API externa y la API local
export const obtenerCircuitoPorId = async (id: string): Promise<Circuito | null> => {
  try {
    // Obtener los datos de la API externa
    const response = await fetch(`https://ergast.com/api/f1/circuits/${id}.json`);
    if (!response.ok) {
      throw new Error(`Error al obtener los datos del circuito con ID: ${id} desde Ergast`);
    }
    const data = await response.json();
    const circuitoData = data.MRData.CircuitTable.Circuits[0];

    if (!circuitoData) {
      return null;
    }

    // Obtener los datos de la API local
    const datosCircuitoApiLocal = await obtenerCircuitoApiPorId(id);

    const ultimoGanadorData = await fetchUltimoGanadorCircuito(id);

    const circuito: Circuito = {
      id: circuitoData.circuitId,
      nombre: circuitoData.circuitName,
      pais: `${circuitoData.Location.country} (${circuitoData.Location.locality})`,
      longitud: datosCircuitoApiLocal.longitud || "", 
      curvas: datosCircuitoApiLocal.curvas || "", 
      vueltaRecord: datosCircuitoApiLocal.vueltaRecord || "", 
      inauguracion: datosCircuitoApiLocal.inauguracion || "Desconocida", 
      historia: datosCircuitoApiLocal.historia || "", 
      imagen: `/circuitos/${circuitoData.circuitId}.avif`, 
      ultimoGanador: ultimoGanadorData.resultado, 
      anioUltimoGanador: ultimoGanadorData.anio,
      idPiloto: ultimoGanadorData.id,
    };

    return circuito;
  } catch (error) {
    console.error("Error al obtener los datos del circuito", error);
    return null;
  }
};
