interface AgentCardProps {
    nombre: string;
    imagen: string;
    respuesta: string;
    agenteAsignado: string;
}

const AgentCard = ({ nombre, imagen, respuesta, agenteAsignado }: AgentCardProps) => {
    return (
        <div className="relative flex items-start gap-4 bg-[#202030]/80 border border-[#2e2e40] rounded-xl shadow-lg p-6 w-full max-w-3xl">
            {nombre === agenteAsignado && (
                <div className="agent-active-indicator" />
            )}
            <img
                src={imagen}
                alt={nombre}
                className="avatar-circle"
            />
            <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white">{nombre}</h3>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed text-white">
                    {respuesta || "Esperando una tarea..."}
                </p>
            </div>
        </div>
    );
};


export default AgentCard;
