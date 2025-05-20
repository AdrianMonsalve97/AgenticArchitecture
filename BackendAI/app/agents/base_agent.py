class BaseAgent:
    def __init__(self, name: str):
        self.name = name

    def can_handle(self, tarea: str) -> bool:
        """
        Determina si el agente puede procesar esta tarea.
        """
        raise NotImplementedError("Este método debe ser implementado por la subclase.")

    def handle(self, tarea: str) -> str:
        """
        Ejecuta la tarea y devuelve la respuesta del agente.
        """
        raise NotImplementedError("Este método debe ser implementado por la subclase.")
