"use client"; 
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1120);
    };

    handleResize();  
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  
  const getMenuBackgroundStyle = () => {
    
    if (typeof window !== "undefined" && window.innerWidth <= 340) {
      return {
        background: "black",
        border: "8px double red",
        borderRadius: "10px",
        maxWidth: "320px", 
      };
    } else if (isSmallScreen) {
      return {
        background: "black",
        border: "8px double red",
        borderRadius: "10px",
        maxWidth: "320px",
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
          minWidth: "100vw",
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
          style={{ fontFamily: "nombres", ...getMenuBackgroundStyle() }}
          className={`lg:flex lg:space-x-4 lg:pt-5 lg:text-lg ${
            isMenuOpen ? "block" : "hidden"
          } text-lg ps-8`}
        >
          <li className="hover:text-red-600">
            <Link href="/">Inicio</Link>
          </li>
          <li className="hover:text-red-600">
            <Link href="/pilotos">Pilotos</Link>
          </li>
          <li className="hover:text-red-600">
            <Link href="/equipos">Equipos</Link>
          </li>
          <li className="hover:text-red-600">
            <Link href="/clasificacion">Clasificación</Link>
          </li>
          <li className="hover:text-red-600">
            <Link href="/circuitos">Circuitos</Link>
          </li>
          <li className="hover:text-red-600">
            <Link href="/campeones">Campeones</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
