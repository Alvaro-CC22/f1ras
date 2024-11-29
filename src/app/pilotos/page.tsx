"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piloto } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import { obtenerEquipoDePiloto, obtenerPilotosPorAnio, obtenerResultados } from "../servicios/pilotos";
import Navbar from "../componentes/navbar";
import { obtenerClasificacionConstructores } from "../servicios/equipos";
import { obtenerPaisDesdeNacionalidad } from "../lib/utils";

export default function Home() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [anio, setAnio] = useState<number>(2024);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatosPilotos = async () => {
      setLoading(true); // Iniciar carga
      try {
        const pilotosBase = await obtenerPilotosPorAnio(anio);

        const pilotosConDatos = await Promise.all(
          pilotosBase.map(async (piloto: any): Promise<Piloto> => {
            const nacimiento = new Date(piloto.dateOfBirth);
            const edad = anio - nacimiento.getFullYear();

            const equipo = await obtenerEquipoDePiloto(anio, piloto.driverId);

            return {
              id: piloto.driverId,
              nombre: `${piloto.givenName} ${piloto.familyName}`,
              acronimo: piloto.code || "N/A",
              edad: edad,
              fechaNacimiento: piloto.dateOfBirth,
              numeroPiloto: parseInt(piloto.permanentNumber || "0"),
              equipoId: equipo,
              pais: obtenerPaisDesdeNacionalidad(piloto.nationality), // Convertir a país
            };
          })
        );

        setPilotos(pilotosConDatos);
      } catch (error) {
        console.error("Error cargando los datos:", error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    cargarDatosPilotos();
  }, [anio]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p>Cargando...</p>
      </div>
    );
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

      {/* Tabla con todos los pilotos ordenados por equipo */}
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
            <th style={{ width: "20%" }}>Nombre</th>
            <th style={{ width: "10%" }}>Acrónimo</th>
            <th style={{ width: "15%" }}>País</th>
            <th style={{ width: "10%" }}>Edad</th>
            <th style={{ width: "20%" }}>Fecha de Nacimiento</th>
            <th style={{ width: "10%" }}>Número Piloto</th>
            <th style={{ width: "15%" }}>Equipo</th>
          </tr>
        </thead>
        <tbody>
          {pilotos
            .sort((a, b) => a.equipoId.localeCompare(b.equipoId)) // Ordenar por equipo
            .map((piloto) => (
              <tr key={piloto.id}>
                <td>
                  <Link href={`/pilotos/${anio}/${piloto.id}`}>{piloto.nombre}</Link>
                </td>
                <td>{piloto.acronimo}</td>
                <td>{piloto.pais}</td>
                <td>{piloto.edad}</td>
                <td>{new Date(piloto.fechaNacimiento).toLocaleDateString()}</td>
                <td>{piloto.numeroPiloto}</td>
                <td>{piloto.equipoId}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
