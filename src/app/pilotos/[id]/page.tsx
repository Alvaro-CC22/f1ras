"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerPilotoPorId } from "../../servicios/pilotos"; // Asegúrate de que la ruta sea correcta
import Navbar from "../../componentes/navbar";
import { Piloto } from "../../lib/definitions"; // Importa la interfaz Piloto
import React from "react";

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
      <div>
        <Navbar />
        <p>Cargando datos del piloto...</p>
      </div>
    );
  }

  if (!piloto) {
    return (
      <div>
        <Navbar />
        <p>Piloto no encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>{`${piloto.nombre}`}</h1>
      <p>Nombre: {piloto.nombre}</p>
      <p>Edad: {piloto.edad}</p>
      <p>País: {piloto.pais}</p>
      <p>Fecha de Nacimiento: {new Date(piloto.fechaNacimiento).toLocaleDateString()}</p>
      <p>Número Piloto: {piloto.numeroPiloto}</p>
      <p>Puntos: {piloto.puntos}</p>
      <p>Temporadas: {piloto.temporadas}</p>
      <p>Campeonatos: {piloto.campeonatos}</p>
      <p>Victorias: {piloto.victorias}</p>
      <p>Podios: {piloto.podios}</p>
      <p>Poles: {piloto.poles}</p>
      <p>Vueltas récord: {piloto.vueltasRecord}</p>
      <p>
        Más información:{" "}
        <a href={piloto.equipoId ? `/equipos/${piloto.equipoId}` : "#"}>Ver equipo</a>
      </p>
    </div>
  );
}
