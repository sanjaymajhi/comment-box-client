import React, { useReducer } from "react";

const Context = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setCommentBoxData":
      return {
        ...state,
        commentBoxData: { ...state.commentBoxData, ...action.payload },
      };
    case "setCommentList":
      return { ...state, commentList: action.payload };
    case "addComment":
      return { ...state, commentList: [...state.commentList, action.payload] };
    default:
      return state;
  }
}

const initialState = {
  commentBoxData: { name: "", value: "" },
  commentList: [],
};

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
}

export const ContextConsumer = Context.Consumer;

export default Context;
