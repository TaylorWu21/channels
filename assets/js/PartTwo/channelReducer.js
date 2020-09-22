export const initialState = {
  messages: [],
};

const channelReducer = (state, { event, payload }) => {
  switch (event) {
    case "load_messages":
      return { ...state, messages: payload };
    case "new_message":
      return { ...state, messages: [...state.messages, payload] };
    default:
      return state;
  }
};

export default channelReducer;
