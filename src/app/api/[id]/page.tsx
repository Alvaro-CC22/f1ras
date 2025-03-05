"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 

const PilotoDetalle = ({ params }: { params: { id: string } }) => {
  const [piloto, setPiloto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = params; // Obtenemos el id del piloto desde params

  useEffect(() => {
    if (!id) return; 

    // Realizamos la petición a la API para obtener los datos del piloto específico
    fetch(`http://127.0.0.1:8000/api/piloto/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del piloto');
        }
        return response.json();
      })
      .then((data) => {
        setPiloto(data); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); 
        setLoading(false); 
      });
  }, [id]); 

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Detalle del Piloto</h1>
      {piloto ? (
        <div>
          <h2>{piloto.nombre}</h2>
          <img
            src={`http://127.0.0.1:8000/uploads/${piloto.imagen}`}
            alt={piloto.nombre}
            width="200"
          />
          <p><strong>Biografía:</strong> {piloto.biografia}</p>
          <ul>
            <li><strong>Temporadas:</strong> {piloto.temporadas}</li>
            <li><strong>Poles:</strong> {piloto.poles}</li>
            <li><strong>Vueltas rápidas:</strong> {piloto.fastLaps}</li>
            <li><strong>Podios:</strong> {piloto.podios}</li>
          </ul>
        </div>
      ) : (
        <p>Información del piloto no disponible.</p>
      )}
    </div>
  );
};

export default PilotoDetalle;
