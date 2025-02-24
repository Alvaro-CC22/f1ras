<?php

namespace App\Controller;

use App\Entity\Piloto;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PilotoApiController extends AbstractController
{
    // Ruta para obtener todos los pilotos
    #[Route('/api/pilotos', name: 'api_pilotos', methods: ['GET'])]
    public function getPilotos(EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener todos los pilotos desde la base de datos
        $pilotos = $entityManager->getRepository(Piloto::class)->findAll();

        if (!$pilotos) {
            // Si no hay pilotos en la base de datos, devolver un error 404
            throw new NotFoundHttpException('No hay pilotos disponibles.');
        }

        // Convertir los objetos Piloto a un array para responder como JSON
        $pilotosArray = [];
        foreach ($pilotos as $piloto) {
            $pilotosArray[] = [
                'id' => $piloto->getId(),
                'imagen' => $piloto->getImagen(),
                'biografia' => $piloto->getBiografia(),
                'temporadas' => $piloto->getTemporadas(),
                'poles' => $piloto->getPoles(),
                'fastLaps' => $piloto->getFastLaps(),
                'podios' => $piloto->getPodios(),
            ];
        }

        // Devolver la respuesta en formato JSON
        return new JsonResponse($pilotosArray);
    }

    // Ruta para obtener un piloto específico por su ID
    #[Route('/api/piloto/{id}', name: 'api_piloto', methods: ['GET'])]
    public function getPiloto(string $id, EntityManagerInterface $entityManager): JsonResponse
    {
        // Buscar el piloto por ID
        $piloto = $entityManager->getRepository(Piloto::class)->find($id);

        if (!$piloto) {
            // Si el piloto no existe, devolver un error 404
            throw new NotFoundHttpException('Piloto no encontrado.');
        }

        // Convertir el objeto Piloto a un array
        $pilotoArray = [
            'id' => $piloto->getId(),
            'imagen' => $piloto->getImagen(),
            'biografia' => $piloto->getBiografia(),
            'temporadas' => $piloto->getTemporadas(),
            'poles' => $piloto->getPoles(),
            'fastLaps' => $piloto->getFastLaps(),
            'podios' => $piloto->getPodios(),
            'equipoActual' => $piloto->getEquipoActual(),
        ];

        // Devolver la respuesta en formato JSON
        return new JsonResponse($pilotoArray);
    }
}
