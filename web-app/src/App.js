import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [socketId, setSocketId] = useState(null);

  const loginUser = () => {
    console.log("clicked");
    socket.emit("join_room", { username, room });
    setUsername("");
    setLoggedIn(true);
  };

  const sendMessage = () => {
    socket.emit("message", { message, room, socketId });
    setMessage("");
  };

  useEffect(() => {
    socket.off("newMessage");
    socket.on("newMessage", (data) => console.log("dataaa", data, socket.id));
  }, []);

  return (
    <div className="App">
      {!loggedIn && (
        <div className="input-username">
          <input
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <select onChange={(e) => setRoom(e.target.value)}>
            <option>-- Select Room --</option>
            <option value="javascript">JavaScript</option>
            <option value="node">Node</option>
            <option value="express">Express</option>
            <option value="react">React</option>
          </select>
          <button onClick={loginUser}>Login</button>
        </div>
      )}
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
      {loggedIn && (
        <div className="input-message">
          <input
            name="message"
            placeholder="Please enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            name="socketId"
            value={socketId}
            placeholder="socket id"
            onChange={(e) => setSocketId(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
