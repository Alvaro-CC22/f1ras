"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piloto } from "../lib/definitions";
import { añosDisponibles } from "../lib/const";
import { obtenerEquipoDePiloto, obtenerPilotosPorAnio, obtenerResultados } from "../servicios/pilotos";
import Navbar from "../componentes/navbar";
import { obtenerPaisDesdeNacionalidad } from "../lib/utils";

export default function Home() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [anio, setAnio] = useState<number>(2024);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatosPilotos = async () => {
      setLoading(true); 
      try {
        const pilotosBase = await obtenerPilotosPorAnio(anio);

        const pilotosConDatos = await Promise.all(
          pilotosBase.map(async (pilotoBase: Piloto): Promise<Piloto> => {
            const { id, nombre, acronimo, pais, fechaNacimiento, numeroPiloto } = pilotoBase;
        
            // Obtener el equipo con id y nombre para cada piloto
            const { id: equipoId, nombre: equipoNombre } = await obtenerEquipoDePiloto(anio, pilotoBase.id);
        
            return {
              ...pilotoBase,
              edad: anio - new Date(fechaNacimiento).getFullYear(),
              equipoId, 
              equipoNombre, 
              retirado: false, 
            };
          })
        );
        
        console.log(pilotosConDatos);
        setPilotos(pilotosConDatos);
      } catch (error) {
        console.error("Error cargando los datos:", error);
      } finally {
        
        setLoading(false); 
      }
    };

    cargarDatosPilotos();
  }, [anio]);

  if (loading) {
    return (
      <div className="w-fit">
        <Navbar />
        <h1 style={{ fontFamily: 'nombres'}} className="text-xl pt-5">Pilotos de F1 - Temporada {anio}</h1>
      <div>
        <label htmlFor="anio" className="text-lg pt-5" style={{ fontFamily: 'titulos'}}>Seleccionar Año = </label>
        <select
        style={{ fontFamily: 'titulos'}}
        className="text-lg pt-1"
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
      <table
        className="table pt-1"
        style={{
          width: "100%",
          textAlign: "left",
          tableLayout: "fixed",
        }}
      >
        <thead style={{ fontFamily: 'titulos'}}>
        
          <tr>
            <th style={{ width: "20%" }}>Nombre</th>
            <th style={{ width: "10%" }}>Acrónimo</th>
            <th style={{ width: "15%" }}>País</th>
            <th style={{ width: "10%" }}>Edad</th>
            <th style={{ width: "20%" }}>Fecha de Nacimiento</th>
            <th style={{ width: "10%" }}>Nº Piloto</th>
            <th style={{ width: "15%" }}>Equipo</th>
          </tr>
        </thead>
        </table>
        <p style={{ fontFamily: 'normal' }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <Navbar />
      <h1 style={{ fontFamily: 'nombres'}} className="text-xl pt-5">Pilotos de F1 - Temporada {anio}</h1>
      <div >
        <label htmlFor="anio" className="text-lg pt-5" style={{ fontFamily: 'titulos'}}>Seleccionar Año = </label>
        <select
        style={{ fontFamily: 'titulos'}}
        className="text-lg pt-1"
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

      {/* Tabla con todos los pilotos ordenados por equipo */}
      <table
        className="table pt-1"
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <thead style={{ fontFamily: 'titulos'}}>
        
          <tr className=" bg-black text-white">
            <th style={{ width: "20%" }}>Nombre</th>
            <th style={{ width: "10%" }}>Acrónimo</th>
            <th style={{ width: "15%" }}>País</th>
            <th style={{ width: "10%" }}>Edad</th>
            <th style={{ width: "20%" }}>Fecha de Nacimiento</th>
            <th style={{ width: "10%" }}>Nº Piloto</th>
            <th style={{ width: "15%" }}>Equipo</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'normal' }}>
  {pilotos
    .sort((a, b) => a.equipoId?.localeCompare(b.equipoId || "") || 0) // Ordenar por equipo
    .map((piloto, index) => (
      <tr key={piloto.id} className={`${index % 2 === 0 ? "bg-white text-black" : "bg-red-600 text-white " } border-b border-black last:border-0`}>
        <td>
          <Link className={`${
                      index % 2 === 0 ? 'hover:text-red-600' : 'hover:text-black'
                    } hover:underline hover:font-bold`} href={`/pilotos/${piloto.id}`}>{piloto.nombre}</Link>
        </td>
        <td>{piloto.acronimo}</td>
        <td>{obtenerPaisDesdeNacionalidad(piloto.pais)}</td>
        <td>{piloto.edad}</td>
        <td>{new Date(piloto.fechaNacimiento).toLocaleDateString()}</td>
        <td>{piloto.numeroPiloto}</td>
        <td> <Link
                    className={`${
                      index % 2 === 0 ? 'hover:text-red-600' : 'hover:text-black'
                    } hover:underline hover:font-bold`}
                    href={`/equipos/${piloto.equipoId}`}
                  >
                    {piloto.equipoNombre || "Desconocido"}
                  </Link></td>
      </tr>
    ))}
</tbody>

      </table>
    </div>
  );
}
