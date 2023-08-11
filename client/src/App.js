import './App.css';
import io from 'socket.io-client';

// Le indicamos donde esta el servidor de webSockets esto nos devuelve un objeto
// este objeto es el puente de conexion entre el back y el front
const socket = io('http://localhost:5000')

function App() {
  return (
    <div>
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
