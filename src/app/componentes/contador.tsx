"use client"; 
import Link from "next/link";
import { useEffect, useState } from "react";

const ContadorRegresivo = () => {
  const [tiempoRestante, setTiempoRestante] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fechaCarrera, setFechaCarrera] = useState<Date | null>(null);
  const [nombreCarrera, setNombreCarrera] = useState<string>("");
  const [idCarrera, setIdCarrera] = useState<string>("");
  const [circuito, setCircuito] = useState<string>("");  

  // Función para obtener la fecha y nombre de la próxima carrera
  const fetchProximaCarrera = async () => {
    const anioActual = new Date().getFullYear();
    const url = `https://api.jolpi.ca/ergast/f1/2025.json`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Buscar la próxima carrera basada en la fecha actual
      const ahora = new Date();
      const proximaCarrera = data.MRData.RaceTable.Races.find(
        (carrera: any) => new Date(carrera.date) > ahora
      );

      if (proximaCarrera) {
        setFechaCarrera(new Date(`${proximaCarrera.date}T${proximaCarrera.time}`));
        setNombreCarrera(proximaCarrera.raceName); // Guardar el nombre de la carrera
        setIdCarrera(proximaCarrera.Circuit.circuitId);
        setCircuito(proximaCarrera.Circuit.circuitName);
        console.log(proximaCarrera);
      } else {
        console.log("No hay más carreras en esta temporada.");
      }
    } catch (error) {
      console.error("Error obteniendo la próxima carrera:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular el tiempo restante hasta la próxima carrera
  useEffect(() => {
    if (fechaCarrera) {
      const intervalo = setInterval(() => {
        const ahora = new Date();
        const diferencia = fechaCarrera.getTime() - ahora.getTime();

        if (diferencia <= 0) {
          setTiempoRestante("¡Es hora de la carrera!");
          clearInterval(intervalo);
        } else {
          const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
          const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
          const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
          const segundos = Math.floor((diferencia / 1000) % 60);

          setTiempoRestante(
            `${dias}d ${horas}h ${minutos}m ${segundos}s`
          );
        }
      }, 1000);

      return () => clearInterval(intervalo);
    }
  }, [fechaCarrera]);

  // Cargar la próxima carrera al montar el componente
  useEffect(() => {
    fetchProximaCarrera();
  }, []);

  if (loading) {
    return <div style={{ fontFamily: 'normal' }}>Cargando contador...</div>;
  }

  if (!fechaCarrera) {
    return <div style={{ fontFamily: 'normal' }} className="pt-5 text-lg">No hay más carreras programadas.</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px"}}>
      <h2 style={{ fontFamily: 'titulos' }}>Próxima Carrera</h2>
      <p style={{ fontFamily: 'nombres' }}><Link className="hover:text-red-600 hover:underline hover:font-bold" href={`/circuitos/${idCarrera}`}>{nombreCarrera}</Link></p> {/* Mostrar el nombre del Gran Premio */}
      <p style={{ fontFamily: 'nombres' }}><Link className="hover:text-red-600 hover:underline hover:font-bold" href={`/circuitos/${idCarrera}`}>{circuito}</Link></p> {/* Mostrar el nombre del Gran Premio */}
      <p style={{ fontFamily: 'normal' }}>Fecha: {fechaCarrera.toLocaleString()}</p>
      <h3 style={{ fontFamily: 'normal' }}>Tiempo restante: {tiempoRestante}</h3>
    </div>
  );
};

export default ContadorRegresivo;
