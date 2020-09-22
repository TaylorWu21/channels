import React, { memo, useState, useEffect } from "react";

import useChannel from "./useChannel";
import channelReducer, { initialState } from "./channelReducer";

const MessagingApp = () => {
  const defaultUsername = document.cookie
    .split(";")
    .find((cookie) => cookie.match(/username=/g))
    .split("=")[1];
  // state
  const [username, setUsername] = useState(defaultUsername);
  const [message, setMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  // reducer state
  const [state, channel, dispatch] = useChannel(
    "part_two:lobby",
    channelReducer,
    initialState
  );

  // pop up login message
  useEffect(() => {
    if (loginMessage) {
      setTimeout(() => {
        setLoginMessage("");
      }, 3000);
    }
  }, [loginMessage]);

  // callbacks
  const handleLogin = () => {
    document.cookie = `username=${username}`;
    setLoginMessage(`logged in as ${username}!`);
  };
  const handleLogout = () => {
    document.cookie = "username=";
    setLoginMessage("logged out!");
  };
  const handleSendMessage = (e) => {
    // If they hit enter
    if (e.keyCode == 13 && message) {
      channel.push("new_message", { message });
      setMessage("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90vh",
      }}
    >
      {/* Login */}
      <div>
        <h1>{loginMessage}</h1>
        <input
          onChange={({ target: { value } }) => setUsername(value)}
          value={username}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout} style={{ backgroundColor: "red" }}>
          Log out
        </button>
      </div>

      {/* Messages */}
      <div style={{ overflow: "scroll" }}>
        {state.messages.map((message, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent:
                  username == message.sender ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "400px",
                  padding: "5px",
                  borderRadius: "5px",
                  backgroundColor:
                    username == message.sender ? "#0069d9" : "gray",
                }}
              >
                <p style={{ margin: "0px" }}>{message.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div>
        <input
          type="text"
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyDown={handleSendMessage}
          value={message}
        />
      </div>
    </div>
  );
};

export default memo(MessagingApp);
