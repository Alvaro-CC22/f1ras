<?php

namespace App\Controller;

use App\Entity\Circuito;
use App\Form\CircuitoType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CircuitoController extends AbstractController
{
    #[Route('/circuito/nuevo', name: 'circuito_new')]
    public function nuevo(Request $request, EntityManagerInterface $entityManager): Response
    {
        $circuito = new Circuito();
        $form = $this->createForm(CircuitoType::class, $circuito);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($circuito);
            $entityManager->flush();

            return $this->redirectToRoute('circuito_index');
        }

        return $this->render('circuito/nuevo.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/circuito/editar/{id}', name: 'circuito_edit')]
    public function editar($id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $circuito = $entityManager->getRepository(Circuito::class)->find($id);

        if (!$circuito) {
            $this->addFlash('error', 'Circuito no encontrado.');
            return $this->redirectToRoute('circuito_index');
        }

        $form = $this->createForm(CircuitoType::class, $circuito);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();
            $this->addFlash('success', 'Circuito actualizado con éxito.');
            return $this->redirectToRoute('circuito_index');
        }

        return $this->render('circuito/editar.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/circuitos', name: 'circuito_index')]
    public function listaCircuitos(EntityManagerInterface $entityManager): Response
    {
        $circuitos = $entityManager->getRepository(Circuito::class)->findAll();
        return $this->render('circuito/index.html.twig', [
            'circuitos' => $circuitos,
        ]);
    }

    #[Route('/circuito/{id}', name: 'circuito_show')]
    public function show(Circuito $circuito): Response
    {
        return $this->render('circuito/show.html.twig', [
            'circuito' => $circuito,
        ]);
    }

    #[Route('/circuito/{id}', name: 'circuito_delete', methods: ['POST'])]
    public function delete(Request $request, Circuito $circuito, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$circuito->getId(), $request->request->get('_token'))) {
            $entityManager->remove($circuito);
            $entityManager->flush();
        }

        return $this->redirectToRoute('circuito_index');
    }
}