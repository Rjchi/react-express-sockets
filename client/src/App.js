import io from "socket.io-client";
import { useState, useEffect } from "react";
import styles from "./App.module.css";

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
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    // Cuando escuchemos el evento que viene del backend
    const receiveMessage = (message) => {
      setMessages([
        ...messages,
        {
          body: message.body,
          from: message.from,
        },
      ]);
    };
    socket.on("message", receiveMessage);

    // Con esto desuscribimos en el momento que refresquemos el navegador
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [message, messages]);

  return (
    <div className={styles.content}>
      <div className={styles.containerOne}>
        {messages &&
          messages.map((message, index) => {
            return (
              <div key={index} className={message.from === "Me" ? styles.me : styles.other}>
                <p className={styles.name}>{message.from}</p>
                <p className={styles.body}>{message.body}</p>
              </div>
            );
          })}
      </div>
      <div className={styles.containerTwo}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default App;
