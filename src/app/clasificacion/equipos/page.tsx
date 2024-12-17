"use client";

import { useEffect, useState } from "react";
import Navbar from './../../componentes/navbar';
import { obtenerClasificacionConstructores } from './../../servicios/equipos';
import { obtenerColorPorPosicion } from "@/app/lib/utils";

export default function Home() {
  const [equipos, setEquipos] = useState<any[]>([]);
  const [anio, setAnio] = useState<number>(2024); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true); // Mostrar loading al empezar a cargar
        const equiposData = await obtenerClasificacionConstructores(anio);
        setEquipos(equiposData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false); // Dejar de mostrar loading después de cargar
      }
    };

    cargarDatos();
  }, [anio]);

  return (
    <div className="w-fit">
      <Navbar />
      <h1 style={{ fontFamily: 'nombres' }}>Clasificación de Constructores ({anio})</h1>
      <table style={{ width: "100%", textAlign: "left" }}>
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
              const colorClase = obtenerColorPorPosicion(index + 1); // Obtener la clase de color
              return (
                <tr key={equipo.nombre} className={colorClase}>
                  <td>{equipo.posicion}</td>
                  <td >{equipo.nombre}</td>
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
