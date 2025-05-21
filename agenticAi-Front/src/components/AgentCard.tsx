import React from "react";
import type {Agent} from "../types/Agent";

type AgentCardProps = Agent

const AgentCard: React.FC<AgentCardProps> = ({ nombre, imagen, respuesta }) => {
    return (
        <div className="bg-base-200 rounded-xl shadow-lg p-4 flex gap-4 items-start">
            <img
                src={imagen}
                alt={nombre}
                className="w-16 h-16 rounded-full object-cover border border-base-300"
            />
            <div className="flex flex-col">
                <h2 className="font-bold text-lg mb-1">{nombre}</h2>
                {respuesta ? (
                    <div className="bg-base-100 rounded p-3 border border-base-300">
                        <p className="whitespace-pre-wrap text-sm">{respuesta}</p>
                    </div>
                ) : (
                    <p className="text-sm text-base-content/50 italic">Esperando respuesta...</p>
                )}
            </div>
        </div>
    );
};

export default AgentCard;