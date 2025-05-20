class TaskDispatcher:
    def __init__(self, orquestador):
        self.orquestador = orquestador

    def procesar_tarea(self, tarea: str) -> str:
        # Aquí puedes meter validaciones, logs, preprocesamiento, etc.
        if not tarea or not tarea.strip():
            return "[DISPATCHER] Tarea vacía no permitida."

        print(f"📨 Dispatcher recibió tarea: {tarea}")
        return self.orquestador.delegar_tarea(tarea)
