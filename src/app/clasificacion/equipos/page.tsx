"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piloto } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import { obtenerPilotosPorAnio, obtenerResultados } from "../servicios/pilotos";
import Navbar from "../componentes/navbar";

export default function Home() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [anio, setAnio] = useState<number>(2024); // Año predeterminado

  useEffect(() => {
    const cargarDatosPilotos = async () => {
      const pilotosBase = await obtenerPilotosPorAnio(anio);

      const pilotosConDatos = await Promise.all(
        pilotosBase.map(async (piloto: any, index: number): Promise<Piloto> => {
          const nacimiento = new Date(piloto.dateOfBirth);
          const edad = new Date().getFullYear() - nacimiento.getFullYear();

          const { victorias, podios, puntos, equipo } = await obtenerResultados(
            piloto.driverId,
            anio
          );

          return {
            id: index + 1,
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

      pilotosConDatos.sort((a, b) => b.puntos - a.puntos);
      setPilotos(pilotosConDatos);
    };

    cargarDatosPilotos();
  }, [anio]);

  return (
    <div>
      <Navbar></Navbar>
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
                <Link href={`/pilotos/${anio}/${piloto.id}`}>{piloto.nombre}</Link>
              </td>
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
