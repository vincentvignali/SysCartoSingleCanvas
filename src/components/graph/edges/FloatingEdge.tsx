import { useContext } from "react";
import { EdgeProps, getBezierPath, useReactFlow } from "reactflow";

import { GraphContext, graphContext } from "@/contexts/GraphContext";
import {
  artificialEdgeChecker,
  isEdgeRelatedToASelectedNode,
} from "@/interactions/selectors";

import { getEdgePathParams } from "./floating";

export const FloatingEdge = (edge: EdgeProps) => {
  /** Destructuring */
  let { id, source, target, markerEnd } = edge;
  /** Retrieve context */
  const { zoom } = useContext(graphContext) as GraphContext;
  const deepZoomLayer = zoom.deepZoomLayer;
  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();

  const sourceNode = reactFlowInstance.getNode(edge.source);
  const targetNode = reactFlowInstance.getNode(edge.target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const bezierParams = getEdgePathParams(sourceNode, targetNode);

  // TODO: here you select the type of edge
  // const path = getBezierPath(bezierParams);
  // const path = getSimpleBezierPath(bezierParams);
  // const path = getSmoothStepPath(bezierParams);
  const [path, labelX, labelY] = getBezierPath(bezierParams);

  //Style edges outside Machines. A
  let edgeStyle = "stroke-red-800 stroke-[4]";

  /** Own Edge states */
  const isEdgeArtificial = artificialEdgeChecker(edge);
  const isEdgeActive = isEdgeRelatedToASelectedNode(edge, nodes, edges);

  isEdgeActive
    ? isEdgeArtificial
      ? deepZoomLayer
        ? (edgeStyle = "hidden")
        : null
      : deepZoomLayer
      ? null
      : (edgeStyle = "hidden")
    : (edgeStyle = "hidden");

  return (
    <path
      id={id}
      className={` ${edgeStyle} fill-transparent`}
      d={path}
      markerEnd={markerEnd}
    />
  );
};

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
