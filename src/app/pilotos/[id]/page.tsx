"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerPilotoPorId, obtenerResultadosCarrera } from "../../servicios/pilotos"; // Asegúrate de que la ruta sea correcta
import Navbar from "../../componentes/navbar";
import { Piloto } from "../../lib/definitions"; // Importa la interfaz Piloto
import React from "react";
import { obtenerPaisDesdeNacionalidad } from "@/app/lib/utils";

export default function PilotoPage({ params }: { params: Promise<{ id: string }> }) {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  // Usamos React.use() para desempaquetar la promesa
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
    if (!unwrappedParams) return; // Si aún no tenemos los parámetros, no hacemos nada
    const { id } = unwrappedParams;

    const cargarDatosPiloto = async () => {
      const resultadosCarrera = await obtenerResultadosCarrera(id); // Ejemplo con el ID de Alonso
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
        <div className="mr-14">
          <h1 className="text-lg" style={{ fontFamily: 'nombres'}}>{`${piloto.nombre}`}</h1>
          
          {piloto.imagen && (
            <img
              src={`http://127.0.0.1:8000/uploads/${piloto.imagen}`} // Concatenamos la URL base con el nombre de la imagen
              alt={`Foto de ${piloto.nombre}`}
              className="ml-10 w-60 h-60 mb-10 object-cover rounded"
            />
          )}
          
          <p><span style={{ fontFamily: 'titulos' }}>Edad<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span><span style={{ fontFamily: 'normal' }}> {piloto.edad}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>País<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{obtenerPaisDesdeNacionalidad(piloto.pais)}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Fecha de Nacimiento<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{new Date(piloto.fechaNacimiento).toLocaleDateString()}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Número Piloto<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.numeroPiloto}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Puntos<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.puntos}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Temporadas<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.temporadas}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Campeonatos<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.campeonatos}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Victorias<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.victorias}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Podios<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.podios}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Poles<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.poles}</span></p>
          <p><span style={{ fontFamily: 'titulos' }}>Vueltas Rápidas<span className="font-bold" style={{ fontFamily: 'normal' }}>:</span></span> <span style={{ fontFamily: 'normal' }}>{piloto.vueltasRecord}</span></p>
        </div>

        {/* Columna derecha: Biografía */}
        <div className="flex-1">
          <h2 className="text-xl mb-10" style={{ fontFamily: 'titulos'}}>Biografía</h2>
          <p style={{ fontFamily: 'normal' }}>{piloto.biografia || "Biografía no disponible."}</p>

          {/* Mostrar la imagen del equipo actual */}
          {piloto.equipoActual && (
            <div className="mt-4">
              <h3 className="text-lg" style={{ fontFamily: 'titulos' }}>Equipo Actual</h3>
              <img
                src={`http://127.0.0.1:8000/uploads/${piloto.equipoActual}`} // Concatenamos la URL base con el nombre de la imagen
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
