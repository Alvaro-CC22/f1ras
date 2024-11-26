"use client"; 
import { useEffect, useState } from "react";

const ContadorRegresivo = () => {
  const [tiempoRestante, setTiempoRestante] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fechaCarrera, setFechaCarrera] = useState<Date | null>(null);
  const [nombreCarrera, setNombreCarrera] = useState<string>("");

  // Función para obtener la fecha y nombre de la próxima carrera
  const fetchProximaCarrera = async () => {
    const anioActual = new Date().getFullYear();
    const url = `https://ergast.com/api/f1/${anioActual}.json`;
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
    return <div>Cargando contador...</div>;
  }

  if (!fechaCarrera) {
    return <div>No hay más carreras programadas.</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Próxima Carrera</h2>
      <p><strong>{nombreCarrera}</strong></p> {/* Mostrar el nombre del Gran Premio */}
      <p>Fecha: {fechaCarrera.toLocaleString()}</p>
      <h3>Tiempo restante: {tiempoRestante}</h3>
    </div>
  );
};

export default ContadorRegresivo;
