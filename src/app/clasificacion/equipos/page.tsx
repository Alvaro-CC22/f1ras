"use client";

import { useEffect, useState } from "react";
import Navbar from './../../componentes/navbar';
import { obtenerClasificacionConstructores } from './../../servicios/equipos';
import { obtenerColorPorPosicion } from "@/app/lib/utils";
import Link from "next/link";

export default function Home() {
  const [equipos, setEquipos] = useState<any[]>([]);
  const [anio, setAnio] = useState<number>(2024); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true); 
        const equiposData = await obtenerClasificacionConstructores(anio);
        setEquipos(equiposData);
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
      <h1 style={{ fontFamily: 'nombres' }}>Clasificación de Constructores ({anio})</h1>
      <table className="bg-black text-white" style={{ width: "100%", textAlign: "left" }}>
        <thead style={{ fontFamily: 'titulos' }}>
          <tr>
            <th>Posición</th>
            <th>Nombre del Equipo</th>
            <th>Victorias</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'normal' }}>
          {loading ? (
            <tr>
              <td colSpan={4}>Cargando...</td>
            </tr>
          ) : (
            equipos.map((equipo, index) => {
              const colorClase = obtenerColorPorPosicion(index + 1); 
              return (
                <tr key={equipo.nombre} className={`${colorClase} border-b border-red-600 last:border-0`}>
                  <td>{equipo.posicion}</td>
                  <td><Link className="hover:text-red-600 hover:underline hover:font-bold " href={`/equipos/${equipo.constructorId}`}>
                  {equipo.nombre}
                  </Link></td>
                  <td>{equipo.victorias}</td>
                  <td>{equipo.puntos}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
