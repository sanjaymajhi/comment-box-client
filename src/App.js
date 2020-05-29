import React from "react";
import CommentDiv from "./components/CommentDiv";
import { ContextProvider } from "./components/Context";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <CommentDiv />
      </ContextProvider>
    </div>
  );
}

export default App;
