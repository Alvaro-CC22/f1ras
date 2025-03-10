"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piloto } from "../../lib/definitions";
import { añosDisponibles } from "../../lib/const";
import { obtenerPilotosPorAnio, obtenerResultados, obtenerClasificacionPilotosDetallada } from "../../servicios/pilotos";
import Navbar from "../../componentes/navbar";
import { obtenerColorPorPosicion } from "@/app/lib/utils";

export default function Home() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [anio, setAnio] = useState<number>(2024);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const pilotosData = await obtenerClasificacionPilotosDetallada(anio);
        setPilotos(pilotosData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false); 
      }
    };

    cargarDatos();
  }, [anio]);

  
  

  return (
    <div className="w-fit">
      <Navbar />
      <h1 style={{ fontFamily: 'nombres'}}>Pilotos de F1 - Temporada {anio}</h1>
      <div style={{ fontFamily: 'titulos'}}>
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
      <table className="bg-black text-white" style={{ width: "100%", textAlign: "left" }}>
        <thead style={{ fontFamily: 'titulos'}}>
          <tr>
            <th>Pos.</th>
            <th>Nombre</th>
            <th>Nº Piloto</th>
            <th>Equipo</th>
            <th>Victorias</th>
            <th>Podios</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'normal'}}>
        {loading ? (
            <tr>
              <td colSpan={4}>Cargando...</td>
            </tr>
          ) : (
          pilotos.map((piloto, index) => {
            const colorClase = obtenerColorPorPosicion(index + 1); 
            return (
              <tr key={piloto.id} className={`${colorClase} border-b border-red-600 last:border-0`}>
                <td>{index + 1}</td>
                <td >
                  <Link className="hover:text-red-500 hover:underline hover:font-bold " href={`/pilotos/${piloto.id}`}>{piloto.nombre}</Link>
                </td>
                <td>{piloto.numeroPiloto}</td>
                <td>
                <Link className="hover:text-red-600 hover:underline hover:font-bold " href={`/equipos/${piloto.equipoId}`}>
                  {piloto.equipoNombre}
                </Link></td>
                <td>{piloto.victorias}</td>
                <td>{piloto.podios}</td>
                <td>{piloto.puntos}</td>
              </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
