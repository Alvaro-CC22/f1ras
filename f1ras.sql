-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2025 a las 20:52:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `f1ras`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20250219171344', '2025-02-19 18:13:56', 72),
('DoctrineMigrations\\Version20250219172855', '2025-02-19 18:29:11', 68),
('DoctrineMigrations\\Version20250224142628', '2025-02-24 15:26:41', 70);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piloto`
--

CREATE TABLE `piloto` (
  `id` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `biografia` longtext DEFAULT NULL,
  `temporadas` varchar(255) NOT NULL,
  `poles` varchar(255) DEFAULT NULL,
  `fast_laps` varchar(255) DEFAULT NULL,
  `podios` varchar(255) DEFAULT NULL,
  `equipo_actual` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `piloto`
--

INSERT INTO `piloto` (`id`, `imagen`, `biografia`, `temporadas`, `poles`, `fast_laps`, `podios`, `equipo_actual`) VALUES
('albon', '67bcc9a16e482.jpg', 'Alexander Albon Ansusinha (Londres, Inglaterra, 23 de marzo de 1996), más conocido como Alex Albon, es un piloto de automovilismo tailandés nacido en el Reino Unido. Fue campeón de la Copa Mundial de Karting en 2010, subcampeón de la GP3 Series en 2016 y tercero en el Campeonato de Fórmula 2 de la FIA en 2018. Debutó en Fórmula 1 en 2019 con Toro Rosso y en mitad de temporada pasó a Red Bull, donde compitió a tiempo completo en 2020. En 2022 volvió a la máxima categoría con Williams.', '6', '0', '0', '2', '67bcc97488df8.jpg'),
('alonso', '67bb05bd24c6d.png', 'Fernando Alonso Díaz (Oviedo, 29 de julio de 1981) es un piloto de automovilismo español, galardonado como Premio Príncipe de Asturias en 2005. Ha ganado dos veces el Campeonato Mundial de Fórmula 1 en 2005 y 2006 con el equipo Renault,3​ resultó subcampeón en 2010, 2012 y 2013 con la escudería Ferrari, y obtuvo un tercer puesto en 2007 con McLaren. Fue campeón del Campeonato Mundial de Resistencia de la FIA en 2019, las 24 Horas de Le Mans en 2018 y 2019, las 24 Horas de Daytona de 2019 y el Campeonato Mundial de Karting en 1996. En 2017, fue incluido en el Salón de la Fama de la FIA.4​5​6​7​ En 2019 volvió a entrar como campeón del WEC, convirtiéndose en el primer piloto de la historia en estar dos veces en el Salón de la Fama por pertenecer a la lista de campeones de dos categorías mundiales de la FIA diferentes.', '20', '22', '26', '106', '67bc8c39ace05.jpg'),
('bearman', '67bc9789a5a69.jpg', 'Oliver James Bearman (Havering, Londres, 8 de mayo de 2005), también conocido como Ollie Bearman, es un piloto de automovilismo británico.1​ En 2021 ganó los campeonatos de Italia y Alemania de Fórmula 4, y fue tercero en el Campeonato de Fórmula 3 de la FIA de 2022 como debutante.2​ Desde 2022 hasta 2024 fue miembro de la Academia de pilotos de Ferrari y piloto de desarrollo de la escudería Ferrari en Fórmula 1. En 2025 será piloto titular del equipo Haas, tras ser piloto reserva en 2024.3​\r\n\r\nEn 2023 y 2024 compitió en el Campeonato de Fórmula 2 de la FIA con el equipo PREMA Racing, logrando siete victorias. En 2024 debutó en el Gran Premio de Arabia Saudita de Fórmula 1 con Ferrari en reemplazo de Carlos Sainz Jr..4​ También participó en el Gran Premio de Azerbaiyán y São Paulo en sustitución de Kevin Magnussen en el equipo Haas.', '2', '0', '0', '0', '67bc9789a617e.png'),
('bottas', '67bcc886e198e.png', 'Valtteri Viktor Bottas (pronunciación en finés: ˈʋɑltːeɾi ˈbotːɑs, Nastola, Finlandia; 28 de agosto de 1989), más conocido como Valtteri Bottas, es un piloto de automovilismo finlandés.1​ Debutó en Fórmula 1 en 2013 con el equipo Williams, donde se mantuvo hasta 2016. Entre 2017 y 2021 compitió para Mercedes, donde obtuvo sus mejores resultados en el campeonato, que son dos subcampeonatos en 2019 y 2020, y tercero en 2017 y 2021, también resultó cuarto con Williams en 2014. En 2022 y 2023 fue piloto de Alfa Romeo, y tras una reestructuración del equipo fue piloto de Kick Sauber en 2024. En 2025 volverá al equipo Mercedes como piloto reserva.', '12', '20', '19', '67', '67bcc886e274a.png'),
('colapinto', '67bcca4c8cef3.png', 'Franco Alejandro Colapinto (Pilar, 27 de mayo de 2003) es un piloto de automovilismo argentino.2​ Fue campeón del Campeonato de España de F4 en 2019, tercero en los campeonatos de Toyota Racing Series y Eurocopa de Fórmula Renault (ambos en 2020), Asian Le Mans Series (2021), cuarto en el Campeonato de Fórmula 3 de la FIA (2023), y compitió en el Campeonato de Fórmula 2 de la FIA con el equipo MP Motorsport durante diez rondas en 2024.\r\n\r\nFue miembro de la Academia de pilotos de Williams desde 2023 hasta 2025.3​ El 1 de noviembre de 2023, Williams Racing anunció su participación en los entrenamientos postemporada 2023 de Fórmula 1 al volante del FW45. En 2024 se subió al FW46 en los entrenamientos libres del Gran Premio de Gran Bretaña.4​ Pasó a ser piloto titular de Williams a partir del Gran Premio de Italia en reemplazo del estadounidense Logan Sargeant hasta el final de la temporada.5​\r\n\r\nEl 9 de enero de 2025, tras dejar la estructura de Williams, fue anunciado como piloto de reserva para la escudería Alpine.', '1', '0', '0', '0', '67bcca4c8d906.png'),
('doohan', '67bc91df1f6a6.jpg', 'Jack Doohan (Gold Coast, Queensland, Australia; 20 de enero de 2003) es un piloto de automovilismo australiano. Desde 2018 hasta 2021 fue miembro del Equipo Júnior de Red Bull, y perteneció a la Academia Alpine desde 2022 a 2024.1​ Desde 2024, es piloto titular de Alpine en Fórmula 1, debutando en el Gran Premio de Abu Dabi, tras dos años siendo piloto reserva de la escudería francesa.2​ Ha sido subcampeón del Campeonato de Fórmula 3 de la FIA en 2021, tercero del Campeonato de Fórmula 2 de la FIA en 2023, y dos veces subcampeón del Campeonato Asiático de F3 en 2019 y 2019-20.', '1', '0', '0', '0', '67bc933b64d89.png'),
('gasly', '67bc92eae434b.png', 'Pierre Gasly (Ruan, Francia; 7 de febrero de 1996) es un piloto de automovilismo francés. Fue campeón de la Eurocopa Fórmula Renault 2.0 en 2013 y de GP2 Series en 2016. En 2017 resultó subcampeón de la Super Fórmula Japonesa y debutó en la temporada de Fórmula 1 con Toro Rosso.1​2​ En 2019, disputó las 12 primeras carreras con Red Bull Racing, pero la escudería austríaca decidió prescindir de él a mitad de temporada. Desde 2020 hasta 2022, fue piloto de AlphaTauri, obteniendo su primera y única victoria en el Gran Premio de Italia de 2020. Desde 2023 forma parte de la escudería francesa Alpine F1 Team.', '9', '0', '3', '5', '67bc934bcf762.png'),
('hamilton', '67bb12e478e33.jpg', 'Lewis Carl Davidson Hamilton2​3​ (Stevenage, Inglaterra; 7 de enero de 1985) es un piloto británico de automovilismo. En Fórmula 1 desde 2007 hasta 2012, fue piloto de la escudería McLaren, con la cual fue campeón en 2008 y subcampeón en 2007. A partir de 2013, se convirtió en piloto de Mercedes hasta la temporada 2024, resultando campeón en 2014, 2015, 2017, 2018, 2019, 2020, igualando los 7 títulos mundiales de Michael Schumacher, subcampeón en 2016 y 2021, y tercero en 2023. Ha logrado alzarse con 105 victorias en Grandes Premios a lo largo de su carrera en la Fórmula 1, superando en 2020 el récord de victorias en la historia de la competición. En 2025 es piloto de la escudería Ferrari.', '18', '104', '67', '202', '67bc8d0b6a5f5.png'),
('hulkenberg', '67bc9b0d7b775.jpg', 'Nicolas Hülkenberg (pronunciación en alemán: /ˈniːko ˈhʏlkənbɛɐ̯k/, Emmerich am Rhein, Alemania Occidental; 19 de agosto de 1987), o simplemente Nico Hülkenberg, es un piloto alemán de automovilismo. Ha competido en más de 10 temporadas de Fórmula 1 para los equipos Williams, Force India, Renault y Haas, entre otros.1​ Es el primer piloto confirmado por Audi para su ingreso a la Fórmula 1, en 2026, donde previamente será piloto de Kick Sauber en 2025.2​\r\n\r\nHa sido campeón de Fórmula BMW en 2005 en su debut en monoplazas, A1 Grand Prix en 2007, Fórmula 3 Euroseries en 2008, y de la GP2 Series en 2009 como debutante. Fue vencedor de las 24 Horas de Le Mans 2015 en su primera y única participación en la categoría absoluta con Porsche.3', '14', '1', '2', '0', '67bc9b0d7bf82.png'),
('kevin_magnussen', '67bc9bcc24a91.png', 'Kevin Magnussen (Roskilde, Dinamarca, 5 de octubre de 1992) es un piloto danés de automovilismo. Fue miembro del Programa de Jóvenes Pilotos de McLaren, resultando tercero del Campeonato de Alemania de Fórmula 3 en 2010, subcampeón de Fórmula 3 Británica en 2011, y campeón de la Fórmula Renault 3.5 Series en 2013.1​ Debutó en la Fórmula 1 en 2014 con McLaren, logrando un segundo puesto en el Gran Premio de Australia de 2014 en su primera carrera.2​\r\n\r\nCompitió con la escudería Renault en 2016 e ingresó a Haas F1 Team de 2017 hasta 2020. Después de dejar temporalmente la Fórmula 1 compitió en carreras de resistencia como las 24 Horas de Le Mans. En febrero de 2022 volvió a Haas con un contrato multianual hasta 2024.3​ En 2025 será piloto de BMW M Motorsport en la categoría Le Mans Hypercar del Campeonato Mundial de Resistencia de la FIA.', '10', '1', '3', '1', NULL),
('lawson', '67bca001af132.png', 'Liam Lawson (Hastings, Nueva Zelanda; 11 de febrero de 2002) es un piloto de automovilismo neozelandés. Desde 2019 hasta 2024 formó parte del Equipo Júnior de Red Bull.1​ Fue campeón de la Toyota Racing Series en 2019, tercero del Campeonato de Fórmula 2 de la FIA en 2022 y subcampeón en distintas categorías como la Super Fórmula Japonesa y el Deutsche Tourenwagen Masters. En 2023 hizo su debut en Fórmula 1 con la escudería AlphaTauri en el Gran Premio de los Países Bajos, sustituyendo a Daniel Ricciardo durante cinco Grandes Premios.2​ En 2024 fue piloto oficial del equipo RB a tiempo parcial y en 2025 dio el salto a Red Bull junto a Max Verstappen.', '3', '0', '0', '0', '67bca001afa4b.jpg'),
('leclerc', '67bc981448083.jpg', 'Charles Marc Hervé Perceval Leclerc (pronunciación en francés: /ʃaʁl ləklɛʁ/, Montecarlo, Mónaco; 16 de octubre de 1997), más conocido como Charles Leclerc, es un piloto de automovilismo monegasco.4​ Fue campeón de la Copa Mundial de Karting en 2011, y de GP3 Series en 2016 y del Campeonato de Fórmula 2 de la FIA en 2017, ambas como debutante. Debutó al año siguiente en Fórmula 1 con el equipo Sauber en 2018.5​ Desde 2019 es piloto de la escudería Ferrari, resultando subcampeón en 2022, y tercero en 2024.\r\n\r\nFue miembro de la Academia de pilotos de Ferrari desde 2014 hasta 2018.6​ Además, es el hermano mayor del también piloto de automovilismo Arthur Leclerc, que fue miembro de la academia desde 2020 hasta 2023 y actualmente es piloto de desarrollo de la escudería Ferrari. En los entrenamientos libres del Gran Premio de Abu Dabi de 2024 su hermano hizo su debut en la Fórmula 1, siendo la primera vez en la historia de la categoría que dos hermanos comparten equipo en una sesión oficial.7', '8', '26', '10', '43', '67bc981448835.png'),
('max_verstappen', '67bcc7b987753.png', 'Max Emilian Verstappen (Hasselt, 30 de septiembre de 1997) es un piloto de automovilismo neerlandés nacido en Bélgica.4​ Ganó el Campeonato Mundial de Karting en 2013 y fue tercero del Campeonato Europeo de Fórmula 3 de la FIA en su debut en monoplazas. Desde 2015 compite en Fórmula 1, debutando en la escudería Toro Rosso. A partir de 2016 lo hace en el equipo Red Bull Racing, obteniendo dos terceros puestos en 2019 y 2020, y resultando tetracampeón del Campeonato Mundial de Fórmula 1 con los títulos obtenidos en 2021, 2022, 2023 y 2024.', '11', '40', '33', '112', '67bcc7b987f49.jpg'),
('norris', '67bc9cc3ecbed.png', 'Lando Norris (Bristol, Reino Unido; 13 de noviembre de 1999) es un piloto de automovilismo británico que también posee la nacionalidad belga.1​ Ha sido campeón del Campeonato Mundial de Karting en 2014, de los campeonatos de Eurocopa Fórmula Renault, Fórmula Renault NEC y Toyota Racing Series en 2016, del Campeonato Europeo de Fórmula 3 de la FIA en 2017, y subcampeón del Campeonato de Fórmula 2 de la FIA en 2018, este último como miembro del Programa de Jóvenes Pilotos de McLaren.2​3​ Desde 2019 es piloto de la escudería McLaren de Fórmula 1, con la cual logró su primer podio en el Gran Premio de Austria de 2020 y su primera victoria en el Gran Premio de Miami de 2024, y resultó subcampeón en 2024.4', '7', '9', '12', '26', '67bc9cc3ed456.jpg'),
('ocon', '67bc94f0f2486.png', 'Esteban José Jean-Pierre Ocon-Khelfane (Évreux, Francia; 17 de septiembre de 1996), más conocido como Esteban Ocon, es un piloto francés de automovilismo.1​ Fue tercero de la Eurocopa de Fórmula Renault 2.0 en 2013, y campeón del Campeonato Europeo de Fórmula 3 de la FIA en 2014 y de GP3 Series en 2015. Debutó en Fórmula 1 en 2016 con Manor y más tarde compitió para Force India y Racing Point. Luego de un año de desarrollo con Mercedes, volvió a este campeonato de la mano de Renault.2​\r\n\r\nDesde de la temporada 2021 formó equipo con Fernando Alonso en la escudería Alpine, obteniendo la primera y única victoria de su carrera en el Gran Premio de Hungría de 2021. En 2023 y 2024 compartió equipo con su compatriota Pierre Gasly.3​ En 2025 pasará a formar parte del equipo Haas con un contrato multi-anual.', '9', '0', '1', '4', '67bc9514ef88a.png'),
('perez', '67bcc658122ea.png', 'Sergio Michel Pérez Mendoza (Guadalajara, Jalisco, México; 26 de enero de 1990), también conocido como Checo Pérez, es un piloto de automovilismo mexicano. Actualmente es miembro de la Escudería Telmex.1​ Entre 2021 y 2024 fue piloto de Red Bull en Fórmula 1, donde obtuvo sus mejores resultados en el campeonato, con un subcampeonato en 2023, un tercer puesto en 2022 y dos cuartos lugares en 2020 (con Racing Point) y 2021.2​ Comenzó su carrera en 2004; en la Fórmula 3 Británica fue campeón de clase nacional en 2007. En 2009 debutó en GP2 Series y al año siguiente fue subcampeón.', '14', '3', '12', '39', NULL),
('piastri', '67bc9d42b6bb8.jpg', 'Oscar Jack Piastri (Melbourne, Victoria, 6 de abril de 2001) es un piloto de automovilismo australiano. Entre los años 2019 y 2021 logró tres títulos seguidos: Eurocopa de Fórmula Renault, Fórmula 3 y Fórmula 2 (estos dos últimos como debutante). Mientras que en 2017 fue subcampeón de la F4 Británica.1​ En 2021 fue miembro de la Academia Alpine y piloto reserva de Alpine en 2022.2​ Desde 2023 es piloto de McLaren en Fórmula 1, con la cual logró su primer podio en su año debut en el Gran Premio de Japón y su primera victoria en el Gran Premio de Hungría de 2024.', '3', '0', '3', '10', '67bc9d42b7436.jpg'),
('ricciardo', '67bcc4d90040d.jpg', 'Daniel Joseph Ricciardo (Perth, Australia, 1 de julio de 1989) es un piloto de automovilismo australiano de ascendencia italiana.2​ Fue campeón de Fórmula 3 Británica en 2009 como debutante y subcampeón de la Fórmula Renault 3.5 Series en 2010. Debutó en Fórmula 1 con Hispania Racing en 2011. En 2012 y 2013 fue piloto de Toro Rosso y dio el salto a Red Bull en 2014 hasta 2018. De 2019 a 2020 compitió con Renault hasta 2021, cuando firmó con McLaren hasta 2022. En 2023 y 2024 compitió para AlphaTauri/RB, pero sin hacer temporadas completas.', '14', '3', '17', '32', NULL),
('russell', '67bc9e005e2c6.jpg', 'George William Russell (King\'s Lynn, Norfolk, Inglaterra, Reino Unido; 15 de febrero de 1998), más conocido como George Russell, es un piloto de automovilismo británico.1​ Fue campeón de GP3 Series en 2017 y del Campeonato de Fórmula 2 de la FIA en 2018 (ambos como debutante). Desde 2019 hasta 2021 compitió para Williams en Fórmula 1.2​ Desde 2022 es piloto de la escudería Mercedes-AMG Petronas.', '7', '5', '8', '15', '67bc9e005ea77.png'),
('sainz', '67bc9a437ee1a.jpg', 'Carlos Sainz Vázquez de Castron. 1​ (Madrid, España; 1 de septiembre de 1994), más conocido como Carlos Sainz Jr. o simplemente Carlos Sainz, es un piloto de automovilismo español. De 2010 a 2014 formó parte del Equipo Júnior de Red Bull, ganando la Fórmula Renault NEC en 2011 y Fórmula Renault 3.5 Series en 2014. Debutó en Fórmula 1 con Toro Rosso al año siguiente, donde se mantuvo hasta 2017, temporada en la que firmó con el equipo Renault. En 2019 y 2020 compitió con McLaren. Desde 2021 hasta 2024 fue piloto de la escudería Ferrari, donde obtuvo sus mejores resultados en el campeonato. En 2025 formará parte del equipo Williams.', '11', '6', '4', '27', '67bc9a437f83d.jpg'),
('sargeant', '67bccac45c0b7.png', 'Logan Hunter Sargeant (Fort Lauderdale, Florida, Estados Unidos; 31 de diciembre de 2000) es un piloto de automovilismo estadounidense. Ha sido campeón del Campeonato Mundial de Karting en 2015, tercero en el Campeonato de Fórmula 3 de la FIA en 2020, y cuarto en el Campeonato de Fórmula 2 de la FIA en 2022. Fue miembro de la Academia de pilotos de Williams,1​ y tercer piloto de Williams Racing en Fórmula 1 en 2022. En 2023 y 2024 fue piloto titular de la escudería junto a Alex Albon.', '2', '0', '0', '0', NULL),
('stroll', '67bc96d6b3e92.png', 'Lance Stroll (Montreal, Canadá; 29 de octubre de 1998), nacido como Lance Strulovitch, es un piloto de automovilismo canadiense.1​ Ganó los campeonatos de Fórmula 4 Italiana en 2015 y Fórmula 3 Europea en 2016. Disputó las temporadas 2017 y 2018 con Williams en Fórmula 1, en 2019 y 2020 fue piloto de Racing Point. Actualmente es piloto de la escudería Aston Martin F1 Team.', '9', '1', '0', '3', '67bc96d6b47a3.jpg'),
('tsunoda', '67bcc58639599.jpg', 'Yuki Tsunoda (角田 裕毅 Tsunoda Yūki?, Sagamihara, Kanagawa, Japón; 11 de mayo de 2000) es un piloto de automovilismo japonés. En 2018 ganó el Campeonato de Japón de Fórmula 4 y fue tercero del Campeonato de Fórmula 2 de la FIA en 2020 como miembro del Equipo Júnior de Red Bull. Desde 2021 compitió en la Fórmula 1 con la escudería AlphaTauri hasta 2023, tras una reestructuración del equipo en 2024 corre con el equipo RB.', '5', '0', '1', '0', '67bcc58639d6a.jpg'),
('zhou', '67bcc8f925be4.jpg', 'Guanyu Zhou (en chino simplificado, 周冠宇; pinyin, Zhōu Guànyǔ; Shanghái, China; 30 de mayo de 1999) es un piloto de automovilismo chino.1​ Fue campeón del Campeonato Asiático de F3 y tercero en el Campeonato de Fórmula 2 de la FIA (ambos en 2021). En 2022 y 2023 fue piloto del equipo Alfa Romeo en Fórmula 1, tras ser piloto reserva de la escudería Alpine en 2021, siendo el primer piloto de la República Popular China en la historia de la categoría. En 2024 fue piloto del equipo Kick Sauber. El 5 de febrero de 2025 se anunció que sería piloto reserva de Scuderia Ferrari.', '3', '0', '2', '0', '67bcc8f926228.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `piloto`
--
ALTER TABLE `piloto`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
