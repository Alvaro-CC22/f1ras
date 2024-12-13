"use client";
import { useEffect, useState } from 'react';
import Navbar from '../componentes/navbar';
import Link from 'next/link';
import { añosDisponibles } from '../lib/const';
import { obtenerPaisDesdeNacionalidad } from './../lib/utils';
import { Equipo } from '../lib/definitions';

const Equipos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [anio, setAnio] = useState<number>(2024);

  // Obtener todos los equipos
  const fetchEquipos = async () => {
    const url = `https://ergast.com/api/f1/${anio}/constructors.json`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      const equiposData: Equipo[] = await Promise.all(
        data.MRData.ConstructorTable.Constructors.map(async (constructor: any) => {
          // Obtener los pilotos de cada equipo
          const pilotosResponse = await fetch(`https://ergast.com/api/f1/${anio}/constructors/${constructor.constructorId}/drivers.json`);
          const pilotosData = await pilotosResponse.json();

          // Obtener pilotos con los datos necesarios
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
            pilotos: pilotos,
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

  // Usar useEffect para cargar los datos que recarga cuando al cambiar el año
  useEffect(() => {
    fetchEquipos();
  }, [anio]); 

  if (loading) {
    return <div>
      <Navbar />
    <h1 style={{ fontFamily: 'nombres'}} className="text-xl pt-5">Equipos de F1 ({anio})</h1>
      <div className="text-lg pt-5 pb-3" style={{ fontFamily: 'titulos'}}>
        <label htmlFor="anio" >Seleccionar Año = </label>
        <select
        style={{ fontFamily: 'titulos'}}
        className="text-lg pt-1"
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
        className="table pt-1"
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <thead style={{ fontFamily: 'titulos'}}>
          <tr>
            <th style={{ width: "20%" }}>Nombre</th>
            <th style={{ width: "15%" }}>País</th>
            <th style={{ width: "20%" }}>Pilotos</th>
          </tr>
        </thead>
        </table> 
      <p style={{ fontFamily: 'normal' }}>Cargando...</p>
      </div>;
  }

  return (
    <div className="w-fit">
      <Navbar />
      <h1 style={{ fontFamily: 'nombres'}} className="text-xl pt-5">Equipos de F1 ({anio})</h1>
      <div className="text-lg pt-5 pb-3" style={{ fontFamily: 'titulos'}}>
        <label htmlFor="anio" >Seleccionar Año = </label>
        <select
        style={{ fontFamily: 'titulos'}}
        className="text-lg "
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
        className="table pt-1"
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <thead style={{ fontFamily: 'titulos'}}>
          <tr>
            <th style={{ width: "20%" }}>Nombre</th>
            <th style={{ width: "15%" }}>País</th>
            <th style={{ width: "20%" }}>Pilotos</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'normal'}} >
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
              <td>{obtenerPaisDesdeNacionalidad(equipo.pais)}</td>
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
