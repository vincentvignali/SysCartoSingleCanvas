import { FC } from "react";
import { ReactFlowProvider } from "reactflow";
import Canvas from "./components/Canvas";
import DataProvider from "./components/DataProvider";
// default styling
import "reactflow/dist/style.css";
// or if you just want basic styles
import "reactflow/dist/base.css";

const App: FC<{}> = () => {
  return (
    <DataProvider>
      <ReactFlowProvider>
        <Canvas />
      </ReactFlowProvider>
    </DataProvider>
  );
};

export default App;
