"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piloto } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import { obtenerPilotosPorAnio, obtenerResultados } from "../servicios/pilotos";
import Navbar from "../componentes/navbar";
import { obtenerClasificacionConstructores } from "../servicios/equipos";

export default function Home() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [anio, setAnio] = useState<number>(2024);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatosPilotos = async () => {
      setLoading(true); // Iniciar carga

      try {
        // Primero, intentar obtener los datos de la clasificación desde localStorage
        const clasificacionCache = localStorage.getItem(`constructorStandings-${anio - 1}`);
        let clasificacionConstructores;

        if (clasificacionCache) {
          clasificacionConstructores = JSON.parse(clasificacionCache);
        } else {
          // Si no hay caché, obtener los datos de la API
          clasificacionConstructores = await obtenerClasificacionConstructores(anio - 1);
          localStorage.setItem(`constructorStandings-${anio - 1}`, JSON.stringify(clasificacionConstructores));
        }

        // Obtener pilotos en paralelo con los resultados de cada uno
        const pilotosBase = await obtenerPilotosPorAnio(anio);
        const pilotosConDatos = await Promise.all(
          pilotosBase.map(async (piloto: any): Promise<Piloto> => {
            const nacimiento = new Date(piloto.dateOfBirth);
            const edad = anio - nacimiento.getFullYear();

            const { victorias, podios, puntos, equipo } = await obtenerResultados(piloto.driverId, anio);

            return {
              id: piloto.driverId,
              nombre: `${piloto.givenName} ${piloto.familyName}`,
              acronimo: piloto.code || "N/A",
              edad: edad,
              fechaNacimiento: piloto.dateOfBirth,
              numeroPiloto: parseInt(piloto.permanentNumber || "0"),
              equipo: equipo,
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

        // Agrupar pilotos por equipo
        const equiposAgrupados = pilotosConDatos.reduce((equipos: Record<string, Piloto[]>, piloto) => {
          if (!equipos[piloto.equipo]) equipos[piloto.equipo] = [];
          equipos[piloto.equipo].push(piloto);
          return equipos;
        }, {});

        // Ordenar los equipos según la clasificación de constructores
        const equiposOrdenados = Object.keys(equiposAgrupados).sort(
          (a, b) => (clasificacionConstructores[a] || Infinity) - (clasificacionConstructores[b] || Infinity)
        );

        // Actualizar el estado con los datos obtenidos
        setPilotos(pilotosConDatos);

      } catch (error) {
        console.error("Error cargando los datos", error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    cargarDatosPilotos();
  }, [anio]); // Solo se ejecuta cuando cambia el año

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
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

      {/* Tabla única con todos los pilotos ordenados por equipo */}
      <table
        className="table"
        style={{
          width: "100%",
          textAlign: "left",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Nombre</th>
            <th style={{ width: "15%" }}>Acrónimo</th>
            <th style={{ width: "10%" }}>Edad</th>
            <th style={{ width: "15%" }}>Fecha de Nacimiento</th>
            <th style={{ width: "15%" }}>Número Piloto</th>
            <th style={{ width: "15%" }}>Equipo</th>
          </tr>
        </thead>
        <tbody>
          {pilotos
            .sort((a, b) => a.equipo.localeCompare(b.equipo)) // Ordenar por equipo
            .map((piloto) => (
              <tr key={piloto.id}>
                <td
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Link href={`/pilotos/${anio}/${piloto.id}`}>
                    {piloto.nombre}
                  </Link>
                </td>
                <td>{piloto.acronimo}</td>
                <td>{piloto.edad}</td>
                <td>{new Date(piloto.fechaNacimiento).toLocaleDateString()}</td>
                <td>{piloto.numeroPiloto}</td>
                <td>{piloto.equipo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
