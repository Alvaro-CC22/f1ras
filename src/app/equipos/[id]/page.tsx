"use client";

import { useEffect, useState } from "react";
import Navbar from "../../componentes/navbar";
import { obtenerEquipoPorId } from "../../servicios/equipos"; 
import { Equipo } from "../../lib/definitions";
import React from "react";
import { obtenerPaisDesdeNacionalidad } from "@/app/lib/utils";

export default function EquipoPage({ params }: { params: Promise<{ id: string }> }) {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);
  const [equipo, setEquipo] = useState<Equipo | null>(null);
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

    const cargarDatosEquipo = async () => {
      setLoading(true);
      try {
        const datosEquipo = await obtenerEquipoPorId(id);
        console.log("Datos del equipo:", datosEquipo);
        
        if (datosEquipo) {
          setEquipo(datosEquipo);
        } else {
          throw new Error("Datos del equipo no encontrados.");
        }
      } catch (error) {
        console.error("Error cargando los datos del equipo:", error);
      } finally {
        setLoading(false);
      }
    };
    


    cargarDatosEquipo();
  }, [unwrappedParams]);

  if (loading) {
    return (
      <div className="w-fit">
        <Navbar />
        <p style={{ fontFamily: 'normal' }}>Cargando datos del equipo...</p>
      </div>
    );
  }

  if (!equipo) {
    return (
      <div className="w-fit">
        <Navbar />
        <p style={{ fontFamily: 'normal' }}>Equipo no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <Navbar />
      <div className="flex">
      <div className="mr-10 ml-6">
        <h1 className="text-2xl" style={{ fontFamily: 'nombres' }}>{equipo.nombre}</h1>
        {equipo.imagen && (
          <img
            src={`http://127.0.0.1:8000/uploads/${equipo.imagen}`}
            alt={`Logo de ${equipo.nombre}`}
            className="ml-10 h-60 mb-10 object-cover rounded"
          />
        )}
        <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr className="border border-gray-300">
            <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>País</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{obtenerPaisDesdeNacionalidad(equipo.pais)}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Fundación</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{new Date(equipo.fundacion).toLocaleDateString()}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Campeonatos de Constructores</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{equipo.campeonatos}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Campeonatos de Piloto</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{equipo.campeonatosPilotos}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Victorias</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{equipo.victorias}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Podios</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{equipo.podios}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 bg-white" style={{ fontFamily: 'titulos' }}>Poles</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{equipo.poles}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-2 bg-red-600" style={{ fontFamily: 'titulos' }}>Puntos</td>
            <td className="p-2 bg-black text-white" style={{ fontFamily: 'normal' }}>{equipo.puntos}</td>
          </tr>
        </tbody>
      </table>
        
      </div>
      <div className="flex-1 max-w-screen-xl mr-10 mx-auto">
        <h2 className="text-xl mb-10" style={{ fontFamily: 'titulos' }}>Historia</h2>
        <p style={{ fontFamily: 'normal' }}>{equipo.historia || "Historia no disponible."}</p>
      </div>
    </div>
    </div>
  );
}
