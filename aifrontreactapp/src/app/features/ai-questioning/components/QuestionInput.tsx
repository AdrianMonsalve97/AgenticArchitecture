'use client';

import { useState } from 'react';

export default function QuestionInput({ onSubmit }: { onSubmit: (value: string) => void }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSubmit(input.trim());
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full gap-3">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-3 bg-[#1e293b] text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
                Preguntar
            </button>
        </form>
    );
}
