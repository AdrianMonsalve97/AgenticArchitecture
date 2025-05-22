'use client'
import { useEffect, useState } from 'react';

export default function TypingResponse({ fullText }: { fullText: string }) {
    const [lines, setLines] = useState<string[]>([]);
    useEffect(() => {
        const l = fullText.split('\n');
        let i = 0;
        const interval = setInterval(() => {
            setLines((prev) => [...prev, l[i]]);
            i++;
            if (i >= l.length) clearInterval(interval);
        }, 500);
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <pre className="text-green-400 bg-black p-4 rounded whitespace-pre-wrap font-mono mt-4">
      {lines.join('\n')}
    </pre>
    );
}