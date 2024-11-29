"use client";

import { useEffect, useState } from "react";
import { Campeon } from "../lib/definitions";
import Navbar from "../componentes/navbar";
import { obtenerCampeones } from "../servicios/campeones"; // Importa el servicio

const ITEMS_POR_PAGINA = 15;

export default function Campeones() {
  const [campeonesData, setCampeonesData] = useState<Campeon[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [total, setTotal] = useState(0); // Estado para almacenar el total
  const [loading, setLoading] = useState<boolean>(true);

  // Calcular el offset directamente desde la paginaActual
  const offset = (paginaActual - 1) * ITEMS_POR_PAGINA;

  useEffect(() => {
        setLoading(true); 
    const cargarCampeones = async () => {
      const { campeones, total } = await obtenerCampeones(ITEMS_POR_PAGINA, offset); 
      console.log("Datos recibidos:", campeones); // Verifica si los datos son correctos
      setCampeonesData(campeones);
      setTotal(total); // Almacena el total en el estado
      setLoading(false);
    };

    cargarCampeones();
  }, [paginaActual]); // Solo actualiza cuando cambia la página

  // Cálculo de los campeones a mostrar según la página actual
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;

  const totalPaginas = Math.ceil(total / ITEMS_POR_PAGINA); // Usamos el total de la API

  

  return (
    <div>
      <Navbar />
      <h1>Campeones del Mundial de F1</h1>
      <table style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Año</th>
            <th>Nombre</th>
            <th>Nacionalidad</th>
            <th>Fecha de Nacimiento (Edad Actual)</th>
            <th>Edad al Ganar</th>
            <th>Equipo</th>
            <th>Puntos</th>
            <th>Victorias</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            campeonesData.map((campeon) => (
              <tr key={campeon.anio}>
                <td>{campeon.anio}</td>
                <td>{campeon.nombre}</td>
                <td>{campeon.nacionalidad}</td>
                <td>{campeon.edadFormato}</td>
                <td>{campeon.edadGanador}</td>
                <td>{campeon.equipo}</td>
                <td>{campeon.puntos}</td>
                <td>{campeon.victorias}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>Cargando campeones...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span style={{ margin: "0 10px" }}>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
