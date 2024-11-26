"use client";
import { useEffect, useState } from "react";
import { Circuito } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";

// Función para convertir tiempo (MM:SS.sss) a segundos totales
const convertirTiempoASegundos = (tiempo: string): number => {
  const [minutos, segundos] = tiempo.split(":").map(parseFloat);
  return minutos * 60 + segundos;
};

const Circuitos = () => {
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [anio, setAnio] = useState<number>(2024);
  const [circuitosPorAnio, setCircuitosPorAnio] = useState<any>({});

  // Función para obtener los datos del circuito (ganador, vuelta rápida)
  const fetchDatosCircuito = async (circuitoId: string, tipo: "ganador" | "vueltaRapida") => {
    const anioActual = new Date().getFullYear();
    let mejorVueltaRapida = Infinity;
    const data = { resultado: null, anio: null, tiempo: null };

    // Intentar obtener el mejor resultado de la carrera más reciente hacia el pasado
    for (let anio = anioActual; anio >= 2004; anio--) {
      const url = `https://ergast.com/api/f1/${anio}/circuits/${circuitoId}/results.json`;
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.MRData.RaceTable.Races.length > 0) {
          const carrera = json.MRData.RaceTable.Races[0];
          if (tipo === "ganador") {
            const ganador = carrera.Results[0]?.Driver;
            if (ganador) {
              return { resultado: `${ganador.givenName} ${ganador.familyName}`, anio: `${anio}` };
            }
          } else if (tipo === "vueltaRapida") {
            carrera.Results.forEach((resultado: any) => {
              const tiempoVuelta = resultado.FastestLap?.Time?.time;
              if (tiempoVuelta) {
                const tiempoSegundos = convertirTiempoASegundos(tiempoVuelta);
                if (tiempoSegundos < mejorVueltaRapida) {
                  mejorVueltaRapida = tiempoSegundos;
                  data.resultado = `${resultado.Driver.givenName} ${resultado.Driver.familyName}`;
                  data.anio = `${anio}`;
                  data.tiempo = tiempoVuelta;
                }
              }
            });
          }
        }
      } catch (error) {
        console.error(`Error obteniendo ${tipo} de ${circuitoId} (${anio}):`, error);
      }
    }

    return data;
  };

  // Obtener los circuitos (con cache)
  const fetchCircuitos = async () => {
    setLoading(true);

    // Verificamos si ya tenemos los circuitos de este año almacenados
    if (circuitosPorAnio[anio]) {
      setCircuitos(circuitosPorAnio[anio]);
      setLoading(false);
      return;
    }

    const url = `https://ergast.com/api/f1/${anio}.json`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      const circuitosData = await Promise.all(
        json.MRData.RaceTable.Races.map(async (carrera: any) => {
          const circuitoId = carrera.Circuit.circuitId;

          const [ultimoGanador, vueltaRapida] = await Promise.allSettled([
            fetchDatosCircuito(circuitoId, "ganador"),
            fetchDatosCircuito(circuitoId, "vueltaRapida"),
          ]);

          return {
            id: circuitoId,
            nombre: carrera.Circuit.circuitName,
            imagen: `https://www.formula1.com/circuit-images/${circuitoId}.png`,
            fecha: new Date(carrera.date).toLocaleDateString(),
            pais: carrera.Circuit.Location.country,
            bandera: `https://flagcdn.com/w320/${carrera.Circuit.Location.country.toLowerCase().replace(" ", "-")}.png`,
            ultimoGanador: ultimoGanador.status === "fulfilled" ? ultimoGanador.value.resultado : "N/A",
            anioUltimoGanador: ultimoGanador.status === "fulfilled" ? ultimoGanador.value.anio : "N/A",
            vueltaRapida: vueltaRapida.status === "fulfilled" ? vueltaRapida.value.resultado : "N/A",
            anioVueltaRapida: vueltaRapida.status === "fulfilled" ? vueltaRapida.value.anio : "N/A",
            tiempoVueltaRapida: vueltaRapida.status === "fulfilled" ? vueltaRapida.value.tiempo : null,
          };
        })
      );

      // Guardamos los circuitos obtenidos en el cache
      setCircuitosPorAnio((prevCache) => ({
        ...prevCache,
        [anio]: circuitosData,
      }));

      setCircuitos(circuitosData);
    } catch (error) {
      console.error("Error obteniendo los circuitos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCircuitos();
  }, [anio]); // Ejecutar cada vez que el año cambie

  if (loading) {
    return <div>Cargando circuitos...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Circuitos de F1 - {anio}</h1>

      <div style={{ marginBottom: "20px" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {circuitos.map((circuito) => (
          <div key={circuito.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", textAlign: "center", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
            <h2>{circuito.nombre}</h2>
            <img
              src={circuito.imagen}
              alt={`Trazado de ${circuito.nombre}`}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
            />
            <p><strong>Fecha:</strong> {circuito.fecha}</p>
            <p><strong>País:</strong> {circuito.pais} <img src={circuito.bandera} alt={`Bandera de ${circuito.pais}`} style={{ width: "20px", height: "15px", marginLeft: "5px" }} /></p>
            <p><strong>Último ganador:</strong> {circuito.ultimoGanador} ({circuito.anioUltimoGanador})</p>
            <p><strong>Vuelta rápida:</strong> {circuito.vueltaRapida} ({circuito.anioVueltaRapida}) - {circuito.tiempoVueltaRapida || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Circuitos;
