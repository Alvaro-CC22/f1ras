"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerPilotoPorId, obtenerResultadosCarrera } from "../../servicios/pilotos"; 
import Navbar from "../../componentes/navbar";
import { Piloto } from "../../lib/definitions";
import React from "react";
import { obtenerPaisDesdeNacionalidad } from "@/app/lib/utils";

export default function PilotoPage({ params }: { params: Promise<{ id: string }> }) {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };
    fetchParams();
  }, [params]);

  const [piloto, setPiloto] = useState<Piloto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!unwrappedParams) return;
    const { id } = unwrappedParams;

    const cargarDatosPiloto = async () => {
      const resultadosCarrera = await obtenerResultadosCarrera(id); 
      console.log(resultadosCarrera);

      setLoading(true);
      try {
        const datosPiloto = await obtenerPilotoPorId(id);
        setPiloto(datosPiloto);
      } catch (error) {
        console.error("Error cargando los datos del piloto:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosPiloto();
  }, [unwrappedParams]);

  if (loading) {
    return (
      <div className="w-fit">
        <Navbar />
        <p style={{ fontFamily: 'normal' }}>Cargando datos del piloto...</p>
      </div>
    );
  }

  if (!piloto) {
    return (
      <div className="w-fit">
        <Navbar />
        <p style={{ fontFamily: 'normal' }}>Piloto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <Navbar />
      <div className="flex">
        {/* Columna izquierda: Datos del piloto */}
        <div className="mr-10 ml-6">
          <h1 className="text-2xl" style={{ fontFamily: 'nombres'}}>{`${piloto.nombre}`}</h1>
          
          {piloto.imagen && (
            <img
              src={`http://127.0.0.1:8000/uploads/${piloto.imagen}`} // Concatenamos la URL base con el nombre de la imagen
              alt={`Foto de ${piloto.nombre}`}
              className="ml-10 w-60 h-60 mb-10 object-cover rounded"
            />
          )}
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Edad</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.edad}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>País</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{obtenerPaisDesdeNacionalidad(piloto.pais)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Fecha de Nacimiento</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{new Date(piloto.fechaNacimiento).toLocaleDateString()}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Número Piloto</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.numeroPiloto}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Puntos</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.puntos}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Temporadas</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.temporadas}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Campeonatos</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.campeonatos}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Victorias</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.victorias}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Podios</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.podios}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Poles</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.poles}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Vueltas Rápidas</td>
                <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{piloto.vueltasRecord}</td>
              </tr>
            </tbody>
          </table>

          
        </div>

        {/* Columna derecha: Biografía */}
        <div className="flex-1 ">
          <h2 className="text-xl mb-10" style={{ fontFamily: 'titulos'}}>Biografía</h2>
          <p style={{ fontFamily: 'normal' }}>{piloto.biografia || "Biografía no disponible."}</p>

          {/* Mostrar la imagen del equipo actual */}
          {piloto.equipoActual && (
            <div className="mt-4">
              <h3 className="text-lg" style={{ fontFamily: 'titulos' }}>Equipo Actual</h3>
              <img
                src={`http://127.0.0.1:8000/uploads/${piloto.equipoActual}`} // Concateno la URL base con el nombre de la imagen
                alt={`Imagen del equipo de ${piloto.nombre}`}
                className="h-48 object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
