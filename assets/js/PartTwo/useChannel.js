import { useContext, useReducer, useEffect, useState } from "react";
import SocketContext from "./SocketContext";

const useChannel = (channelTopic, reducer, initialState) => {
  const socket = useContext(SocketContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [channel, _] = useState(socket.channel(channelTopic));

  //useEffect
  useEffect(() => {
    // load initial data
    fetch("/messages")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          event: "load_messages",
          payload: data,
        });
      });
  }, []);

  useEffect(() => {
    channel.onMessage = (event, payload) => {
      dispatch({
        event,
        payload,
      });
      return payload;
    };

    if (channel.state !== "joined") {
      channel
        .join()
        .receive("ok", (resp) => {
          if (state.lastMessageId) {
            fetch(`/last_messages/${state.lastMessageId}`)
              .then((response) => response.json())
              .then((data) => {
                dispatch({
                  event: "load_latest_messages",
                  payload: data,
                });
              });
          }

          console.log("successfully joined channel", resp.messages || "");
        })
        .receive("error", ({ reason }) =>
          console.error("failed to join channel", reason)
        );
    }

    // on component unmount we leave the channel
    return () => {
      channel.leave();
    };
  }, [channelTopic]);

  return [state, channel, dispatch];
};

export default useChannel;
