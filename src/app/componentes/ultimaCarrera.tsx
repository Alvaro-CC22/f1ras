"use client";

import { useEffect, useState } from "react";
import { obtenerColorPorPosicion } from "../lib/utils";
import Link from "next/link";

type Resultados = {
  position: string;
  points: string;
  Driver: {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
    url: string;
  };
  Constructor: {
    name: string;
    nationality: string;
    url: string;
  };
  Time?: {
    time: string;
  };
  status: string;
};

type Carrera = {
  raceName: string;
  date: string;
  Results: Resultados[];
};

export default function UltimaCarrera() {
  const [carrera, setCarrera] = useState<Carrera | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const traducirEstado = (status: string) => {
    if (status === "Finished") return "Finalizado";
    if (status.includes("Lap")) return `${status.split(" ")[0]} Vuelta(s)`;
    return "DNF"; // Por defecto si no es ninguno de los anteriores
  };

  useEffect(() => {
    const obtenerResultados = async () => {
      try {
        const response = await fetch("http://ergast.com/api/f1/current/last/results.json");
        const data = await response.json();
        setCarrera(data.MRData.RaceTable.Races[0]);
      } catch (error) {
        console.error("Error al cargar los resultados de la última carrera:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerResultados();
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: "nombres" }}>Última Carrera - {carrera?.raceName}</h1>
      <p className="pb-5" style={{ fontFamily: "titulos" }}>
        Fecha - {carrera?.date}
      </p>
      {loading ? (
        <p style={{ fontFamily: "normal" }}>Cargando resultados...</p>
      ) : (
        <table style={{ width: "50%", textAlign: "left" }}>
          <thead style={{ fontFamily: "titulos" }}>
            <tr>
              <th>Posición</th>
              <th>Piloto</th>
              <th>Constructor</th>
              <th>Tiempo / Estado</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: "normal" }}>
            {carrera?.Results.map((resultado, index) => {
              const colorClase = obtenerColorPorPosicion(Number(resultado.position)); // Aplicar color basado en posición
              const tiempoOEstado =
                resultado.Time?.time || traducirEstado(resultado.status); // Mostrar tiempo o traducir el estado

              return (
                <tr key={index} className={colorClase ? colorClase : ""}>
                  <td>{resultado.position}</td>
                  <td className="hover:text-red-500 hover:underline hover:font-bold">
                    <Link href={`/pilotos/${resultado.Driver.driverId}`}>
                      {resultado.Driver.givenName} {resultado.Driver.familyName}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="hover:text-red-500 hover:underline hover:font-bold"
                      href={`/equipos/${resultado.Constructor.name}`}
                    >
                      {resultado.Constructor.name}
                    </Link>
                  </td>
                  <td>{tiempoOEstado}</td>
                  <td>{resultado.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
