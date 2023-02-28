import { FC, MouseEvent, useContext, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  OnSelectionChangeParams,
  useReactFlow,
} from "reactflow";

import { edgeTypes, nodeTypes } from "@/components/graph/graphTypes";
import { GraphContext, graphContext } from "@/contexts/GraphContext";
import { Metadata } from "@/data/types";
import {
  AddChildrenNodesToSelection,
  hideAllEdges,
  revealEdges,
  resetSelection,
  fitView,
  createMachineEdges,
  findRelatedNodes,
} from "@/interactions/selectors";
import { elkLayoutForce } from "@/layout/elk";
import { innerLayout } from "@/layout/innerLayout";

import ActionBar from "./ActionBar/ActionBar";
import Drawer from "./Drawer/Drawer";
import ZoomHandler from "./ZoomHandler";

// import "reactflow/dist/style.css";
// or if you just want basic styles
import "reactflow/dist/base.css";

// default styling
import "reactflow/dist/style.css";
// or if you just want basic styles
import "reactflow/dist/base.css";
import Loader from "./Loader";

/** 
  1. This Component serves the data to the <ReactFlow> :
      a. It receives the data and some functions from the GraphContext.
      b. It operated initialisation actions : 
        - Apply a default layout (inside machine and between machine & subtnetworks)
        - Creates new edges between machines and subnetwork to allow the user to see it.
        - Hide all edges as no nodes are selected.
        - Fit the view to have the whole graph on the canvas.
      c. It passes the data as props to the <ReactFlow> Component along with : 
        - nodes & edges types, handlers (e.g. 'onSelectionChange') and more props. See more https://reactflow.dev/docs/api/react-flow-props/ 
      d. From this point, `reactFlowInstance` become the base to work on. All setters should be apply on it rather that the GraphContext.
  2. This Component insert the custom component as child to the ReactFlowComponent:
      a. ReactFlow Built in child components : <MiniMap>, <Controls>
      b. Custom component : <ActionBar>, <Drawer>
*/
const Canvas: FC<{}> = () => {
  const { graph, setters, handlers, layout } = useContext(
    graphContext
  ) as GraphContext;
  const nodes = graph.nodes;
  const edges = graph.edges;

  // RF Context - Get the nodes from the react flow instance
  const reactFlowInstance = useReactFlow();

  // RF Context - Enrich the graphContext with the related Nodes.
  const setRelatedNodes = setters.setRelatedNodes;

  // UseContext Context - Retrieve the onNodesChanges function from the `useNodesState` located into the graph Context
  const onNodesChange = handlers.onNodesChange;
  const onEdgesChange = handlers.onEdgesChange;

  // Drawer
  const [nodeToDrawer, setNodeToDrawer] = useState<Node<Metadata> | null>(null);
  const [loaderState, setLoaderState] = useState<boolean>(true);

  /** 
  This useEffect takes care of the initialisation of the Canvas.
    It is dependent on 'reactFlowInstance.viewportInitialized' property which is set by default on false.
    This property returns true once the <ReactFlow> component is initialized (after ReactFlow dependencies such as d3 are loaded).
*/
  useEffect(() => {
    if (reactFlowInstance.viewportInitialized) {
      elkLayoutForce(reactFlowInstance)
        .then(() => {
          createMachineEdges(reactFlowInstance);
          innerLayout(reactFlowInstance);
          hideAllEdges(reactFlowInstance);
          fitView(reactFlowInstance);
        })
        // TODO: Run the node Ponderation Algo
        .then(() => setLoaderState(false));
    }
  }, [reactFlowInstance.viewportInitialized]);

  useEffect(() => {
    fitView(reactFlowInstance);
  }, [loaderState, layout]);

  /** 
  This functions reveals nodes (with their related edges) selected by the user.
    Tips : 
    - This function is executed at the first rendering of <ReactFlow> when selection is empty.
    - Clicking anywhere else on the Canvas reset the selection. 
*/
  const onSelectionChange = ({
    nodes: nodesFromSelection,
  }: OnSelectionChangeParams) => {
    if (nodesFromSelection.length === 0) {
      resetSelection(reactFlowInstance);
      setNodeToDrawer(null);
      setRelatedNodes([]);
      return;
    }
    // Update the relatedNodes inside the context
    const relatedNodes = nodesFromSelection
      .map((node) => findRelatedNodes(node.data, reactFlowInstance))
      .flat();
    setRelatedNodes(relatedNodes);

    // Found edges to reveal
    const nodesToHighlight = AddChildrenNodesToSelection(
      nodesFromSelection,
      reactFlowInstance
    );

    revealEdges(reactFlowInstance, nodesToHighlight);
  };

  const onNodeClick = (event: MouseEvent, node: Node<Metadata>): void => {
    setNodeToDrawer(node);
  };

  return (
    <div className="w-full h-full ">
      {loaderState && <Loader />}
      <ZoomHandler />
      <ReactFlow
        onNodeClick={onNodeClick}
        onSelectionChange={onSelectionChange}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={true}
        panOnScroll={true}
        minZoom={0}
        maxZoom={10}
        elementsSelectable={true}
        style={{ backgroundColor: "white" }}
      >
        <Background
          gap={16}
          size={0.5}
          variant={BackgroundVariant.Dots}
          color="black"
        />
        <ActionBar />
        {nodeToDrawer ? <Drawer node={nodeToDrawer} /> : null}

        <MiniMap />
        <Controls
          showZoom={true}
          showInteractive={false}
          fitViewOptions={{ padding: 0.5, duration: 750 }}
        />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
