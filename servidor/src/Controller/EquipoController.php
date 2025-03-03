<?php

namespace App\Controller;

use App\Entity\Equipo;
use App\Form\EquipoType;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;

class EquipoController extends AbstractController
{
    #[Route('/equipo/nuevo', name: 'equipo_new')]
    public function nuevo(Request $request, EntityManagerInterface $entityManager): Response
    {
        $equipo = new Equipo();
        $form = $this->createForm(EquipoType::class, $equipo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $imagenFile */
            $imagenFile = $form->get('imagen')->getData();

            if ($imagenFile) {
                $nuevoNombre = uniqid().'.'.$imagenFile->guessExtension();

                try {
                    $imagenFile->move(
                        $this->getParameter('imagenes_dir'), // Carpeta donde se guardarán las imágenes
                        $nuevoNombre
                    );
                    $equipo->setImagen($nuevoNombre); // Guardamos el nombre de la imagen en la base de datos
                } catch (FileException $e) {
                    $this->addFlash('error', 'No se pudo subir la imagen del equipo.');
                }
            }

            $entityManager->persist($equipo);
            $entityManager->flush();

            return $this->redirectToRoute('equipo_index');
        }

        return $this->render('equipo/nuevo.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/equipo/editar/{id}', name: 'equipo_edit')]
    public function editar($id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $equipo = $entityManager->getRepository(Equipo::class)->find($id);

        if (!$equipo) {
            $this->addFlash('error', 'Equipo no encontrado.');
            return $this->redirectToRoute('equipo_index');
        }

        $form = $this->createForm(EquipoType::class, $equipo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $imagenFile */
            $imagenFile = $form->get('imagen')->getData();

            if ($imagenFile) {
                $nuevoNombre = uniqid().'.'.$imagenFile->guessExtension();
                try {
                    $imagenFile->move(
                        $this->getParameter('imagenes_dir'),
                        $nuevoNombre
                    );
                    $equipo->setImagen($nuevoNombre);
                } catch (FileException $e) {
                    $this->addFlash('error', 'No se pudo subir la imagen del equipo.');
                }
            }

            $entityManager->flush(); // Actualizamos la base de datos

            $this->addFlash('success', 'Equipo actualizado con éxito.');
            return $this->redirectToRoute('equipo_index');
        }

        return $this->render('equipo/editar.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/equipos', name: 'equipo_index')]
    public function listaEquipos(EntityManagerInterface $entityManager): Response
    {
        // Obtener todos los equipos desde la base de datos
        $equipos = $entityManager->getRepository(Equipo::class)->findAll();

        // Pasar los equipos a la plantilla
        return $this->render('equipo/index.html.twig', [
            'equipos' => $equipos, 
        ]);
    }

    #[Route('/equipo/{id}', name: 'equipo_show')]
    public function show(Equipo $equipo): Response
    {
        return $this->render('equipo/show.html.twig', [
            'equipo' => $equipo,
        ]);
    }

    #[Route('/equipo/{id}', name: 'equipo_delete', methods: ['POST'])]
    public function delete(Request $request, Equipo $equipo, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$equipo->getId(), $request->request->get('_token'))) {
            $entityManager->remove($equipo);
            $entityManager->flush();
        }

        return $this->redirectToRoute('equipo_index');
    }
}
