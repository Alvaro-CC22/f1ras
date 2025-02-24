// pages/pilotos.js
"use client";
import { useEffect, useState } from 'react';

const Pilotos = () => {
  const [pilotos, setPilotos] = useState<any[]>([]); // Asegúrate de que sea un arreglo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizamos la petición a la API
    fetch('http://127.0.0.1:8000/api/pilotos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los pilotos');
        }
        return response.json();
      })
      .then((data) => {
        // Verifica que data sea un arreglo
        if (Array.isArray(data)) {
          setPilotos(data); // Guardamos los datos si son un arreglo
        } else {
          setError('La respuesta de la API no es un arreglo');
        }
        setLoading(false); // Terminamos el loading
      })
      .catch((error) => {
        setError(error.message); // Capturamos cualquier error
        setLoading(false); // Terminamos el loading en caso de error
      });
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Pilotos</h1>
      <ul>
        {pilotos.map((piloto) => (
          <li key={piloto.id}>
            <h2>{piloto.id}</h2>
            <img
              src={`http://127.0.0.1:8000/uploads/${piloto.imagen}`}
              alt={piloto.id}
              width="200"
            />
            <p>{piloto.biografia}</p>
            <ul>
              <li>Temporadas: {piloto.temporadas}</li>
              <li>Poles: {piloto.poles}</li>
              <li>Fast Laps: {piloto.fastLaps}</li>
              <li>Podios: {piloto.podios}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pilotos;
