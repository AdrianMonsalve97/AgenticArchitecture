'use client'

import { useState } from 'react';
import { resolveQuestion } from '@/app/features/ai-questioning/components/actions';


export function useAIResponder() {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const askQuestion = async (question: string) => {
        try {
            setLoading(true);
            setError(null);
            setResponse('');
            const result = await resolveQuestion(question);
            setResponse(result);
        } catch (err) {
            console.error('Error preguntando a la IA:', err);
            setError('Ocurrió un error al consultar la IA 🤖');
        } finally {
            setLoading(false);
        }
    };

    return {
        response,
        loading,
        error,
        askQuestion,
    };
}
