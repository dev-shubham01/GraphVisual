
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import GraphContainer from "./components/GraphContainer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <GraphContainer />
      </div>
    </Provider>
  );
};

export default App;