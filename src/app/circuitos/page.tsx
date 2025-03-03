"use client";
import { useEffect, useState } from "react";
import { Circuito } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import Navbar from "../componentes/navbar";
import { fetchCircuitos, fetchUltimoGanadorCircuito } from "../servicios/circuitos";
import Link from "next/link";

const Circuitos = () => {
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [anio, setAnio] = useState<number>(2024);
  const [circuitosPorAnio, setCircuitosPorAnio] = useState<any>({});

  useEffect(() => {
    const obtenerCircuitos = async () => {
      setLoading(true);
      const data = await fetchCircuitos(anio, fetchUltimoGanadorCircuito, circuitosPorAnio, setCircuitosPorAnio);
      setCircuitos(data);
      setLoading(false);
    };

    obtenerCircuitos();
  }, [anio]);

  if (loading) {
    return (
      <div className="w-fit">
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
    <div className="w-fit">
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          maxWidth: "1900px",  // Ajusta este valor según tus necesidades  // Centra el grid horizontalmente
          boxSizing: "border-box", // Asegura que los bordes y el padding no afecten el tamaño total
          padding: "10px",
        }}
      >
        {circuitos.map((circuito) => (
          <div
            key={`${circuito.id}-${circuito.fecha}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              height: "100%",  // Evita que los elementos se salgan verticalmente
            }}
          >
            <h2 className="hover:text-red-500 hover:underline hover:font-bold" style={{ fontFamily: 'nombres' }}>
              <Link className="hover:text-red-500 hover:underline hover:font-bold" href={`/circuitos/${circuito.id}`}>
                {circuito.nombre}
              </Link>
            </h2>
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
            <p style={{ fontFamily: 'normal' }}>
              <strong style={{ fontFamily: 'titulos' }}>Fecha</strong>: {circuito.fecha}
            </p>
            <p style={{ fontFamily: 'normal' }}>
              <strong style={{ fontFamily: 'titulos' }}>País</strong>: {circuito.pais}
            </p>
            <p style={{ fontFamily: 'normal' }}>
              <strong style={{ fontFamily: 'titulos' }}>Último ganador</strong>: <Link className="hover:text-red-600 hover:underline hover:font-bold" href={`/pilotos/${circuito.idPiloto}`}>
                {circuito.ultimoGanador}
              </Link> ({circuito.anioUltimoGanador})
              
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Circuitos;
