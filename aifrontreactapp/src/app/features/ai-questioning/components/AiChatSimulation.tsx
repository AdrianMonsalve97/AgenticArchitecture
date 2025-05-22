'use client';

import { useState } from 'react';
import QuestionInput from './QuestionInput';
import ResponseList from './ResponseList';
import { resolveTarea } from './actions';

type Agente = {
    name: string;
    avatar: string;
    response: string;
};

export default function AiChatSimulation() {
    const [responses, setResponses] = useState<Agente[]>([]);
    const [generalLog, setGeneralLog] = useState<string>(''); // 🧠 líneas generales
    const [loading, setLoading] = useState(false);            // ✅ usado correctamente
    const [streaming, setStreaming] = useState(false);
    const [status, setStatus] = useState<string | null>(null); // Mensaje dinámico

    async function handleQuestion(tarea: string) {
        setResponses([]);
        setGeneralLog('');
        setLoading(true);              // ✅ ahora sí se usa
        setStatus('Pensando...');

        const raw = await resolveTarea(tarea);

        setLoading(false);             // ✅
        setStatus('Iniciando análisis...');

        await new Promise((res) => setTimeout(res, 2000));
        setStreaming(true);

        const lines = raw.split('\n').filter(line => line.trim() !== '');
        const parsed: Agente[] = [
            { name: 'Sheldon Cooper', avatar: '/avatars/sheldon.webp', response: '' },
            { name: 'Dante Alighieri', avatar: '/avatars/dante.webp', response: '' },
            { name: 'EthosAI', avatar: '/avatars/platon.webp', response: '' },
        ];

        let general = '';

        let i = 0;
        const interval = setInterval(() => {
            if (i >= lines.length) {
                clearInterval(interval);
                setStreaming(false);
                setStatus(null);
                return;
            }

            const line = lines[i];

            let matched = false;
            parsed.forEach((agente) => {
                const nombre = agente.name.toLowerCase();
                if (line.toLowerCase().includes(nombre.split(' ')[0])) {
                    agente.response += line + '\n';
                    matched = true;
                }
            });

            if (!matched) {
                general += line + '\n';
                setGeneralLog(general);
            }

            setResponses([...parsed]);
            i++;
        }, 1200);
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-8 text-center">AI Q&amp;A Simulation</h1>

                <QuestionInput onSubmit={handleQuestion} />

                {/* ✅ Mensaje visible si loading está activo */}
                {loading && (
                    <p className="text-yellow-400 mt-4 font-mono text-center">
                        Cargando solicitud al orquestador...
                    </p>
                )}

                {/* ✅ También se puede usar status */}
                {status && !loading && (
                    <p className="text-blue-400 mt-4 font-mono text-center">
                        {status}
                    </p>
                )}

                {generalLog && (
                    <div className="bg-zinc-800 rounded p-4 my-4 text-sm text-gray-300 font-mono whitespace-pre-wrap">
                        {generalLog}
                    </div>
                )}

                <div className="mt-8 space-y-4">
                    <ResponseList responses={responses} />
                </div>

                {streaming && (
                    <p className="text-sm text-gray-500 mt-2 text-center font-mono">
                        Analizando línea por línea...
                    </p>
                )}
            </div>
        </div>
    );
}
