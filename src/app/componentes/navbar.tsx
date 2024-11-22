import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/">
                        Inicio
                    </Link>
                </li>
                    <li>
                        <Link href="/pilotos">
                            Pilotos
                        </Link>
                    </li>
                    <li>
                        <Link href="/equipos">
                            Equipos
                        </Link>
                    </li>
                    <li>
                    <Link href="/clasificacion">
                        Clasificación
                    </Link>
                </li>
                <li>
                    <Link href="/circuitos">
                        Circuitos
                    </Link>
                </li>
                <li>
                    <Link href="/campeones">
                        Campeones
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
