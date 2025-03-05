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
  const [anio, setAnio] = useState<number>(2024); 

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
    <div className="w-fit">
      <Navbar />
      <h1 style={{ fontFamily: 'nombres' }} className="text-xl pt-5">
        F1 - Temporada {anio}
      </h1>
      <div className="text-lg pt-5" style={{ fontFamily: 'titulos' }}>
        <label htmlFor="anio">Seleccionar Año = </label>
        <select id="anio" value={anio} onChange={(e) => setAnio(parseInt(e.target.value))}>
          {Object.keys(añosDisponibles).map((year) => (
            <option key={year} value={year}>
              {añosDisponibles[parseInt(year)]}
            </option>
          ))}
        </select>
      </div>

      {/* Contenedor flexible que cambia de dirección antes de 900px */}
      <div className="pt-3 flex gap-5 flex-col lg:flex-row">
        {/* Tabla de pilotos */}
        <div className="flex-1">
          <h2 className="text-xl" style={{ fontFamily: 'titulos' }}>
            <Link className="hover:underline hover:text-red-600" href={`/clasificacion/pilotos`}>
              Clasificación de Pilotos
            </Link>
          </h2>
          <table className="bg-black text-white w-full text-left">
            <thead style={{ fontFamily: 'titulos' }}>
              <tr>
                <th>Pos.</th>
                <th>Nombre</th>
                <th>Nº Piloto</th>
                <th>Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'normal' }}>
              {pilotos.map((piloto, index) => {
                const colorClase = obtenerColorPorPosicion(index + 1);
                return (
                  <tr key={piloto.id} className={`${colorClase} border-b border-red-600 last:border-0`}>
                    <td>{index + 1}</td>
                    <td>
                      <Link className="hover:text-red-600 hover:underline hover:font-bold" href={`/pilotos/${piloto.id}`}>
                        {piloto.nombre}
                      </Link>
                    </td>
                    <td>{piloto.numeroPiloto}</td>
                    <td>
                      <Link className="hover:text-red-600 hover:underline hover:font-bold" href={`/equipos/${piloto.equipoId}`}>
                        {piloto.equipoNombre}
                      </Link>
                    </td>
                    <td>{piloto.puntos}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tabla de equipos */}
        <div className="flex-1">
          <h2 className="text-xl" style={{ fontFamily: 'titulos' }}>
            <Link className="hover:underline hover:text-red-600" href={`/clasificacion/equipos`}>
              Clasificación de Constructores
            </Link>
          </h2>
          <table className="bg-black text-white w-full text-left">
            <thead style={{ fontFamily: 'titulos' }}>
              <tr>
                <th>Pos.</th>
                <th>Nombre del Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'normal' }}>
              {equipos.map((equipo, index) => {
                const colorClase = obtenerColorPorPosicion(index + 1);
                return (
                  <tr key={equipo.nombre} className={`${colorClase} border-b border-red-600 last:border-0`}>
                    <td>{index + 1}</td>
                    <td>
                      <Link className="hover:text-red-600 hover:underline hover:font-bold" href={`/equipos/${equipo.constructorId}`}>
                        {equipo.nombre}
                      </Link>
                    </td>
                    <td>{equipo.puntos}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}
