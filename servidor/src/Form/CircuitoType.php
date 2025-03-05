<?php

namespace App\Form;

use App\Entity\Circuito;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class CircuitoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('id', TextType::class, [
                'label' => 'ID del circuito',
                'required' => true,
            ])
            ->add('longitud', TextType::class, [
                'label' => 'Longitud del circuito',
                'required' => true,
            ])
            ->add('curvas', TextType::class, [
                'label' => 'Número de curvas',
                'required' => true,
            ])
            ->add('vueltaRecord', TextType::class, [
                'label' => 'Vuelta record',
                'required' => true,
            ])
            ->add('inauguracion', TextType::class, [
                'label' => 'Fecha de inauguración',
                'required' => true,
            ])
            ->add('historia', TextareaType::class, [
                'label' => 'Historia del circuito',
                'required' => true,
            ])
            ->add('imagen', FileType::class, [
                'label' => 'Imagen del circuito',
                'mapped' => false,  
                'required' => false, 
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Circuito::class,
        ]);
    }
}
