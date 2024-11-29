"use client";

import { useEffect, useState } from "react";
import Navbar from './../../componentes/navbar';
import { obtenerClasificacionConstructores } from './../../servicios/equipos';

const ITEMS_POR_PAGINA = 10;

export default function ClasificacionConstructores() {
  const [clasificacion, setClasificacion] = useState<any[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [anio, setAnio] = useState(2024); // El año que se desea mostrar

  useEffect(() => {
    // Mostrar loading mientras se obtienen los datos
    setLoading(true);

    const cargarClasificacion = async () => {
      const clasificacionData = await obtenerClasificacionConstructores(anio);

      if (clasificacionData.length > 0) {
        setClasificacion(clasificacionData);
        setTotal(clasificacionData.length);
      }

      setLoading(false);
    };

    cargarClasificacion();
  }, [anio, paginaActual]);

  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const clasificacionPaginada = clasificacion.slice(inicio, fin);
  const totalPaginas = Math.ceil(total / ITEMS_POR_PAGINA);

  return (
    <div>
      <Navbar />
      <h1>Clasificación de Constructores ({anio})</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre del Equipo</th>
            <th>Victorias</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>Cargando...</td>
            </tr>
          ) : (
            clasificacionPaginada.map((constructor, index) => (
              <tr key={index}>
                <td>{constructor.posicion}</td>
                <td>{constructor.nombre}</td>
                <td>{constructor.victorias}</td>
                <td>{constructor.puntos}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}
