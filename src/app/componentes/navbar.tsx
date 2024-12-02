import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div style={{ overflow: "hidden" }}> {/* Contenedor envolvente */}
      <nav
        style={{
          backgroundImage: "url('/imagenes/header2.png')",
          backgroundSize: "auto",
          minHeight: "106px",
          width: "100%",
        }}
        className="text-white p-4"
      >
        <ul style={{ fontFamily: 'nombres' }} className="flex space-x-4 pt-5 text-lg">
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
