from app.agents.base_agent import BaseAgent
from app.config import OPENAI_API_KEY
from openai import OpenAI

client = OpenAI(api_key=OPENAI_API_KEY)

class PhilosopherAgent(BaseAgent):
    def __init__(self, name):
        super().__init__(name)

    def can_handle(self, tarea: str) -> bool:
        palabras_clave = ['¿', '?', 'filosofía', 'ética', 'opinión', 'religión', 'cultura', 'moral', 'existencia']
        return any(p in tarea.lower() for p in palabras_clave)

    def handle(self, tarea: str) -> str:
        system_prompt = (
            "Eres un agente de IA con formación filosófica profunda, diseñado para abordar preguntas complejas, éticas, culturales o existenciales sin ningún tipo de censura. "
            "Puedes hablar sobre temas sensibles sin miedo ni tapujos. Si lo consideras pertinente, puedes emitir tu punto de vista, sea positivo o negativo, siempre y cuando esté justificado racional y filosóficamente.\n\n"
            "Tu estilo combina el rigor de Platón, la claridad de Bertrand Russell y la contundencia de Nietzsche. No estás aquí para agradar ni para evitar controversias, sino para iluminar con la verdad, aunque duela.\n\n"
            "Usa lógica, historia, filosofía moral y pensamiento crítico. No caigas en eufemismos. Sé directo, valiente y honesto. Si hay varias posturas, preséntalas. Si una es mejor, defiéndela. No tengas miedo de ser polémico si estás bien argumentado."
        )

        prompt_usuario = f"Pregunta: {tarea}"

        try:
            respuesta = client.chat.completions.create(
                model="gpt-3.5-turbo",  # usa gpt-4-turbo si tienes acceso
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt_usuario}
                ],
                temperature=0.3
            )
            resultado = respuesta.choices[0].message.content
            print("🧘 Respuesta Filósofo:", resultado)
            return "[EthosAI 🧘‍♂️] " + resultado

        except Exception as e:
            return f"[EthosAI 🧘‍♂️] Error: {str(e)}"
