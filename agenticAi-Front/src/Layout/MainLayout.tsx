import AgentCard from "@/components/AgentCard";
import { AGENTES } from "@/features/agents/data/agents";
import OrchestratorPanel from "@/features/orchestrator/components/OrchestratorPanel";
import { useOrchestrator } from "@/features/orchestrator/hooks/useOrchestrator";

export const MainLayout = () => {
    const {
        respuesta,
        analisis,
        agenteAsignado,
        estado,
        logs,
        sinAgente,
        consultar,
    } = useOrchestrator();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1f1f38] to-[#24243e] text-white flex flex-col items-center py-16 px-6">
            <div className="w-full max-w-6xl space-y-16">

                <OrchestratorPanel onAsk={consultar} estado={estado}/>

                {analisis && (
                    <pre
                        className="bg-base-200 text-sm p-4 rounded shadow whitespace-pre-wrap border border-base-300 text-white">
            {analisis}
                        {sinAgente && (
                            <div className="alert alert-warning mt-4 shadow-lg">
                                <span>⚠️ Ningún agente fue capaz de manejar la tarea.</span>
                            </div>
                        )}
          </pre>
                )}

                {logs.length > 0 && (
                    <div
                        className="bg-base-200 text-sm p-4 rounded shadow border border-base-300 font-mono space-y-1 text-white">
                        {logs.map((linea, idx) => (
                            <p key={idx}>{linea}</p>
                        ))}
                    </div>

                )}

                {AGENTES.map((agente) => (
                    <AgentCard
                        key={agente.nombre}
                        nombre={agente.nombre}
                        imagen={agente.imagen}
                        respuesta={
                            agente.nombre === agenteAsignado
                                ? respuesta.split(/\n{2,}/).pop() ?? ""
                                : ""
                        }
                        agenteAsignado={agenteAsignado}
                    />
                ))}

                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"/>
                    </div>
                </div>
            </div>
        </div>
    );
};