"use client";
import { useEffect, useState } from "react";
import { Circuito } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import Navbar from "../componentes/navbar";
import { fetchCircuitos, fetchDatosCircuito } from "../servicios/circuitos";

const Circuitos = () => {
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [anio, setAnio] = useState<number>(2024);
  const [circuitosPorAnio, setCircuitosPorAnio] = useState<any>({});

  useEffect(() => {
    const obtenerCircuitos = async () => {
      setLoading(true);
      const data = await fetchCircuitos(anio, fetchDatosCircuito, circuitosPorAnio, setCircuitosPorAnio);
      setCircuitos(data);
      setLoading(false);
    };

    obtenerCircuitos();
  }, [anio]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <h1 style={{ fontFamily: 'nombres', textAlign: "center"}} className="text-xl pt-5" >Circuitos de F1 ({anio})</h1>
        <div>
        <label htmlFor="anio" className="text-lg pt-1" style={{ fontFamily: 'titulos'}}>Seleccionar Año = </label>
        <select style={{ fontFamily: 'titulos'}}
        className="text-lg pt-1" id="anio" value={anio} onChange={(e) => setAnio(parseInt(e.target.value))}>
          {Object.keys(añosDisponibles).map((year) => (
            <option key={year} value={year}>
              {añosDisponibles[parseInt(year)]}
            </option>
          ))}
        </select>
      </div>
        <p style={{ fontFamily: 'normal' }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1 style={{ fontFamily: 'nombres'}} className="text-xl pt-5"> Circuitos de F1 ({anio}) </h1>
      <div>
        <label htmlFor="anio" className="text-lg pt-1" style={{ fontFamily: 'titulos'}}>Seleccionar Año = </label>
        <select style={{ fontFamily: 'titulos'}}
        className="text-lg pt-1" id="anio" value={anio} onChange={(e) => setAnio(parseInt(e.target.value))}>
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
            <p>
              <strong>Fecha:</strong> {circuito.fecha}
            </p>
            <p>
              <strong>País:</strong> {circuito.pais}
            </p>
            <p>
              <strong>Último ganador:</strong> {circuito.ultimoGanador} (
              {circuito.anioUltimoGanador})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Circuitos;
