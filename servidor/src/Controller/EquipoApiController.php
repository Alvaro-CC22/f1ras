<?php

namespace App\Controller;

use App\Entity\Equipo;
use App\Repository\EquipoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/equipos', name: 'api_equipos_')]
class EquipoApiController extends AbstractController
{
    // Ruta para obtener todos los equipos
    #[Route('', methods: ['GET'])]
    public function list(EquipoRepository $equipoRepository): JsonResponse
    {
        $equipos = $equipoRepository->findAll();

        if (!$equipos) {
            return $this->json(['error' => 'No hay equipos disponibles'], 404);
        }

        $equiposArray = [];
        foreach ($equipos as $equipo) {
            $equiposArray[] = [
                'id' => $equipo->getId(),
                'imagen' => $equipo->getImagen(),
                'historia' => $equipo->getHistoria(),
                'temporadas' => $equipo->getTemporadas(),
                'campeonatos' => $equipo->getCampeonatos(),
                'victorias' => $equipo->getVictorias(),
                'poles' => $equipo->getPoles(),
                'carreras' => $equipo->getCarreras(),
                'fundacion' => $equipo->getFundacion()->format('Y-m-d'),
                'campeonatoPiloto' => $equipo->getCampeonatoPiloto(),
                'puntos' => $equipo->getPuntos(),
                'podios' => $equipo->getPodios(),
            ];
        }

        return $this->json($equiposArray);
    }

    // Ruta para obtener un equipo específico por su ID
    #[Route('/{id}', methods: ['GET'])]
    public function show(EquipoRepository $equipoRepository, string $id): JsonResponse
    {
        $equipo = $equipoRepository->find($id);

        if (!$equipo) {
            return $this->json(['error' => 'Equipo no encontrado'], 404);
        }

        return $this->json([
            'id' => $equipo->getId(),
            'imagen' => $equipo->getImagen(),
            'historia' => $equipo->getHistoria(),
            'temporadas' => $equipo->getTemporadas(),
            'campeonatos' => $equipo->getCampeonatos(),
            'victorias' => $equipo->getVictorias(),
            'poles' => $equipo->getPoles(),
            'carreras' => $equipo->getCarreras(),
            'fundacion' => $equipo->getFundacion()->format('Y-m-d'),
            'campeonatoPiloto' => $equipo->getCampeonatoPiloto(),
            'puntos' => $equipo->getPuntos(),
            'podios' => $equipo->getPodios(),
        ]);
    }

    // Ruta para crear un nuevo equipo
    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $equipo = new Equipo();
        $equipo->setId($data['id']);
        $equipo->setImagen($data['imagen'] ?? null);
        $equipo->setHistoria($data['historia']);
        $equipo->setTemporadas($data['temporadas']);
        $equipo->setCampeonatos($data['campeonatos']);
        $equipo->setVictorias($data['victorias']);
        $equipo->setPoles($data['poles']);
        $equipo->setCarreras($data['carreras']);
        $equipo->setFundacion(new \DateTime($data['fundacion']));
        $equipo->setCampeonatoPiloto($data['campeonatoPiloto']);
        $equipo->setPuntos($data['puntos']);
        $equipo->setPodios($data['podios']);

        $entityManager->persist($equipo);
        $entityManager->flush();

        return $this->json($equipo, 201);
    }

    // Ruta para actualizar un equipo existente
    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, EntityManagerInterface $entityManager, EquipoRepository $equipoRepository, string $id): JsonResponse
    {
        $equipo = $equipoRepository->find($id);

        if (!$equipo) {
            return $this->json(['error' => 'Equipo no encontrado'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $equipo->setImagen($data['imagen'] ?? $equipo->getImagen());
        $equipo->setHistoria($data['historia'] ?? $equipo->getHistoria());
        $equipo->setTemporadas($data['temporadas'] ?? $equipo->getTemporadas());
        $equipo->setCampeonatos($data['campeonatos'] ?? $equipo->getCampeonatos());
        $equipo->setVictorias($data['victorias'] ?? $equipo->getVictorias());
        $equipo->setPoles($data['poles'] ?? $equipo->getPoles());
        $equipo->setCarreras($data['carreras'] ?? $equipo->getCarreras());
        if (isset($data['fundacion'])) {
            $equipo->setFundacion(new \DateTime($data['fundacion']));
        }
        $equipo->setCampeonatoPiloto($data['campeonatoPiloto'] ?? $equipo->getCampeonatoPiloto());
        $equipo->setPuntos($data['puntos'] ?? $equipo->getPuntos());
        $equipo->setPodios($data['podios'] ?? $equipo->getPodios());

        $entityManager->flush();

        return $this->json($equipo);
    }

    // Ruta para eliminar un equipo
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, EquipoRepository $equipoRepository, string $id): JsonResponse
    {
        $equipo = $equipoRepository->find($id);

        if (!$equipo) {
            return $this->json(['error' => 'Equipo no encontrado'], 404);
        }

        $entityManager->remove($equipo);
        $entityManager->flush();

        return $this->json(['message' => 'Equipo eliminado correctamente']);
    }
}
