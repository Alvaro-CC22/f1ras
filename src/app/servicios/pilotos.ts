import { useState } from "react";
import { Piloto } from "../lib/definitions";

const url = "http://ergast.com/api/f1/";


export default function buscaPilotos() {
    const [pilotos, setPilotos] = useState<Piloto[]>([]);

const fetchF1drivers = async () => {
    try {
      const response = await fetch('http://ergast.com/api/f1/2024/drivers');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching F1 data:', error);
    }
  };
  
  fetchF1drivers();
}

const obtenerPilotos2024 = async (): Promise<Piloto[]> => {
    const url = "http://ergast.com/api/f1/2024/drivers.json";
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pilotos = data.MRData.DriverTable.Drivers;
  
      return pilotos.map((piloto: any, index: number): Piloto => {
        const nacimiento = new Date(piloto.dateOfBirth);
        const edad = new Date().getFullYear() - nacimiento.getFullYear();
  
        return {
          id: index + 1,
          nombre: `${piloto.givenName} ${piloto.familyName}`,
          acronimo: piloto.code || "N/A",
          edad: edad,
          fechaNacimiento: piloto.dateOfBirth,
          numeroPiloto: parseInt(piloto.permanentNumber || "0"),
          equipoId: undefined, // Este dato no está disponible en Ergast
          temporadas: 1, // Ajustar según información adicional
          campeonatos: 0, // Ajustar según información adicional
          victorias: 0, // Ajustar según información adicional
          poles: 0, // Ajustar según información adicional
          vueltasRecord: 0, // Ajustar según información adicional
          vueltasRecordId: undefined,
          retirado: false, // Asumido activo en 2024
        };
      });
    } catch (error) {
      console.error("Error al obtener los pilotos:", error);
      return [];
    }
  };
  
  // Ejemplo de uso
  obtenerPilotos2024().then((pilotos) => console.log(pilotos));
  