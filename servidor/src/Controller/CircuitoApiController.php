<?php

namespace App\Controller;

use App\Entity\Circuito;
use App\Repository\CircuitoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/circuitos', name: 'api_circuitos_')]
class CircuitoApiController extends AbstractController
{
    // Obtener todos los circuitos
    #[Route('', methods: ['GET'])]
    public function list(CircuitoRepository $circuitoRepository): JsonResponse
    {
        $circuitos = $circuitoRepository->findAll();

        if (!$circuitos) {
            return $this->json(['error' => 'No hay circuitos disponibles'], 404);
        }

        $circuitosArray = array_map(fn($circuito) => [
            'id' => $circuito->getId(),
            'longitud' => $circuito->getLongitud(),
            'curvas' => $circuito->getCurvas(),
            'vueltaRecord' => $circuito->getVueltaRecord(),
            'inauguracion' => $circuito->getInauguracion(),
            'historia' => $circuito->getHistoria()
        ], $circuitos);

        return $this->json($circuitosArray);
    }

    // Obtener un circuito por ID
    #[Route('/{id}', methods: ['GET'])]
    public function show(CircuitoRepository $circuitoRepository, string $id): JsonResponse
    {
        $circuito = $circuitoRepository->find($id);

        if (!$circuito) {
            return $this->json(['error' => 'Circuito no encontrado'], 404);
        }

        return $this->json([
            'id' => $circuito->getId(),
            'longitud' => $circuito->getLongitud(),
            'curvas' => $circuito->getCurvas(),
            'vueltaRecord' => $circuito->getVueltaRecord(),
            'inauguracion' => $circuito->getInauguracion(),
            'historia' => $circuito->getHistoria()
        ]);
    }

    // Crear un nuevo circuito
    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $circuito = new Circuito();
        $circuito->setLongitud($data['longitud'] ?? '');
        $circuito->setCurvas($data['curvas'] ?? '');
        $circuito->setVueltaRecord($data['vueltaRecord'] ?? '');
        $circuito->setInauguracion($data['inauguracion'] ?? '');
        $circuito->setHistoria($data['historia'] ?? '');

        $entityManager->persist($circuito);
        $entityManager->flush();

        return $this->json($circuito, 201);
    }

    // Actualizar un circuito existente
    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, EntityManagerInterface $entityManager, CircuitoRepository $circuitoRepository, string $id): JsonResponse
    {
        $circuito = $circuitoRepository->find($id);

        if (!$circuito) {
            return $this->json(['error' => 'Circuito no encontrado'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $circuito->setLongitud($data['longitud'] ?? $circuito->getLongitud());
        $circuito->setCurvas($data['curvas'] ?? $circuito->getCurvas());
        $circuito->setVueltaRecord($data['vueltaRecord'] ?? $circuito->getVueltaRecord());
        $circuito->setInauguracion($data['inauguracion'] ?? $circuito->getInauguracion());
        $circuito->setHistoria($data['historia'] ?? $circuito->getHistoria());

        $entityManager->flush();

        return $this->json($circuito);
    }

    // Eliminar un circuito
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, CircuitoRepository $circuitoRepository, string $id): JsonResponse
    {
        $circuito = $circuitoRepository->find($id);

        if (!$circuito) {
            return $this->json(['error' => 'Circuito no encontrado'], 404);
        }

        $entityManager->remove($circuito);
        $entityManager->flush();

        return $this->json(['message' => 'Circuito eliminado correctamente']);
    }
}
