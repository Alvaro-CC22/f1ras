"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMenuStyles = () => {
    // Estilo condicional según el ancho de la pantalla
    if (screenWidth <= 340) {
      return {
        background: "black",
        border: "8px double red",
        borderRadius: "10px",
        width: "330px", // Mantener un tamaño fijo
        margin: "0 auto", // Centrar el menú si es necesario
      };
    } else if (screenWidth < 1120) {
      return {
        background: "black",
        border: "8px double red",
        borderRadius: "10px",
      };
    }
    return {};
  };

  return (
    <div style={{ overflow: "hidden" }}> {/* Contenedor envolvente */}
      <nav
        style={{
          backgroundImage: "url('/imagenes/header3.png')",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          minHeight: "106px",
          width: "100%",
        }}
        className="text-white p-4"
      >
        <div className="flex justify-between items-center">
          {/* Botón para el menú en pantallas pequeñas */}
          <button
            className="lg:hidden text-white pt-6 text-2xl"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Lista de enlaces */}
        <ul
          style={{ fontFamily: "nombres", ...getMenuStyles() }}
          className={`lg:flex lg:space-x-4 lg:pt-5 lg:text-lg ${
            isMenuOpen ? "block" : "hidden"
          } text-lg`}
        >
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/pilotos">Pilotos</Link>
          </li>
          <li>
            <Link href="/equipos">Equipos</Link>
          </li>
          <li>
            <Link href="/clasificacion">Clasificación</Link>
          </li>
          <li>
            <Link href="/circuitos">Circuitos</Link>
          </li>
          <li>
            <Link href="/campeones">Campeones</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
