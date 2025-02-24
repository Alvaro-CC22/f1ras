<?php
// src/Form/PilotoType.php
namespace App\Form;

use App\Entity\Piloto;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class PilotoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('id', TextType::class, [
                'label' => 'ID del piloto (nombre único)',
                'required' => true,
            ])
            ->add('imagen', FileType::class, [
                'label' => 'Imagen del piloto',
                'mapped' => false,  // Importante: Evita que Symfony intente guardar el archivo directamente en la entidad
                'required' => false,
            ])
            ->add('EquipoActual', FileType::class, [
                'label' => 'Imagen del equipo actual', // Para manejar la imagen del equipo
                'mapped' => false,  // Importante: Evita que Symfony intente guardar el archivo directamente en la entidad
                'required' => false, // Este campo es opcional, solo se subirá si el usuario lo proporciona
            ])
            ->add('biografia')
            ->add('temporadas')
            ->add('poles')
            ->add('fastLaps')
            ->add('podios');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Piloto::class,
        ]);
    }
}
