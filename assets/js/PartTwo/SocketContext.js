import React, { createContext, useEffect } from "react";
import { Socket } from "phoenix";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const username = document.cookie
    .split(";")
    .find((cookie) => cookie.match(/username=/g))
    .split("=")[1];
  const socket = new Socket("/socket", { params: { username } });

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
