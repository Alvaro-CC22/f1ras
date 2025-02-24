<?php

namespace App\Entity;

use App\Repository\PilotoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(uniqueConstraints: [new ORM\UniqueConstraint(name: 'unique_id', columns: ['id'])])]
class Piloto
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Length(min: 3, max: 255)]
    #[Assert\Unique]
    private ?string $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagen = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $biografia = null;

    #[ORM\Column(length: 255)]
    private ?string $temporadas = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $poles = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fastLaps = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $podios = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $EquipoActual = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {  
        $this->id = $id;
        return $this;
    }


    public function getImagen(): ?string
    {
        return $this->imagen;
    }

    public function setImagen(?string $imagen): static
    {
        $this->imagen = $imagen;

        return $this;
    }

    public function getBiografia(): ?string
    {
        return $this->biografia;
    }

    public function setBiografia(?string $biografia): static
    {
        $this->biografia = $biografia;

        return $this;
    }

    public function getTemporadas(): ?string
    {
        return $this->temporadas;
    }

    public function setTemporadas(string $temporadas): static
    {
        $this->temporadas = $temporadas;

        return $this;
    }

    public function getPoles(): ?string
    {
        return $this->poles;
    }

    public function setPoles(?string $poles): static
    {
        $this->poles = $poles;

        return $this;
    }

    public function getFastLaps(): ?string
    {
        return $this->fastLaps;
    }

    public function setFastLaps(?string $fastLaps): static
    {
        $this->fastLaps = $fastLaps;

        return $this;
    }

    public function getPodios(): ?string
    {
        return $this->podios;
    }

    public function setPodios(?string $podios): static
    {
        $this->podios = $podios;

        return $this;
    }

    public function getEquipoActual(): ?string
    {
        return $this->EquipoActual;
    }

    public function setEquipoActual(?string $EquipoActual): static
    {
        $this->EquipoActual = $EquipoActual;

        return $this;
    }
}
