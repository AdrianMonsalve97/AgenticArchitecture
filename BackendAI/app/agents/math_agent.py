from app.agents.base_agent import BaseAgent
from app.config import OPENAI_API_KEY
from openai import OpenAI

# Crear cliente de OpenAI
client = OpenAI(api_key=OPENAI_API_KEY)

class MathAgent(BaseAgent):
    def __init__(self, name):
        super().__init__(name)

    def can_handle(self, tarea: str) -> bool:
        palabras_clave = ['deriva', 'integra', 'ecuación', 'resolver', '+', '-', '*', '/', '^']
        return any(p in tarea.lower() for p in palabras_clave)

    def handle(self, tarea: str) -> str:
        system_prompt = (
            "Eres un agente de inteligencia artificial especializado en matemáticas. "
            "Estás diseñado para resolver problemas, enseñar conceptos y asistir a usuarios en sus dudas, "
            "desde nivel básico hasta avanzado. "
            "Tu estilo debe ser claro, estructurado y adaptado al nivel del usuario. "
            "Debes explicar paso a paso cuando sea necesario y evitar símbolos o emojis. "
            "No asumas cosas sin confirmación del usuario. "
            "Comunícate de manera neutral y profesional."
        )

        prompt_usuario = f"Tarea recibida: {tarea}"

        try:
            respuesta = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt_usuario}
                ],
                temperature=0.2
            )

            resultado = respuesta.choices[0].message.content.strip()
            print("Respuesta de Sheldon:", resultado)

            return f"[Sheldon Cooper] {resultado}"

        except Exception as e:
            print("Error con OpenAI:", e)
            return f"[Sheldon Cooper] Error al procesar la tarea: {str(e)}"
