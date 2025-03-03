"use client";

import { useEffect, useState } from "react";
import Navbar from "../../componentes/navbar";
import { obtenerCircuitoPorId } from "../../servicios/circuitos"; // Asegúrate de que la ruta sea correcta
import { Circuito } from "../../lib/definitions"; // Importa la interfaz Circuito
import React from "react";
import Link from "next/link";

export default function CircuitoPage({ params }: { params: Promise<{ id: string }> }) {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);
  const [circuito, setCircuito] = useState<Circuito | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!unwrappedParams) return;
    const { id } = unwrappedParams;

    const cargarDatosCircuito = async () => {
      setLoading(true);
      try {
        const datosCircuito = await obtenerCircuitoPorId(id);
        console.log("Datos del circuito:", datosCircuito);

        if (datosCircuito) {
          setCircuito(datosCircuito);
        } else {
          throw new Error("Datos del circuito no encontrados.");
        }
      } catch (error) {
        console.error("Error cargando los datos del circuito:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosCircuito();
  }, [unwrappedParams]);

  if (loading) {
    return (
      <div className="w-fit">
        <Navbar />
        <p style={{ fontFamily: 'normal' }}>Cargando datos del circuito...</p>
      </div>
    );
  }

  if (!circuito) {
    return (
      <div className="w-fit">
        <Navbar />
        <p style={{ fontFamily: 'normal' }}>Circuito no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <Navbar />
      <div className="flex">
        <div className="mr-10 ml-6">
          <h1 className="text-2xl" style={{ fontFamily: 'nombres' }}>{circuito.nombre}</h1>
          {circuito.imagen && (
            <img
              src={`${circuito.imagen}`}
              alt={`Imagen de ${circuito.nombre}`}
              className="ml-10 h-96 mb-10 object-cover rounded"
            />
          )}
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Ubicación</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{circuito.pais}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Longitud</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{circuito.longitud} km</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Curvas</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{circuito.curvas}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Inauguración</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{circuito.inauguracion}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-dorado" style={{ fontFamily: 'titulos' }}>Último ganador</td>
                <td className="p-2 bg-dorado" style={{ fontFamily: 'normal' }}><Link className="hover:text-red-600 hover:underline hover:font-bold " href={`/pilotos/${circuito.idPiloto}`}>{circuito.ultimoGanador}</Link> (
                  {circuito.anioUltimoGanador})</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-purple-600 text-white" style={{ fontFamily: 'titulos' }}>Vuelta Record</td>
                <td className="p-2 bg-purple-600 text-white" style={{ fontFamily: 'normal' }}>{circuito.vueltaRecord}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1 max-w-screen-xl mr-10 mx-auto">
          <h2 className="text-xl mb-10" style={{ fontFamily: 'titulos' }}>Historia</h2>
          <p style={{ fontFamily: 'normal' }}>{circuito.historia || "Historia no disponible."}</p>
        </div>
      </div>
    </div>
  );
}
