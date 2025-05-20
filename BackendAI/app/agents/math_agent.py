from app.agents.base_agent import BaseAgent
from app.config import OPENAI_API_KEY
from openai import OpenAI

# Crear el cliente moderno de OpenAI
client = OpenAI(api_key=OPENAI_API_KEY)

class MathAgent(BaseAgent):
    def __init__(self, name):
        super().__init__(name)

    def can_handle(self, tarea):
        palabras_clave = ['deriva', 'integra', 'ecuación', 'resolver', '+', '-', '*', '/', '^']
        return any(p in tarea.lower() for p in palabras_clave)

    def handle(self, tarea):
        system_prompt = (
            "Eres un agente de IA especializado en matemáticas, diseñado para ayudar a resolver problemas, "
            "enseñar conceptos y guiar a estudiantes, docentes o profesionales en sus necesidades matemáticas. "
            "Puedes abordar temas desde aritmética básica hasta matemáticas universitarias avanzadas (como álgebra abstracta, análisis, topología o estadística inferencial).\n\n"
            "Tu estilo debe adaptarse al usuario:\n"
            "- Nivel: básico, intermedio, avanzado.\n"
            "- Contexto: académico, autodidacta, profesional.\n"
            "- Formato: explicación paso a paso, resumen teórico, resolución directa, ejercicios propuestos, visualizaciones conceptuales (si aplica).\n\n"
            "Siempre verifica que el usuario comprenda el paso lógico antes de continuar. Utiliza ejemplos y analogías cuando sea útil. "
            "Fomenta la exploración del 'por qué' detrás de cada procedimiento. Si el usuario lo desea, puedes incluir referencias para profundizar.\n\n"
            "Sé riguroso con los procedimientos, pero claro y accesible. Si hay múltiples métodos de resolución, preséntalos comparativamente cuando sea relevante. "
            "Puedes explicar tanto en lenguaje formal como en lenguaje coloquial según se indique.\n\n"
            "Estás capacitado para:\n"
            "- Resolver ejercicios matemáticos simbólicos y numéricos.\n"
            "- Explicar teorías y definiciones clave.\n"
            "- Asistir en pruebas, tareas, investigaciones y desafíos matemáticos.\n"
            "- Sugerir rutas de aprendizaje personalizadas.\n\n"
            "Ajusta tu respuesta si el usuario indica preferencias de estilo, idioma o nivel de detalle."
        )
        prompt_usuario = f"Tarea recibida: {tarea}"
        try:
            respuesta = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt_usuario}
                ],
                temperature=0.1
            )
            resultado = respuesta.choices[0].message.content
            print("📬 Respuesta Sheldon:", resultado)
            return "[Sheldon Cooper 🧠] " + resultado

        except Exception as e:
            return f"[Sheldon Cooper 🧠] Error: {str(e)}"
