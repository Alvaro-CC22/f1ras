"use client";
import { useEffect, useState } from "react";
import { Circuito } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import Navbar from "../componentes/navbar";

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
    const fechaLimiteVueltaRapida = 2004; // Limitar la búsqueda de vuelta rápida hasta 2004

    let mejorVueltaRapida = Infinity;
    let ultimoGanador = { resultado: "N/A", anio: "N/A" };
    let vueltaRapidaData = { resultado: "N/A", anio: "N/A", tiempo: "N/A" };

    if (tipo === "ganador") {
      // Buscar último ganador desde el año más reciente y avanzar hacia el pasado
      for (let anio = anioActual; anio >= 1950; anio--) {
        const url = `https://ergast.com/api/f1/${anio}/circuits/${circuitoId}/results.json`;
        try {
          const response = await fetch(url);
          const json = await response.json();

          if (json.MRData.RaceTable.Races.length > 0) {
            const carrera = json.MRData.RaceTable.Races[0];
            const ganador = carrera.Results[0]?.Driver;
            if (ganador) {
              // Si encontramos un ganador, lo almacenamos y detenemos la búsqueda
              ultimoGanador = {
                resultado: `${ganador.givenName} ${ganador.familyName}`,
                anio: `${anio}`,
              };
              break; // Detener la búsqueda al encontrar el primer ganador
            }
          }
        } catch (error) {
          console.error(`Error obteniendo ${tipo} de ${circuitoId} (${anio}):`, error);
        }
      }
    } 

    return tipo === "ganador" ? ultimoGanador : vueltaRapidaData;
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

          // Obtener los datos del ganador y la vuelta rápida para cada circuito
          const [ultimoGanador, vueltaRapida] = await Promise.all([fetchDatosCircuito(circuitoId, "ganador"), fetchDatosCircuito(circuitoId, "vueltaRapida")]);

          return {
            id: circuitoId,
            nombre: carrera.Circuit.circuitName,
            imagen: `/circuitos/${circuitoId}.avif`,
            fecha: new Date(carrera.date).toLocaleDateString(),
            pais: `${carrera.Circuit.Location.country} (${carrera.Circuit.Location.locality})`,
            ultimoGanador: ultimoGanador.resultado || "N/A",
            anioUltimoGanador: ultimoGanador.anio || "N/A",
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

  // Resetear los circuitos cuando el año cambie
  useEffect(() => {
    fetchCircuitos();
  }, [anio]); // Ejecutar cada vez que el año cambie

  if (loading) {
    return <div>Cargando circuitos...</div>;
  }

  return (
    <div>
    <Navbar />
      <h1 style={{ textAlign: "center" }}>Circuitos de F1 - {anio}</h1>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="anio">Seleccionar Año:</label>
        <select id="anio" value={anio} onChange={(e) => setAnio(parseInt(e.target.value))}>
          {Object.keys(añosDisponibles).map((year) => (
            <option key={year} value={year}>
              {añosDisponibles[parseInt(year)]}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {circuitos.map((circuito) => (
          <div
            key={`${circuito.id}-${circuito.fecha}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>{circuito.nombre}</h2>
            <img
              src={circuito.imagen}
              alt={`Trazado de ${circuito.nombre}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "200px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <p><strong>Fecha:</strong> {circuito.fecha}</p>
            <p><strong>País:</strong> {circuito.pais}</p>
            <p><strong>Último ganador:</strong> {circuito.ultimoGanador} ({circuito.anioUltimoGanador})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Circuitos;
