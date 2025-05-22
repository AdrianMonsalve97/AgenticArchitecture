'use server';

export async function resolveTarea(tarea: string): Promise<string> {
    try {
        const res = await fetch('http://localhost:5050/resolver', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tarea }),
        });

        const data = await res.json();

        if (!data.resultado) {
            throw new Error('Respuesta sin "resultado"');
        }

        return data.resultado;
    } catch (err) {
        console.error('❌ Error al resolver tarea:', err);
        return 'Error al comunicarse con el orquestador.';
    }
}
