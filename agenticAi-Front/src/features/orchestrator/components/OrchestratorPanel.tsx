import { useState } from "react";

interface Props {
    onAsk: (tarea: string) => void;
    estado: "idle" | "cargando";
}

export default function OrchestratorPanel({ onAsk, estado }: Props) {
    const [tarea, setTarea] = useState("");

    const handleEnviar = () => {
        if (tarea.trim()) {
            onAsk(tarea);
            setTarea("");
        }
    };

    return (
        <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-white">
                Semantic Logic 🤖
            </h2>

            <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
                <input
                    type="text"
                    className="input input-bordered input-lg w-full text-black"
                    placeholder="¿Qué quieres preguntar?"
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)}
                />
                <button
                    className="btn btn-primary btn-lg px-8 text-white"
                    onClick={handleEnviar}
                    disabled={estado === "cargando"}
                >
                    {estado === "cargando" ? "Pensando..." : "Preguntar"}
                </button>
            </div>
        </div>
    );
}
