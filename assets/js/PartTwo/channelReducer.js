export const initialState = {
  messages: [],
};

const channelReducer = (state, { event, payload }) => {
  switch (event) {
    case "load_messages":
      return {
        ...state,
        messages: payload,
        lastMessageId: payload[payload.length - 1],
      };
    case "load_latest_messages":
      return {
        ...state,
        messages: [...state.messages, ...payload],
        lastMessageId: payload[payload.length - 1],
      };
    case "new_message":
      return {
        ...state,
        messages: [...state.messages, payload],
        lastMessageId: payload.id,
      };
    default:
      return state;
  }
};

export default channelReducer;
