import { createContext, Dispatch, FC, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import { toFlowElements } from "@/data/converter";
import { Graph } from "@/data/types";
import type { Node, Edge, OnNodesChange, OnEdgesChange } from "reactflow";

export type GraphContext = {
  graph: Graph<any>;
  setters: {
    setNodes: Dispatch<React.SetStateAction<Node<any>[]>>;
    setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>;
    setDeepZoomLayer: Dispatch<React.SetStateAction<boolean>>;
    resetData: () => void;
    setRelatedNodes: Dispatch<React.SetStateAction<string[]>>;
    setLayoutState: Dispatch<React.SetStateAction<string | null>>;
  };
  handlers: {
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
  };
  zoom: {
    deepZoomLayer: boolean;
  };

  selection: { relatedNodes: string[] };
  layout: string | null;
};

/**
 * graphContext is the context object accessed by the useContext hook.
 */
export const graphContext = createContext<GraphContext | null>(null);

/**
 * GraphContextProvider is the component storing all the context. It passes it as a props
 * to the graphContext.Provider wrapping all childs of GraphContextProvider.
 * GraphContextProvider is, by itself wrapping all childs of DataProvider.
 */
const GraphContextProvider: FC<any> = ({ backendData, children }) => {
  const reactFlowElements = toFlowElements(backendData);

  const initializedNodes = reactFlowElements.nodes;
  const initializedEdges = reactFlowElements.edges;

  const [nodes, setNodes, onNodesChange] = useNodesState(initializedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initializedEdges);
  const [deepZoomLayer, setDeepZoomLayer] = useState(false);
  const [relatedNodes, setRelatedNodes] = useState<string[] | []>([]);
  const [layoutState, setLayoutState] = useState<string | null>(null);

  const resetData = () => {
    setNodes(initializedNodes);
    setEdges(initializedEdges);
  };

  const graph: Graph<any> = {
    nodes,
    edges,
  };
  const setters = {
    setNodes,
    setEdges,
    resetData,
    setDeepZoomLayer,
    setRelatedNodes,
    setLayoutState,
  };
  const handlers = {
    onNodesChange,
    onEdgesChange,
  };

  const zoom = {
    deepZoomLayer: deepZoomLayer,
  };

  const selection = {
    relatedNodes: relatedNodes,
  };

  const layout = layoutState;

  return (
    <graphContext.Provider
      value={{ graph, setters, handlers, zoom, selection, layout }}
    >
      {children}
    </graphContext.Provider>
  );
};

export default GraphContextProvider;
