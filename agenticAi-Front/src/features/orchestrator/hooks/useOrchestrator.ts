import { useState } from "react";
import { consultarOrquestador } from "@/services/orchestratorService";

export const useOrchestrator = () => {
    const [respuesta, setRespuesta] = useState("");
    const [analisis, setAnalisis] = useState("");
    const [agenteAsignado, setAgenteAsignado] = useState("");
    const [estado, setEstado] = useState<"idle" | "cargando">("idle");
    const [logs, setLogs] = useState<string[]>([]);
    const [sinAgente, setSinAgente] = useState(false);


    const consultar = async (tarea: string) => {
        try {
            setEstado("cargando");
            setRespuesta("");
            setAnalisis("");
            setAgenteAsignado("");
            setLogs([]);
            setSinAgente(false); // Reinicia estado

            const pasos = [
                `🧠 Analizando tarea: "${tarea}"`,
                "🔍 Evaluando Sheldon Cooper...",
                "🔍 Evaluando Dante Aligeri...",
                "🔍 Evaluando EthosAI...",
            ];

            for (let i = 0; i < pasos.length; i++) {
                await new Promise((res) => setTimeout(res, 800));
                setLogs((prev) => [...prev, pasos[i]]);
            }

            const { texto, agente } = await consultarOrquestador(tarea);
            setSinAgente(texto.includes("Ningún agente fue capaz de manejar")); // ✅ CORRECTO

            const [analisis, ...respuestaParts] = texto.split("\n\n");
            setAnalisis(analisis);
            setRespuesta(respuestaParts.join("\n\n"));
            setAgenteAsignado(agente);
        } catch (error) {
            console.error("Error al consultar el orquestador:", error);
        } finally {
            setEstado("idle");
        }
    };
    return {
        respuesta,
        analisis,
        agenteAsignado,
        estado,
        logs,
        sinAgente,
        consultar
    };
};
