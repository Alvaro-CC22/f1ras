const nacionalidadAPais: Record<string, string> = {
    British: "United Kingdom",
    German: "Germany",
    Italian: "Italy",
    Spanish: "Spain",
    French: "France",
    Australian: "Australia",
    Brazilian: "Brazil",
    Canadian: "Canada",
    Dutch: "Netherlands",
    Finnish: "Finland",
    Monegasque: "Mónaco",
    Danish: "Denmark",
    "New Zealander": "New Zealand",
    Japanese: "Japan",
    Mexican: "Mexico",
    Chinese: "China",
    Thai: "Thailand",
    American: "United States of America",
    "Argentinian ": "Argentina",
  };
  
  export function obtenerPaisDesdeNacionalidad(nacionalidad: string): string {
    return nacionalidadAPais[nacionalidad] || nacionalidad; // Devuelve la nacionalidad como fallback
  }
  