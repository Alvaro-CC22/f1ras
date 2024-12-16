export const obtenerCampeones = async (limit: number, offset: number): Promise<{ campeones: any[], total: number }> => {
  const url = `http://ergast.com/api/f1/driverstandings/1.json?limit=${limit}&offset=${offset}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      const campeones = data.MRData.StandingsTable.StandingsLists.map((item: any) => {
          const anio = parseInt(item.season, 10);
          const piloto = item.DriverStandings[0].Driver;
          const equipo = item.DriverStandings[0].Constructors[0].name;
          const puntos = parseFloat(item.DriverStandings[0].points);
          const victorias = parseInt(item.DriverStandings[0].wins, 10);

          const fechaNacimiento = new Date(piloto.dateOfBirth);
          const edadActual = new Date().getFullYear() - fechaNacimiento.getFullYear();
          const edadGanador = anio - fechaNacimiento.getFullYear();

          return {
              id: piloto.driverId, // Agregado: ID único del piloto
              anio,
              nombre: `${piloto.givenName} ${piloto.familyName}`,
              nacionalidad: piloto.nationality,
              fechaNacimiento: piloto.dateOfBirth,
              edadGanador,
              edadActual,
              edadFormato: `${fechaNacimiento.toLocaleDateString()} (${edadActual} años)`,
              equipo,
              puntos,
              victorias,
          };
      });

      const total = parseInt(data.MRData.total, 10); // Extraer el total de la respuesta de la API

      return { campeones, total };
  } catch (error) {
      console.error("Error al obtener los campeones:", error);
      return { campeones: [], total: 0 };
  }
};
