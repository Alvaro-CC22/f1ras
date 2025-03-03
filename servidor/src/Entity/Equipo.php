<?php

namespace App\Entity;

use App\Repository\EquipoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EquipoRepository::class)]
class Equipo
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Length(min: 3, max: 255)]
    #[Assert\Unique]
    private ?string $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagen = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $historia = null;

    #[ORM\Column(length: 255)]
    private ?string $temporadas = null;

    #[ORM\Column(length: 255)]
    private ?string $campeonatos = null;

    #[ORM\Column(length: 255)]
    private ?string $victorias = null;

    #[ORM\Column(length: 255)]
    private ?string $poles = null;

    #[ORM\Column(length: 255)]
    private ?string $carreras = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fundacion = null;

    #[ORM\Column(length: 255)]
    private ?string $campeonatoPiloto = null;

    #[ORM\Column(length: 255)]
    private ?string $puntos = null;

    #[ORM\Column(length: 255)]
    private ?string $podios = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): static
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

    public function getHistoria(): ?string
    {
        return $this->historia;
    }

    public function setHistoria(string $historia): static
    {
        $this->historia = $historia;

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

    public function getCampeonatos(): ?string
    {
        return $this->campeonatos;
    }

    public function setCampeonatos(string $campeonatos): static
    {
        $this->campeonatos = $campeonatos;

        return $this;
    }

    public function getVictorias(): ?string
    {
        return $this->victorias;
    }

    public function setVictorias(string $victorias): static
    {
        $this->victorias = $victorias;

        return $this;
    }

    public function getPoles(): ?string
    {
        return $this->poles;
    }

    public function setPoles(string $poles): static
    {
        $this->poles = $poles;

        return $this;
    }

    public function getCarreras(): ?string
    {
        return $this->carreras;
    }

    public function setCarreras(string $carreras): static
    {
        $this->carreras = $carreras;

        return $this;
    }

    public function getFundacion(): ?\DateTimeInterface
    {
        return $this->fundacion;
    }

    public function setFundacion(\DateTimeInterface $fundacion): static
    {
        $this->fundacion = $fundacion;

        return $this;
    }

    public function getCampeonatoPiloto(): ?string
    {
        return $this->campeonatoPiloto;
    }

    public function setCampeonatoPiloto(string $campeonatoPiloto): static
    {
        $this->campeonatoPiloto = $campeonatoPiloto;

        return $this;
    }

    public function getPuntos(): ?string
    {
        return $this->puntos;
    }

    public function setPuntos(string $puntos): static
    {
        $this->puntos = $puntos;

        return $this;
    }

    public function getPodios(): ?string
    {
        return $this->podios;
    }

    public function setPodios(string $podios): static
    {
        $this->podios = $podios;

        return $this;
    }
}
