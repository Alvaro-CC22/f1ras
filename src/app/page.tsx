import Navbar from "./componentes/navbar";
import ContadorRegresivo from './componentes/contador';

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Bienvenido a F1 Records and Stats, la página de los datos.</h1>
        <ContadorRegresivo />
      </div>
    </>
  );
}
