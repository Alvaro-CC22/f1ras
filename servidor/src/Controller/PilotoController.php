<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Piloto;
use App\Form\PilotoType;

class PilotoController extends AbstractController
{
    #[Route('/piloto/nuevo', name: 'nuevo_piloto')]
    public function nuevo(Request $request, EntityManagerInterface $entityManager)
    {
        $piloto = new Piloto();
        $form = $this->createForm(PilotoType::class, $piloto);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Procesar la imagen del piloto
            /** @var UploadedFile $imagenFile */
            $imagenFile = $form->get('imagen')->getData();

            if ($imagenFile) {
                $nuevoNombre = uniqid().'.'.$imagenFile->guessExtension();

                try {
                    $imagenFile->move(
                        $this->getParameter('imagenes_dir'), // Carpeta donde se guardarán las imágenes
                        $nuevoNombre
                    );
                    $piloto->setImagen($nuevoNombre); // Guardamos el nombre de la imagen del piloto en la base de datos
                } catch (FileException $e) {
                    $this->addFlash('error', 'No se pudo subir la imagen del piloto.');
                }
            }

            // Procesar la imagen del equipo actual
            /** @var UploadedFile $imagenEquipoFile */
            $EquipoFile = $form->get('EquipoActual')->getData();

            if ($EquipoFile) {
                $nuevoNombreEquipo = uniqid().'.'.$EquipoFile->guessExtension();

                try {
                    $EquipoFile->move(
                        $this->getParameter('imagenes_dir'), // Carpeta donde se guardarán las imágenes del equipo
                        $nuevoNombreEquipo
                    );
                    $piloto->setEquipoActual($nuevoNombreEquipo); // Guardamos el nombre de la imagen del equipo en la base de datos
                } catch (FileException $e) {
                    $this->addFlash('error', 'No se pudo subir la imagen del equipo.');
                }
            }

            // Guardar los datos en la base de datos
            $entityManager->persist($piloto);
            $entityManager->flush();

            return $this->redirectToRoute('lista_pilotos');
        }

        return $this->render('piloto/nuevo.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/piloto/editar/{id}', name: 'editar_piloto')]
    public function editar($id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $piloto = $entityManager->getRepository(Piloto::class)->find($id);

        if (!$piloto) {
            $this->addFlash('error', 'Piloto no encontrado.');
            return $this->redirectToRoute('lista_pilotos');
        }

        $form = $this->createForm(PilotoType::class, $piloto);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $imagenFile */
            $imagenFile = $form->get('imagen')->getData();
            /** @var UploadedFile $equipoActualFile */
            $equipoActualFile = $form->get('EquipoActual')->getData();

            // Procesar la imagen del piloto
            if ($imagenFile) {
                $nuevoNombre = uniqid().'.'.$imagenFile->guessExtension();
                try {
                    $imagenFile->move(
                        $this->getParameter('imagenes_dir'),
                        $nuevoNombre
                    );
                    $piloto->setImagen($nuevoNombre);
                } catch (FileException $e) {
                    $this->addFlash('error', 'No se pudo subir la imagen del piloto.');
                }
            }

            // Procesar la imagen del equipo actual
            if ($equipoActualFile) {
                $nuevoNombreEquipo = uniqid().'.'.$equipoActualFile->guessExtension();
                try {
                    $equipoActualFile->move(
                        $this->getParameter('imagenes_dir'),
                        $nuevoNombreEquipo
                    );
                    $piloto->setEquipoActual($nuevoNombreEquipo);  // Guardamos el nombre del archivo de la imagen
                } catch (FileException $e) {
                    $this->addFlash('error', 'No se pudo subir la imagen del equipo.');
                }
            }

            $entityManager->flush(); // Actualizamos la base de datos

            $this->addFlash('success', 'Piloto actualizado con éxito.');
            return $this->redirectToRoute('lista_pilotos');
        }

        return $this->render('piloto/editar.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/pilotos', name: 'lista_pilotos')]
    public function listaPilotos(EntityManagerInterface $entityManager): Response
    {
        // Obtener todos los pilotos desde la base de datos
        $pilotos = $entityManager->getRepository(Piloto::class)->findAll();

        // Pasar los pilotos a la plantilla
        return $this->render('piloto/lista.html.twig', [
            'pilotos' => $pilotos, 
        ]);
    }

}
