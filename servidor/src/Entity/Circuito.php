<?php

namespace App\Entity;

use App\Repository\CircuitoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CircuitoRepository::class)]
class Circuito
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Length(min: 3, max: 255)]
    #[Assert\Unique]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $longitud = null;

    #[ORM\Column(length: 255)]
    private ?string $curvas = null;

    #[ORM\Column(length: 255)]
    private ?string $vueltaRecord = null;

    #[ORM\Column(length: 255)]
    private ?string $inauguracion = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $historia = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getLongitud(): ?string
    {
        return $this->longitud;
    }

    public function setLongitud(string $longitud): static
    {
        $this->longitud = $longitud;

        return $this;
    }

    public function getCurvas(): ?string
    {
        return $this->curvas;
    }

    public function setCurvas(string $curvas): static
    {
        $this->curvas = $curvas;

        return $this;
    }

    public function getVueltaRecord(): ?string
{
    return $this->vueltaRecord;
}

public function setVueltaRecord(string $vueltaRecord): static
{
    $this->vueltaRecord = $vueltaRecord;
    return $this;
}


    public function getInauguracion(): ?string
    {
        return $this->inauguracion;
    }

    public function setInauguracion(string $inauguracion): static
    {
        $this->inauguracion = $inauguracion;

        return $this;
    }

    public function getHistoria(): ?string
    {
        return $this->historia;
    }

    public function setHistoria(string $historia): static
    {
        $this->historia = $historia;

        return $this;
    }
}
