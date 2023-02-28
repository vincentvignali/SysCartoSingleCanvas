import { useContext } from "react";
import {
  EdgeProps,
  getBezierPath,
  getSimpleBezierPath,
  getSmoothStepPath,
} from "reactflow";

import { GraphContext, graphContext } from "@/contexts/GraphContext";
import {
  artificialEdgeChecker,
  isEdgeRelatedToASelectedNode,
} from "@/interactions/selectors";

/** Custom edges is used to distinguish edges beetween zoom layer.
 */
export const CustomEdge = (edge: EdgeProps) => {
  /** Destructuring */
  let {
    id,
    markerEnd,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  } = edge;

  /** Retrieve context */
  const { graph, zoom } = useContext(graphContext) as GraphContext;
  const nodes = graph.nodes;
  const edges = graph.edges;
  const deepZoomLayer = zoom.deepZoomLayer;

  /** Build its path */
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition,
    targetX: targetX,
    targetY,
    targetPosition,
    offset: 1,
  });
  //Style edges inside Machines.
  let edgeStyle = "stroke-green-900  stroke-2";

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
    <>
      <path
        id={id}
        className={` ${edgeStyle} fill-transparent`}
        d={`${[path]}`}
        markerEnd={markerEnd}
      />
    </>
  );
};
