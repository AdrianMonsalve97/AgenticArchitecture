class Orchestrator:
    def __init__(self, agentes: list):
        self.agentes = agentes

    def delegar_tarea(self, tarea: str) -> str:
        log_proceso = f"🧠 [Orquestador] Analizando tarea: \"{tarea}\"\n"
        agente_asignado = None

        for agente in self.agentes:
            puede = agente.can_handle(tarea)
            log_proceso += f"🔍 ¿{agente.name} puede manejarla? {'✅ Sí' if puede else '❌ No'}\n"
            if puede:
                agente_asignado = agente
                break

        if agente_asignado:
            log_proceso += f"\n🤝 Tarea asignada a: {agente_asignado.name}\n"
            resultado = agente_asignado.handle(tarea)
            log_proceso += f"🧾 Resultado del agente:\n{resultado}\n"
            return log_proceso
        else:
            log_proceso += "\n⚠️ Ningún agente fue capaz de manejar la tarea.\n"
            return log_proceso
