export const obtenerResultados = async (
    driverId: string,
    anio: number
  ): Promise<{ victorias: number; podios: number; puntos: number; equipo: string }> => {
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
      let equipo = '';
  
      // Procesar carreras regulares
      if (dataResultados.MRData.RaceTable?.Races) {
        dataResultados.MRData.RaceTable.Races.forEach((race: any) => {
          race.Results.forEach((result: any) => {
            const posicion = parseInt(result.position);
            if (posicion === 1) victorias++;
            if ([1, 2, 3].includes(posicion)) podios++;
            puntos += result.points ? parseFloat(result.points) : 0;
            if (!equipo && result.Constructor) equipo = result.Constructor.name;
          });
        });
      }
  
      // Procesar carreras sprint
      if (dataSprint.MRData.RaceTable?.Races) {
        dataSprint.MRData.RaceTable.Races.forEach((race: any) => {
          race.SprintResults.forEach((sprintResult: any) => {
            if (sprintResult.points) {
              puntos += parseFloat(sprintResult.points);
            }
          });
        });
      }
  
      return { victorias, podios, puntos, equipo };
    } catch (error) {
      console.error(`Error al obtener resultados para ${driverId} en ${anio}:`, error);
      return { victorias: 0, podios: 0, puntos: 0, equipo: 'Desconocido' };
    }
  };
  
  export const obtenerPilotosPorAnio = async (anio: number): Promise<any[]> => {
    const url = `https://ergast.com/api/f1/${anio}/drivers.json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.MRData.DriverTable.Drivers;
    } catch (error) {
      console.error("Error al obtener los pilotos:", error);
      return [];
    }
  };
  