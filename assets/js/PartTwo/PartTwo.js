import React, { memo, useState, useEffect } from "react";
import { Socket, Channel } from "phoenix";

const PartTwo = () => {
  // state
  const [username, setUsername] = useState("");
  const [error, setError] = useState();
  const [socket, setSocket] = useState();
  const [channel, setChannel] = useState();
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   console.log(socket, "socket");
  // }, [socket]);

  // useEffect(() => {
  //   console.log(channel, "channel");
  // }, [channel]);

  const handleLogin = () => {
    setError("");
    const socket = new Socket("/socket", { params: { username } });
    setSocket(socket);
    socket.connect();

    const channel = new Channel("part_two:lobby", {}, socket);

    channel
      .join()
      // .receive("ok", (resp) => {
      //   console.log("Joined successfully", resp);
      // })
      // .receive("error", (resp) => {
      //   console.log("Unable to join", resp);
      // });

    setChannel(channel);
    // console.log(channel, "channel");
    // console.log(socket, "socket");

    socket.onError((error) => {
      if (
        error?.currentTarget?.url ===
        "ws://localhost:8976/socket/websocket?username=&vsn=2.0.0"
      ) {
        setError("Unauthorized");
        console.log(error, "error");
      } else {
        setError("");
      }
    });
  };

  const handleMessageChange = ({ target: { value } }) => setMessage(value);

  const handleMessageSend = () => {
    channel
      .push("new_message", {
        username,
        message,
        room: "lobby",
      })
      .receive("ok", (payload) => console.log("phoenix replied:", payload));
    console.log(channel);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "95vh",
      }}
    >
      <div>
        <h1 style={{ color: "red" }}>{error}</h1>
        <input
          onChange={({ target: { value } }) => {
            setUsername(value);
          }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <div>
        <input type="text" onChange={handleMessageChange} />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default memo(PartTwo);
