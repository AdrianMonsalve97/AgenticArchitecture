import axios from "axios";

export const consultarOrquestador = async (tarea: string): Promise<{ texto: string; agente: string }> => {
    const res = await axios.post("http://localhost:5050/resolver", { tarea });
    const texto = res.data.resultado;
    const match = texto.match(/asignada a: (.+)\n/);
    const agente = match ? match[1].trim() : "";
    return { texto, agente };
};
