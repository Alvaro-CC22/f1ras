"use client";

import { useEffect, useState } from "react";
import { obtenerColorPorPosicion } from "../lib/utils";

type Resultados = {
  position: string;
  points: string;
  Driver: {
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
};

type Carrera = {
  raceName: string;
  date: string;
  Results: Resultados[];
};

export default function UltimaCarrera() {
  const [carrera, setCarrera] = useState<Carrera | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      <h1 style={{ fontFamily: 'nombres' }}>Última Carrera - {carrera?.raceName}</h1>
      <p style={{ fontFamily: 'titulos' }}>Fecha - {carrera?.date}</p>
      {loading ? (
        <p style={{ fontFamily: 'normal' }}>Cargando resultados...</p>
      ) : (
        <table style={{ width: "50%", textAlign: "left" }}>
          <thead style={{ fontFamily: 'titulos' }}>
            <tr>
              <th>Posición</th>
              <th>Piloto</th>
              <th>Constructor</th>
              <th>Tiempo</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: 'normal' }}>
  {carrera?.Results.map((resultado, index) => {
  const colorClase = obtenerColorPorPosicion(index + 1); // Obtener la clase de color
  return (
    <tr key={index}>
                <td>{resultado.position}</td>
                <td>
                  <a href={resultado.Driver.url} target="_blank" rel="noopener noreferrer">
                    {resultado.Driver.givenName} {resultado.Driver.familyName} 
                  </a>
                </td>
                <td>
                  <a href={resultado.Constructor.url} target="_blank" rel="noopener noreferrer">
                    {resultado.Constructor.name} 
                  </a>
                </td>
                <td>{resultado.Time ? resultado.Time.time : "DNF"}</td>
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
