import Navbar from "./componentes/navbar";
import ContadorRegresivo from './componentes/contador';
import UltimaCarrera from "./componentes/ultimaCarrera";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pb-5" style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 style={{ fontFamily: 'titulos' }} className="pt-5 text-lg">Bienvenido a F1 Records and Stats, la página de los datos.</h1>
        <ContadorRegresivo />
      </div>
      <UltimaCarrera />
    </>
  );
}
