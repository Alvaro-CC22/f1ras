"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Si usas el enrutador clásico, pero con el nuevo enrutador puedes prescindir de esto.

const PilotoDetalle = ({ params }: { params: { id: string } }) => {
  const [piloto, setPiloto] = useState<any>(null); // Asegúrate de que sea un objeto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = params; // Obtén el id del piloto desde params

  useEffect(() => {
    if (!id) return; // Si no hay id, no hacemos nada

    // Realizamos la petición a la API para obtener los datos del piloto específico
    fetch(`http://127.0.0.1:8000/api/piloto/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del piloto');
        }
        return response.json();
      })
      .then((data) => {
        setPiloto(data); // Guardamos los datos del piloto
        setLoading(false); // Terminamos el loading
      })
      .catch((error) => {
        setError(error.message); // Capturamos cualquier error
        setLoading(false); // Terminamos el loading en caso de error
      });
  }, [id]); // Este efecto se ejecuta cuando el id cambia

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
