const nacionalidadAPais: Record<string, string> = {
  British: "Reino Unido",
  German: "Alemania",
  Italian: "Italia",
  Spanish: "España",
  French: "Francia",
  Australian: "Australia",
  Brazilian: "Brasil",
  Canadian: "Canadá",
  Dutch: "Países Bajos",
  Finnish: "Finlandia",
  Monegasque: "Mónaco",
  Danish: "Dinamarca",
  "New Zealander": "Nueva Zelanda",
  Japanese: "Japón",
  Mexican: "México",
  Chinese: "China",
  Thai: "Tailandia",
  American: "Estados Unidos",
  "Argentinian ": "Argentina",
  Polish: "Polonia",
  Austrian: "Austria",
  Portuguese: "Portugal",
  Belgian: "Bélgica",
  Venezuelan: "Venezuela",
  Swedish: "Suecia",
  Chilean: "Chile",
  Colombian: "Colombia",
  Irish: "Irlanda",
  Swiss: "Suiza",
  Argentine: "Argentina",
  "South African": "Sudáfrica"
};
  
  export function obtenerPaisDesdeNacionalidad(nacionalidad: string): string {
    return nacionalidadAPais[nacionalidad] || nacionalidad; 
  }
  
  export const obtenerColorPorPosicion = (posicion: number) => {
    if (posicion === 1) {
      return "dorado";
    } else if (posicion === 2) {
      return "plateado";
    } else if (posicion === 3) {
      return "bronze";
    }
    return "";
  };