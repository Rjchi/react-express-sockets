import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// Le indicamos donde esta el servidor de webSockets esto nos devuelve un objeto
// este objeto es el puente de conexion entre el back y el front
const socket = io("http://localhost:5000");

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviamos lo que tipea el usuario al back end (emitimos un evento)
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    // Esto es para que el mensaje mas nuevo aparesca primero
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  useEffect(() => {
    // Cuando escuchemos el evento que viene del backend
    const receiveMessage = (message) => {
      setMessages([
        {
          body: message.body,
          from: message.from,
        },
        ...messages,
      ]);
    };
    socket.on("message", receiveMessage);

    // Con esto desuscribimos en el momento que refresquemos el navegador
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [message, messages]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Enviar</button>
      </form>
      {messages &&
        messages.map((message, index) => {
          return (
            <div key={index}>
              <strong>{message.from}</strong>
              <p>{message.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default App;
