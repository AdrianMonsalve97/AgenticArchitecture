from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

from app.agents.math_agent import MathAgent
from app.agents.philosopher_agent import PhilosopherAgent
from app.agents.reader_agent import ReaderAgent
from app.orchestrator.orchestrator import Orchestrator
from app.services.task_dispatcher import TaskDispatcher
from flask import request, jsonify

# Configuración de Flask y CORS
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Instanciamos nuestros agentes
agentes = [
    MathAgent("Sheldon Cooper"),
    ReaderAgent("Dante Aligeri"),
    PhilosopherAgent("EthosAI")
]

# Inyectamos dependencias a través del dispatcher
orquestador = Orchestrator(agentes)
dispatcher = TaskDispatcher(orquestador)

# Ruta base
@app.route('/')
def index():
    return "🤖 Backend agéntico en línea."

# Evento WebSocket
@socketio.on('tarea')
def manejar_tarea(data):
    tarea = data.get('tarea', '').strip()
    print(f"🧠 Tarea recibida: {tarea}")
    respuesta = dispatcher.procesar_tarea(tarea)
    socketio.emit('respuesta', {'resultado': respuesta})
@app.route('/resolver', methods=['POST'])
def resolver():
    data = request.get_json()
    tarea = data.get('tarea', '').strip()

    print(f"📩 [REST] Tarea recibida: {tarea}")
    resultado = dispatcher.procesar_tarea(tarea)

    return jsonify({'resultado': resultado})

# Correr servidor
if __name__ == '__main__':
    print("🔥 Iniciando servidor agéntico en http://localhost:5050 ...")
    try:
        socketio.run(app, host='0.0.0.0', port=5050, debug=True)
    except Exception as e:
        print(f"❌ Error al iniciar el servidor: {e}")
