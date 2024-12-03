"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piloto } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import { obtenerPilotosPorAnio, obtenerResultados, obtenerClasificacionPilotos } from "../servicios/pilotos";
import { obtenerClasificacionConstructores } from "../servicios/equipos";
import Navbar from "../componentes/navbar";
import { obtenerColorPorPosicion } from "../lib/utils";

export default function Home() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [equipos, setEquipos] = useState<{ nombre: string; puntos: number; posicion: number }[]>([]);
  const [anio, setAnio] = useState<number>(2024); // Año predeterminado

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const pilotosData = await obtenerClasificacionPilotos(anio);
        const equiposData = await obtenerClasificacionConstructores(anio);
        setPilotos(pilotosData);
        setEquipos(equiposData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();

  }, [anio]);

  return (
    <div>
      <Navbar />
      <h1 style={{ fontFamily: 'nombres'}} className="text-xl pt-5">F1 - Temporada {anio}</h1>
      <div className="text-lg pt-5" style={{ fontFamily: 'titulos'}}>
        <label htmlFor="anio">Seleccionar Año = </label>
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

      {/* Contenedor con Flexbox para alinear las tablas */}
      <div className=" pt-3"  style={{ display: "flex", gap: "20px" }}>
        {/* Tabla de pilotos */}
        <div style={{ flex: 1 }}>
        <Link href={`/clasificacion/pilotos`}><h2 className="text-xl text-red-500" style={{ fontFamily: 'titulos'}}>Clasificación de Pilotos</h2></Link>
          <table style={{ width: "100%", textAlign: "left" }}>
            <thead style={{ fontFamily: 'titulos'}}>
              <tr>
                <th>Pos.</th>
                <th>Nombre</th>
                <th>Nº Piloto</th>
                <th>Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'normal'}}>
            {pilotos.map((piloto, index) => {
            const colorClase = obtenerColorPorPosicion(index + 1); // Obtener la clase de color
            return (
              <tr key={piloto.id} className={colorClase}>
                <td>{index + 1}</td>
                <td>
                  <Link href={`/pilotos/${anio}/${piloto.id}`}>{piloto.nombre}</Link>
                </td>
                <td>{piloto.numeroPiloto}</td>
                <td>{piloto.equipoId}</td>
                <td>{piloto.puntos}</td>
              </tr>
            );
          })}
            </tbody>
          </table>
        </div>

        {/* Tabla de equipos */}
        <div style={{ flex: 1 }}>
        <Link href={`/clasificacion/equipos`}><h2 className="text-xl text-red-500" style={{ fontFamily: 'titulos'}}>Clasificación de Constructores</h2></Link>
          <table style={{ width: "100%", textAlign: "left" }}>
            <thead style={{ fontFamily: 'titulos'}}>
              <tr>
                <th>Pos.</th>
                <th>Nombre del Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'normal'}}>
            {equipos.map((equipo, index) => {
            const colorClase = obtenerColorPorPosicion(index + 1); // Obtener la clase de color
            return (
              <tr key={equipo.nombre} className={colorClase}>
                  <td>{index + 1}</td>
                  <td>{equipo.nombre}</td>
                  <td>{equipo.puntos}</td>
                </tr>);
            })
          )}
            </tbody>
            
          </table>
        </div>
      </div>
    </div>
  );
}
