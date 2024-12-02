export const convertirTiempoASegundos = (tiempo: string): number => {
    const [minutos, segundos] = tiempo.split(":").map(parseFloat);
    return minutos * 60 + segundos;
  };
  
  export const fetchDatosCircuito = async (
    circuitoId: string,
    tipo: "ganador" | "vueltaRapida"
  ) => {
    const anioActual = new Date().getFullYear();
    let ultimoGanador = { resultado: "N/A", anio: "N/A" };
    let vueltaRapidaData = { resultado: "N/A", anio: "N/A", tiempo: "N/A" };
  
    if (tipo === "ganador") {
      // Busca al ganador más reciente y para al encontrarlo
      for (let anio = anioActual; anio >= 1950; anio--) {
        const url = `https://ergast.com/api/f1/${anio}/circuits/${circuitoId}/results.json`;
        try {
          const response = await fetch(url);
          const json = await response.json();
  
          if (json.MRData.RaceTable.Races.length > 0) {
            const carrera = json.MRData.RaceTable.Races[0];
            const ganador = carrera.Results[0]?.Driver;
            if (ganador) {
              ultimoGanador = {
                resultado: `${ganador.givenName} ${ganador.familyName}`,
                anio: `${anio}`,
              };
              break; 
            }
          }
        } catch (error) {
          console.error(`Error obteniendo ${tipo} de ${circuitoId} (${anio}):`, error);
        }
      }
    }
  
    return tipo === "ganador" ? ultimoGanador : vueltaRapidaData;
  };
  
  // Obtener los circuitos
  export const fetchCircuitos = async (
    anio: number,
    fetchDatosCircuito: (
      circuitoId: string,
      tipo: "ganador" | "vueltaRapida"
    ) => Promise<any>,
    circuitosPorAnio: any,
    setCircuitosPorAnio: (data: any) => void
  ): Promise<any[]> => {
    // Verificamos si ya han cargado los circuitos de ese año (para no hacer cargas innecesarias)
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
  
          // Obtener los datos del ganador de cada circuito
          const [ultimoGanador] = await Promise.all([
            fetchDatosCircuito(circuitoId, "ganador"),
          ]);
  
          return {
            id: circuitoId,
            nombre: carrera.Circuit.circuitName,
            imagen: `/circuitos/${circuitoId}.avif`,
            fecha: new Date(carrera.date).toLocaleDateString(),
            pais: `${carrera.Circuit.Location.country} (${carrera.Circuit.Location.locality})`,
            ultimoGanador: ultimoGanador.resultado || "N/A",
            anioUltimoGanador: ultimoGanador.anio || "N/A",
          };
        })
      );
  
      // Guardamos los circuitos cargados en cache
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
  