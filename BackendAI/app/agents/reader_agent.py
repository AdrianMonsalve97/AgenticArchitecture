from app.agents.base_agent import BaseAgent
from app.config import OPENAI_API_KEY
from openai import OpenAI

client = OpenAI(api_key=OPENAI_API_KEY)

class ReaderAgent(BaseAgent):
    def __init__(self, name):
        super().__init__(name)

    def can_handle(self, tarea: str) -> bool:
        palabras_clave = ['analiza', 'lee', 'resume', 'identifica idea', 'tema principal']
        return any(p in tarea.lower() for p in palabras_clave) or len(tarea.split()) > 30

    def handle(self, tarea: str) -> str:
        system_prompt = (
            "Eres un lector crítico especializado en análisis textual. Tu misión es identificar y resumir la idea principal "
            "de cualquier texto en español, destacando el propósito del autor, su postura y los argumentos centrales.\n\n"
            "Sé claro, directo, y evita opiniones personales. Usa lenguaje neutro y estructurado. Si hay más de una idea fuerte, resúmelas en orden.\n\n"
            "Puedes usar frases como:\n"
            "- La idea principal es...\n"
            "- El texto busca...\n"
            "- El autor pretende...\n"
            "- Se argumenta que...\n"
        )

        prompt_usuario = f"Analiza el siguiente texto y responde con su idea principal:\n\n{tarea}"

        try:
            respuesta = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt_usuario}
                ],
                temperature=0.2
            )
            resultado = respuesta.choices[0].message.content
            print(" Respuesta Reader:", resultado)
            return "[ReaderAgent 📖] " + resultado

        except Exception as e:
            return f"[ReaderAgent 📖] Error: {str(e)}"
