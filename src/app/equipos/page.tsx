"use client";
import { useEffect, useState } from 'react';
import { Equipo } from '../types';
import Navbar from '../componentes/navbar';
import Link from 'next/link';
import { añosDisponibles } from '../lib/const';

const Equipos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [anio, setAnio] = useState<number>(2024);

  // Función para obtener los datos de los equipos
  const fetchEquipos = async () => {
    const url = `https://ergast.com/api/f1/${anio}/constructors.json`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      const equiposData: Equipo[] = await Promise.all(
        data.MRData.ConstructorTable.Constructors.map(async (constructor: any) => {
          // Obtener los pilotos para este constructor
          const pilotosResponse = await fetch(`https://ergast.com/api/f1/${anio}/constructors/${constructor.constructorId}/drivers.json`);
          const pilotosData = await pilotosResponse.json();

          // Mapear los pilotos a un formato más usable
          const pilotos = pilotosData.MRData.DriverTable.Drivers.map((driver: any) => ({
            id: driver.driverId,
            nombre: `${driver.givenName} ${driver.familyName}`,
            acronimo: driver.code || 'N/A',
          }));

          return {
            id: constructor.constructorId,
            nombre: constructor.name,
            pais: constructor.nationality,
            base: constructor.base,
            fechaInauguracion: constructor.founded,
            campeonatos: constructor.championships,
            carreras: constructor.races,
            victorias: constructor.wins,
            podios: constructor.podiums,
            poles: constructor.poles,
            vueltasRapidas: constructor.fastestLaps,
            pilotos: pilotos,  // Añadir los pilotos a la alineación
          };
        })
      );
      
      // Ordenar equipos alfabéticamente por nombre
      equiposData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setEquipos(equiposData);
    } catch (error) {
      console.error('Error fetching equipos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usar useEffect para cargar los datos al montar el componente
  useEffect(() => {
    fetchEquipos();
  }, [anio]); // Dependencia del año, recarga cuando cambia el año

  if (loading) {
    return <div><Navbar />Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Equipos de F1 ({anio})</h1>
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
      <table
        style={{
          width: "100%",
          textAlign: "left",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Nombre</th>
            <th style={{ width: "15%" }}>Pais</th>
            <th style={{ width: "20%" }}>Pilotos</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Link href={`/equipos/${anio}/${equipo.id}`}>
                  {equipo.nombre}
                </Link>
              </td>
              <td>{equipo.pais}</td>
              <td>
                {equipo.pilotos.map((piloto) => (
                  <div key={piloto.id}>
                    <Link href={`/pilotos/${anio}/${piloto.id}`}>
                      {piloto.nombre} ({piloto.acronimo})
                    </Link>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Equipos;
