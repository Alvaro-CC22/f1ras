export default function Cabecera({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className="text-4xl font-semibold bg-[#1F1C1F] text-white p-10">
                Pilotos
            </h1>
            <h1 className="text-4xl font-semibold bg-[#1F1C1F] text-white p-10">
                Clasificación
            </h1>
            <h1 className="text-4xl font-semibold bg-[#1F1C1F] text-white p-10">
                Circuitos
            </h1>
            <h1 className="text-4xl font-semibold bg-[#1F1C1F] text-white p-10">
                Equipos
            </h1>
            <h1 className="text-4xl font-semibold bg-[#1F1C1F] text-white p-10">
                Campeones
            </h1>
        </div>
    );
}