<?php


namespace App\Form;

use App\Entity\Equipo;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class EquipoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('id', TextType::class, [
                'label' => 'ID del equipo (nombre único)',
                'required' => true,
            ])
            ->add('imagen', FileType::class, [
                'label' => 'Imagen del equipo',
                'mapped' => false,  
                'required' => false,
            ])
            ->add('historia', TextareaType::class, [
                'label' => 'Historia del equipo',
                'required' => true,
            ])
            ->add('temporadas', TextType::class, [
                'label' => 'Número de temporadas',
                'required' => true,
            ])
            ->add('campeonatos', TextType::class, [  
                'label' => 'Número de campeonatos',
                'required' => true,
            ])
            ->add('victorias', TextType::class, [ 
                'label' => 'Número de victorias',
                'required' => true,
            ])
            ->add('poles', TextType::class, [ 
                'label' => 'Número de poles',
                'required' => true,
            ])
            ->add('carreras', TextType::class, [ 
                'label' => 'Número de carreras',
                'required' => true,
            ])
            ->add('fundacion', DateType::class, [
                'label' => 'Fecha de fundación',
                'widget' => 'single_text', 
                'required' => true,
            ])
            ->add('campeonatoPiloto', TextType::class, [
                'label' => 'Campeonato de pilotos',
                'required' => true,
            ])
            ->add('puntos', TextType::class, [  
                'label' => 'Puntos',
                'required' => true,
            ])
            ->add('podios', TextType::class, [ 
                'label' => 'Podios',
                'required' => true,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Equipo::class, 
        ]);
    }
}
