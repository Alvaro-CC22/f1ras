"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piloto } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";

export default function Home() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [anio, setAnio] = useState<number>(2024); // Año predeterminado

  // Función para obtener victorias, podios, puntos y equipo del piloto
  const obtenerVictoriasPodiosPuntosYEquipo = async (driverId: string, anio: number): Promise<{ victorias: number, podios: number, puntos: number, equipo: string }> => {
    try {
      const url = `https://ergast.com/api/f1/${anio}/drivers/${driverId}/results.json`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.MRData.RaceTable || !data.MRData.RaceTable.Races) {
        console.error('No se encontraron carreras para este piloto');
        return { victorias: 0, podios: 0, puntos: 0, equipo: 'Desconocido' };
      }

      let victorias = 0;
      let podios = 0;
      let puntos = 0;
      let equipo = '';

      data.MRData.RaceTable.Races.forEach((race: any) => {
        race.Results.forEach((result: any) => {
          const posicion = parseInt(result.position);
          if (posicion === 1) victorias++;
          if ([1, 2, 3].includes(posicion)) podios++;
          puntos += result.points ? parseFloat(result.points) : 0;
          if (!equipo && result.Constructor) equipo = result.Constructor.name;
        });
      });

      return { victorias, podios, puntos, equipo };
    } catch (error) {
      console.error(`Error al obtener resultados para ${driverId} en ${anio}:`, error);
      return { victorias: 0, podios: 0, puntos: 0, equipo: 'Desconocido' };
    }
  };

  useEffect(() => {
    const obtenerPilotosPorAnio = async (anio: number): Promise<Piloto[]> => {
      const url = `http://ergast.com/api/f1/${anio}/drivers.json`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const pilotos = data.MRData.DriverTable.Drivers;

        const pilotosConDatos = await Promise.all(
          pilotos.map(async (piloto: any, index: number): Promise<Piloto> => {
            const nacimiento = new Date(piloto.dateOfBirth);
            const edad = new Date().getFullYear() - nacimiento.getFullYear();

            const { victorias, podios, puntos, equipo } = await obtenerVictoriasPodiosPuntosYEquipo(piloto.driverId, anio);

            return {
              id: index + 1,
              nombre: `${piloto.givenName} ${piloto.familyName}`,
              acronimo: piloto.code || "N/A",
              edad: edad,
              fechaNacimiento: piloto.dateOfBirth,
              numeroPiloto: parseInt(piloto.permanentNumber || "0"),
              equipo: equipo, // Equipo del piloto
              temporadas: 1,
              campeonatos: 0,
              victorias: victorias,
              podios: podios,
              puntos: puntos,
              poles: 0,
              vueltasRecord: 0,
              vueltasRecordId: undefined,
              retirado: false,
            };
          })
        );

        pilotosConDatos.sort((a, b) => b.puntos - a.puntos); // Ordena los pilotos por puntos

        return pilotosConDatos;
      } catch (error) {
        console.error("Error al obtener los pilotos:", error);
        return [];
      }
    };

    obtenerPilotosPorAnio(anio).then((data) => setPilotos(data));
  }, [anio]); // Dependemos del año para actualizar los datos

  return (
    <div>
      <h1>Pilotos de F1 - Temporada {anio}</h1>
      <div>
        <label htmlFor="anio">Seleccionar Año:</label>
        <select
          id="anio"
          value={anio}
          onChange={(e) => setAnio(parseInt(e.target.value))}
        >
          {Object.keys(añosDisponibles).map((year) => (
            <option key={year} value={year}>
              {añosDisponibles[parseInt(year)]}
            </option>
          ))}
        </select>
      </div>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Nombre</th>
            <th>Acrónimo</th>
            <th>Edad</th>
            <th>Fecha de Nacimiento</th>
            <th>Número de Piloto</th>
            <th>Equipo</th> 
            <th>Victorias</th>
            <th>Podios</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {pilotos.map((piloto, index) => (
            <tr key={piloto.id}>
              <td>{index + 1}</td>
              <td>
                <Link href={`/pilotos/${anio}/${piloto.id}`}>
                  {piloto.nombre}
                </Link>
              </td>
              <td>{piloto.acronimo}</td>
              <td>{piloto.edad}</td>
              <td>{new Date(piloto.fechaNacimiento).toLocaleDateString()}</td>
              <td>{piloto.numeroPiloto}</td>
              <td>{piloto.equipo}</td> 
              <td>{piloto.victorias}</td>
              <td>{piloto.podios}</td>
              <td>{piloto.puntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
