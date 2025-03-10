"use client";

import { useEffect, useState } from "react";
import { Campeon } from "../lib/definitions";
import { Piloto } from "../lib/definitions";
import Navbar from "../componentes/navbar";
import Link from "next/link";
import { obtenerCampeones } from "../servicios/campeones";
import { obtenerPaisDesdeNacionalidad } from "../lib/utils";

const ITEMS_POR_PAGINA = 15;

export default function Campeones() {
  const [campeonesData, setCampeonesData] = useState<Campeon[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const offset = (paginaActual - 1) * ITEMS_POR_PAGINA;

  useEffect(() => {
        setLoading(true); 
    const cargarCampeones = async () => {
      const { campeones, total } = await obtenerCampeones(ITEMS_POR_PAGINA, offset); 
      console.log("Datos recibidos:", campeones); 
      setCampeonesData(campeones);
      setTotal(total); 
      setLoading(false);
    };

    cargarCampeones();
  }, [paginaActual]);

  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;

  const totalPaginas = Math.ceil(total / ITEMS_POR_PAGINA); 

  

  return (
    <div className="w-fit">
      <Navbar />
      <h1 style={{ fontFamily: 'nombres'}} className="text-xl pt-5">Campeones del Mundial de F1</h1>
      <table
        className="pt-3 table "
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <thead style={{ fontFamily: 'titulos'}}>
          <tr>
            <th>Año</th>
            <th>Nombre</th>
            <th>País</th>
            <th>Fecha de Nacimiento (Edad Actual)</th>
            <th>Edad al Ganar</th>
            <th>Equipo</th>
            <th>Puntos</th>
            <th>Victorias</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'normal'}}>
          {!loading ? (
            campeonesData.map((campeon, index) => (
              <tr key={campeon.anio} className={`${index % 2 === 0 ? "bg-white text-black" : "bg-red-600 text-white " } border-b border-black last:border-0`}>
                <td>{campeon.anio}</td>
                <td>
                <Link className={`${
                      index % 2 === 0 ? 'hover:text-red-600' : 'hover:text-black'
                    } hover:underline hover:font-bold`} href={`/pilotos/${campeon.id}`}>{campeon.nombre}</Link></td>
                <td>{obtenerPaisDesdeNacionalidad(campeon.nacionalidad)}</td>
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
        <button className="text-red-500" style={{ fontFamily: 'titulos'}}
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span style={{ margin: "0 10px" }}>
          <span style={{ fontFamily: 'normal'}}>Página</span> <span style={{ fontFamily: 'titulos'}}>{paginaActual}</span> <span style={{ fontFamily: 'normal'}}>de</span> <span style={{ fontFamily: 'titulos'}}>{totalPaginas}</span> 
        </span>
        <button className="text-red-500" style={{ fontFamily: 'titulos'}}
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
