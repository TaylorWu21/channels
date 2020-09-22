import React, { memo } from "react";

import { SocketProvider } from "./SocketContext";
import MessagingApp from './MessagingApp';

const PartTwo = () => {
  return (
    <SocketProvider>
      <MessagingApp />
    </SocketProvider>
  );
};

export default memo(PartTwo);
